const { findUserById } = require("../../service/userRepository");

module.exports = async function show(req, res) {
  try {
    if (!req.session.user) {
      return res.status(401).send("Debés iniciar sesión para acceder a tu perfil.");
    }

    const userId = parseInt(req.session.user.id, 10);
    const user = await findUserById(userId);

    if (!user) {
      return res.status(404).render("error", {
        message: "Usuario no encontrado.",
        error: {},
      });
    }

    return res.render("users/profile", { user });
  } catch (error) {
    console.error("👤 Error al buscar usuario:", error);
    return res.status(500).render("error", {
      message: "Error interno del servidor.",
      error,
    });
  }
};
