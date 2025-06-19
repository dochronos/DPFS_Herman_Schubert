const { validationResult } = require("express-validator");
const { hashPassword } = require("../../service/password");
const {
  isEmailInUseByOtherUser,
  updateUser,
  findUserById,
} = require("../../service/userRepository");

let editController = {
  edit: async (req, res) => {
    const userId = parseInt(req.session.user.id);

    try {
      const user = await findUserById(userId);

      if (user) {
        return res.render("users/edit", {
          title: "Editar Usuario",
          user,
          oldData: {},
          errors: [],
        });
      } else {
        return res.status(404).send("Usuario no encontrado");
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send("Error al obtener el usuario");
    }
  },

  update: async (req, res) => {
    const userId = req.session.user.id;

    const result = validationResult(req);
    if (!result.isEmpty()) {
      const user = await findUserById(userId);
      return res.status(400).render("users/edit", {
        title: "Editar Usuario",
        user,
        errors: result.array(),
        oldData: req.body,
      });
    }

    const { firstName, lastName, email, passwordEdit } = req.body;
    const updates = {};

    if (firstName) updates.firstName = firstName;
    if (lastName) updates.lastName = lastName;
    if (email) updates.email = email;
    if (req.file) updates.profileImage = req.file.filename;
    if (passwordEdit) updates.password = hashPassword(passwordEdit);

    try {
      if (email) {
        const existingUser = await isEmailInUseByOtherUser(email, userId);
        if (existingUser) {
          const user = await findUserById(userId);
          return res.status(400).render("users/edit", {
            title: "Editar Usuario",
            user,
            errors: [{ msg: "El correo ya está en uso por otro usuario", param: "email" }],
            oldData: req.body,
          });
        }
      }

      await updateUser(userId, updates);

      Object.assign(req.session.user, updates);
      return res.redirect(`/users/${userId}`);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      return res.status(500).render("error", {
        message: "Error al actualizar el usuario.",
        error,
      });
    }
  },
};

module.exports = editController;
