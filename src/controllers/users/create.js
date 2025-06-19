const { findUserByEmail, createUser } = require("../../service/userRepository");
const { hashPassword } = require("../../service/password");
const { validationResult } = require("express-validator");

const createController = {
  create: (req, res) => {
    return res.render("users/register", {
      title: "Registrarse",
      oldData: {},
      errors: [],
    });
  },

  store: async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).render("users/register", {
        title: "Registrarse",
        errors: result.array(),
        oldData: req.body,
      });
    }

    const { firstName, lastName, email, password, category } = req.body;

    try {
      const user = await findUserByEmail(email);

      if (user) {
        return res.status(400).render("users/register", {
          title: "Registrarse",
          errors: [{ msg: "El correo ya fue registrado.", param: "email" }],
          oldData: req.body,
        });
      }

      const hashedPassword = hashPassword(password);

      const nuevoUsuario = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        category,
        profileImage: req.file ? req.file.filename : null,
      };

      await createUser(nuevoUsuario);

      return res.redirect("/users/login");
    } catch (error) {
      console.error("Error al crear usuario:", error);
      return res.status(500).render("error", {
        message: "Ocurrió un error al registrar el usuario.",
        error,
      });
    }
  },
};

module.exports = createController;
