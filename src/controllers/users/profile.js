const { getUserById } = require("../../service/userRepository");

module.exports = async function show(req, res) {
  try {
    // Verificamos si hay sesión activa
    if (!req.session.user) {
      return res.status(401).render("error", {
        message: "Debés iniciar sesión para acceder a tu perfil.",
        error: { status: 401 },
      });
    }

    const userId = parseInt(req.params.id, 10);
    const user = await getUserById(userId);

    // Validamos si existe el usuario
    if (!user) {
      return res.status(404).render("error", {
        message: "Usuario no encontrado.",
        error: { status: 404 },
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
