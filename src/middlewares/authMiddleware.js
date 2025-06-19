/**
 * Middleware para verificar autenticación de usuarios
 */
module.exports = {
  // Si el usuario está autenticado, permite continuar
  isAuthenticated: (req, res, next) => {
    if (req.session.user) {
      return next();
    }
    // Si no está autenticado, redirige al login
    return res.redirect("/users/login");
  },

  // Si el usuario NO está autenticado, permite continuar
  isGuest: (req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    // Si ya está autenticado, lo redirige a su perfil
    return res.redirect(`/users/${req.session.user.id}`);
  },
};
