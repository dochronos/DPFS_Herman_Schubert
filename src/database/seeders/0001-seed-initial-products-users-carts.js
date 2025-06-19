const bcrypt = require("bcryptjs");
const saltRounds = 10;

("use strict");

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // Insertar categorías (ej: planners, deco, etc.)
    await queryInterface.bulkInsert("Categories", [
      { name: "Planners" },
      { name: "Decoración" },
      { name: "Papelería" },
      { name: "Regalos" },
    ]);

    // Insertar marcas: principal + colaboración ficticia
    await queryInterface.bulkInsert("Brands", [
      { name: "Quantum Bloom Space" },
      { name: "Calma Studio" },
    ]);

    // Insertar productos (imágenes esperadas en public/images/quantumbloom/)
    await queryInterface.bulkInsert("Products", [
      {
        name: "Planner Semanal 2025",
        description: "Un planner elegante para organizar tus semanas con calma y enfoque.",
        image: "planner_1.png",
        category_id: 1,
        brand_id: 1,
        officialWeb: "https://quantumbloom.com/productos/planner-semanal-2025",
        size: "21 x 14.8 cm",
        price: 4900.0,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Vela Aromática Lavanda",
        description: "Creá espacios de paz con esta vela de cera vegetal y aroma suave.",
        image: "vela_1.jpg",
        category_id: 2,
        brand_id: 2,
        officialWeb: "https://quantumbloom.com/productos/vela-aromatica-lavanda",
        size: "6 x 8 cm",
        price: 3600.0,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Set de Stickers Naturaleza",
        description: "Stickers ilustrados para decorar tus cuadernos o planners.",
        image: "stickers_1.png",
        category_id: 3,
        brand_id: 1,
        officialWeb: "https://quantumbloom.com/productos/stickers-naturaleza",
        size: "A5 (14.8 x 21 cm)",
        price: 1200.0,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Calendario de Escritorio Minimal",
        description: "Calendario en cartulina reciclada con base de madera natural.",
        image: "calendario_1.png",
        category_id: 1,
        brand_id: 1,
        officialWeb: "https://quantumbloom.com/productos/calendario-escritorio",
        size: "15 x 18 cm",
        price: 3300.0,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Taza Cerámica 'Pause'",
        description: "Taza de cerámica artesanal con frase grabada para inspirarte.",
        image: "taza_1.png",
        category_id: 4,
        brand_id: 2,
        officialWeb: "https://quantumbloom.com/productos/taza-pause",
        size: "9 x 8.5 cm",
        price: 2900.0,
        createdAt: now,
        updatedAt: now,
      },
    ]);

    // Insertar usuarios de ejemplo
    await queryInterface.bulkInsert("Users", [
      {
        firstName: "Camila",
        lastName: "Ortega",
        email: "camila.ortega@quantumbloom.com",
        password: await encryptPassword("123"),
        category: "admin",
        profileImage: "perfil_camila.jpg",
        createdAt: now,
        updatedAt: now,
      },
      {
        firstName: "Lucía",
        lastName: "Méndez",
        email: "lucia.mendez@gmail.com",
        password: await encryptPassword("123"),
        category: "user",
        profileImage: "perfil_lucia.jpg",
        createdAt: now,
        updatedAt: now,
      },
    ]);

    // Insertar paleta de colores suaves
    await queryInterface.bulkInsert("Colors", [
      { name: "Lavanda" },
      { name: "Rosa empolvado" },
      { name: "Verde salvia" },
      { name: "Crema" },
      { name: "Arena" },
      { name: "Celeste claro" },
    ]);

    // Asociar productos con colores
    await queryInterface.bulkInsert("Product_Colors", [
      { product_id: 1, color_id: 4 },
      { product_id: 1, color_id: 1 },
      { product_id: 2, color_id: 1 },
      { product_id: 3, color_id: 3 },
      { product_id: 4, color_id: 5 },
      { product_id: 5, color_id: 2 },
    ]);

    // Crear carrito para usuaria Lucía
    await queryInterface.bulkInsert("ShoppingCart", [
      {
        user_id: 2,
        total: 6200.0,
        createdAt: now,
        updatedAt: now,
      },
    ]);

    await queryInterface.bulkInsert("CartItems", [
      {
        cart_id: 1,
        product_id: 1,
        quantity: 1,
        price: 4900.0,
        createdAt: now,
        updatedAt: now,
      },
      {
        cart_id: 1,
        product_id: 3,
        quantity: 1,
        price: 1300.0,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CartItems", null, {});
    await queryInterface.bulkDelete("ShoppingCart", null, {});
    await queryInterface.bulkDelete("Product_Colors", null, {});
    await queryInterface.bulkDelete("Colors", null, {});
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Products", null, {});
    await queryInterface.bulkDelete("Brands", null, {});
    await queryInterface.bulkDelete("Categories", null, {});
  },
};

// Helpers
const encryptPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};
