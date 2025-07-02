require("dotenv").config(); // Solo si usás dotenv

module.exports = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "ecommerce",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 3307,
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: "",
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: "",
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
};
