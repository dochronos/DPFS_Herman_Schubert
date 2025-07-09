const { validationResult } = require("express-validator");
const { hashPassword } = require("../../service/password");
const {
  isEmailInUseByOtherUser,
  updateUser,
  getUserById, // ← CORREGIDO
} = require("../../service/userRepository");

const editController = {
  // Mostrar formulario de edición
  edit: async (req, res) => {
    const userId = parseInt(req.session.user.id, 10);

    try {
      const user = await getUserById(userId); // ← CORREGIDO

      if (!user) {
        return res.status(404).render("error", {
          message: "Usuario no encontrado.",
          error: {},
        });
      }

      return res.render("users/edit", {
        title: "Editar Usuario",
        user,
        oldData: {},
        errors: [],
      });
    } catch (error) {
      console.error("🧑‍💻 Error al obtener el usuario:", error);
      return res.status(500).render("error", {
        message: "Error al obtener el usuario.",
        error,
      });
    }
  },

  // Procesar actualización del usuario
  update: async (req, res) => {
    const userId = req.session.user.id;
    const errors = validationResult(req);

    try {
      const user = await getUserById(userId); // ← CORREGIDO

      if (!user) {
        return res.status(404).render("error", {
          message: "Usuario no encontrado.",
          error: {},
        });
      }

      if (!errors.isEmpty()) {
        return res.status(400).render("users/edit", {
          title: "Editar Usuario",
          user,
          errors: errors.array(),
          oldData: req.body,
        });
      }

      const { firstName, lastName, email, passwordEdit } = req.body;
      const updates = {};

      if (firstName) updates.firstName = firstName;
      if (lastName) updates.lastName = lastName;
      if (email) updates.email = email;
      if (req.file) updates.profileImage = req.file.filename;
      if (passwordEdit) updates.password = await hashPassword(passwordEdit); // ← aseguramos await

      // Validar email en uso
      if (email && email !== user.email) {
        const existingUser = await isEmailInUseByOtherUser(email, userId);
        if (existingUser) {
          return res.status(400).render("users/edit", {
            title: "Editar Usuario",
            user,
            errors: [
              {
                msg: "El correo ya está en uso por otro usuario.",
                param: "email",
              },
            ],
            oldData: req.body,
          });
        }
      }

      await updateUser(userId, updates);
      Object.assign(req.session.user, updates);

      return res.redirect(`/users/${userId}`);
    } catch (error) {
      console.error("🔧 Error al actualizar el usuario:", error);
      return res.status(500).render("error", {
        message: "Error al actualizar el usuario.",
        error,
      });
    }
  },
};

module.exports = editController;
