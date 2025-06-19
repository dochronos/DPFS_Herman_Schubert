const { Sequelize } = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];

if (!config) {
  console.error(`❌ Error: No se encontró configuración para el entorno "${env}".`);
  process.exit(1);
}

const createDatabaseIfNotExists = async () => {
  try {
    const sequelize = new Sequelize("", config.username, config.password, {
      host: config.host,
      dialect: config.dialect,
      logging: false,
    });

    await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\`;`);
    console.log(`✅ Base de datos "${config.database}" verificada o creada.`);
    await sequelize.close();
  } catch (error) {
    console.error("❌ Error al verificar o crear la base de datos:", error.message);
    process.exit(1);
  }
};

const syncDatabase = async () => {
  if (env === "production") {
    console.error("⚠️ No se recomienda ejecutar syncDatabase.js con 'force: true' en producción.");
    process.exit(1);
  }

  try {
    await createDatabaseIfNotExists();

    const { sequelize } = require("../models");
    await sequelize.sync({ force: true }); // Borra y vuelve a crear las tablas

    console.log("✅ Tablas sincronizadas correctamente.");
  } catch (error) {
    console.error("❌ Error al sincronizar la base de datos:", error.message);
  } finally {
    process.exit();
  }
};

syncDatabase();
