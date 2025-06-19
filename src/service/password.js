const bcrypt = require("bcryptjs");

/**
 * Compara una contraseña ingresada con su versión hasheada.
 * @param {string} inputPassword - Contraseña ingresada por el usuario.
 * @param {string} hashedPassword - Contraseña almacenada (hasheada).
 * @returns {boolean} - True si coinciden, false si no.
 */
const verifyPassword = (inputPassword, hashedPassword) => {
  return bcrypt.compareSync(inputPassword, hashedPassword);
};

/**
 * Hashea una contraseña usando bcrypt con 10 rounds de sal.
 * @param {string} password - Contraseña sin cifrar.
 * @returns {string} - Contraseña cifrada.
 */
const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

module.exports = {
  verifyPassword,
  hashPassword,
};
