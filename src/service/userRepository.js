const db = require("../database/models");
const { Op } = require("sequelize");

/**
 * Obtiene un usuario por su correo electrónico.
 */
const getUserByEmail = async (email) => {
  try {
    return await db.User.findOne({ where: { email } });
  } catch (error) {
    console.error("Error al obtener usuario por email:", error);
    throw new Error("Error al acceder a la base de datos.");
  }
};

/**
 * Obtiene un usuario por su ID.
 */
const getUserById = async (userId) => {
  try {
    return await db.User.findByPk(userId);
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);
    throw new Error("Error al acceder a la base de datos.");
  }
};

/**
 * Obtiene todos los usuarios.
 */
const getAllUsers = async () => {
  try {
    return await db.User.findAll();
  } catch (error) {
    console.error("Error al obtener todos los usuarios:", error);
    throw new Error("Error al acceder a la base de datos.");
  }
};

/**
 * Crea un nuevo usuario.
 */
const createUser = async (newUser) => {
  try {
    return await db.User.create(newUser);
  } catch (error) {
    console.error("Error al crear un nuevo usuario:", error);
    throw new Error("Error al guardar el usuario.");
  }
};

/**
 * Elimina un usuario por ID.
 */
const deleteUserById = async (userId) => {
  try {
    return await db.User.destroy({ where: { id: userId } });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    throw new Error("Error al eliminar el usuario.");
  }
};

/**
 * Verifica si un email está en uso por otro usuario distinto al indicado.
 */
const isEmailInUseByOtherUser = async (email, userId) => {
  try {
    return await db.User.findOne({
      where: {
        email,
        id: { [Op.ne]: userId },
      },
    });
  } catch (error) {
    console.error("Error al verificar email duplicado:", error);
    throw new Error("Error al acceder a la base de datos.");
  }
};

/**
 * Actualiza un usuario por ID.
 */
const updateUser = async (userId, updates) => {
  try {
    return await db.User.update(updates, { where: { id: userId } });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw new Error("Error al actualizar el usuario.");
  }
};

module.exports = {
  getUserByEmail,
  getUserById,
  getAllUsers,
  createUser,
  deleteUserById,
  isEmailInUseByOtherUser,
  updateUser,
};
