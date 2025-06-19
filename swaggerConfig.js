const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Quantum Bloom Space API",
      version: "1.0.0",
      description: "Documentación de la API RESTful para la tienda online Quantum Bloom Space.",
      contact: {
        name: "Equipo Quantum Bloom",
        url: "https://quantumbloom.com",
        email: "soporte@quantumbloom.com"
      }
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local"
      }
    ]
  },
  apis: [
    "./src/routes/api/*.js" // Más flexible y futuro-proof
  ]
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

module.exports = swaggerSpec;
