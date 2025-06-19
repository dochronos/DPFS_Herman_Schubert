const { Sequelize } = require("sequelize");

const environment = process.env.NODE_ENV || "development";
const config = require("./config")[environment];

// Validación de entorno configurado
if (!config) {
  throw new Error(`No se encontró configuración para el entorno: "${environment}"`);
}

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: false,
  }
);

module.exports = sequelize;
