/**
 * Middleware para autorizar acceso basado en rol (por ejemplo: "admin").
 * Redirige a login si el usuario no está autenticado.
 * Envía error 403 si el usuario no tiene el rol necesario.
 */
module.exports = (requiredRole) => {
  return (req, res, next) => {
    // Si no hay sesión de usuario, redirigir al login
    if (!req.session.user) {
      return res.redirect("/users/login");
    }

    // Si el usuario no tiene el rol requerido, denegar acceso
    if (req.session.user.category !== requiredRole) {
      return res.status(403).send("Acceso denegado: permisos insuficientes.");
    }

    // Usuario autorizado, continuar con la siguiente función
    next();
  };
};
