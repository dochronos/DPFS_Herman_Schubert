const db = require("../database/models");

/**
 * Middleware para restaurar la sesión del usuario si hay una cookie 'rememberMe' válida.
 */
const rememberMiddleware = async (req, res, next) => {
  // Si el usuario no tiene sesión activa pero tiene cookie rememberMe
  if (req.cookies.rememberMe && !req.session.user) {
    try {
      const userId = req.cookies.rememberMe;
      const user = await db.User.findByPk(userId);

      // Si el usuario existe, restaurar sesión
      if (user) {
        req.session.user = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          category: user.category,
          profileImage: user.profileImage,
        };
      }
    } catch (error) {
      console.error("Error al restaurar sesión desde cookie rememberMe:", error);
    }
  }

  next();
};

module.exports = rememberMiddleware;
