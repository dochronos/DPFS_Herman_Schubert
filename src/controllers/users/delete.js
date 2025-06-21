const { deleteUserById } = require("../../service/userRepository");

module.exports = async function deleteUser(req, res) {
  try {
    if (!req.session.user) {
      return res.status(401).send("Sesión no válida. Iniciá sesión e intentá nuevamente.");
    }

    const userId = req.session.user.id;

    const deletedCount = await deleteUserById(userId);

    if (deletedCount === 1) {
      req.session.destroy((err) => {
        if (err) {
          console.error("🔒 Error al destruir sesión luego del borrado:", err);
        }
        res.clearCookie("rememberMe");
        return res.redirect("/");
      });
    } else {
      return res.status(404).send("El usuario no fue encontrado.");
    }

  } catch (error) {
    console.error("🧑‍💻 Error al eliminar el usuario:", error);
    return res.status(500).send("Error interno al intentar eliminar el usuario.");
  }
};
