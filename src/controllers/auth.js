const { validationResult } = require("express-validator");
const { findUserByEmail } = require("../service/userRepository");
const { verifyPassword } = require("../service/password");

const auth = {
  // Renderiza el formulario de login
  login: (req, res) => {
    return res.render("users/login");
  },

  // Vista para usuarios no autenticados
  requireLogin: (req, res) => {
    return res.render("users/requireLogin", { title: "Acceso Restringido" });
  },

  // Cierra sesión y limpia cookies
  logout: (req, res) => {
    req.session.destroy((error) => {
      if (error) {
        console.error("Error al destruir la sesión:", error);
        return res.status(500).send("Error al cerrar sesión");
      }
      res.clearCookie("rememberMe");
      return res.redirect("/");
    });
  },

  // Procesa login del usuario
  authenticate: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, rememberMe } = req.body;
      const user = await findUserByEmail(email);

      if (!user || !verifyPassword(password, user.password)) {
        return res.render("users/login", {
          error: "Credenciales incorrectas.",
          email: req.body.email,
        });
      }

      req.session.user = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        category: user.category,
        profileImage: user.profileImage,
      };

      if (rememberMe) {
        res.cookie("rememberMe", user.id, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
      }

      return res.redirect(`/users/${user.id}`);
    } catch (error) {
      console.error(error);
      return res.status(500).render("error", {
        message: "Ocurrió un error inesperado. Intente nuevamente más tarde.",
      });
    }
  },
};

module.exports = auth;
