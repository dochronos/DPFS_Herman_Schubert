const { findAllUsers, findUserById } = require("../../service/userRepository");

const showAllUsers = async (req, res) => {
  try {
    const users = await findAllUsers();

    const response = {
      count: users.length,
      users: users.map((user) => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        detail: `${req.protocol}://${req.get("host")}/api/users/${user.id}`,
      })),
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

const showUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const user = await findUserById(userId);

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    const formattedUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profileImage: `/images/users/${user.profileImage}`,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return res.status(200).json(formattedUser);
  } catch (error) {
    console.error("Error al buscar usuario:", error);
    return res.status(500).json({
      msg: "Error interno del servidor",
      error: error.message,
    });
  }
};

module.exports = { showAllUsers, showUser };
