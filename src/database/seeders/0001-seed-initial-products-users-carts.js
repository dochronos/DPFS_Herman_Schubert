"use strict";

const bcrypt = require("bcryptjs");
const saltRounds = 10;

const encryptPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // Categorías
    await queryInterface.bulkInsert("categories", [
      { name: "Planners" },
      { name: "Decoración" },
      { name: "Papelería" },
      { name: "Regalos" },
    ]);

    // Marcas
    await queryInterface.bulkInsert("brands", [
      { name: "Quantum Bloom Space" },
      { name: "Calma Studio" },
    ]);

    // Productos
    await queryInterface.bulkInsert("products", [
      {
        name: "Planner Diario 2025",
        description: "Un planner elegante para organizar tus semanas con calma y enfoque.",
        image: "planner_1.png",
        category_id: 1,
        brand_id: 1,
        officialWeb: "https://quantumbloom.com/productos/planner-diario-2025",
        size: "21 x 14.8 cm",
        price: 4900.0,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Planner Fitness",
        description: "Un planner diseñado para tu rutina de ejercicio y alimentacion.",
        image: "planner_2.png",
        category_id: 1,
        brand_id: 1,
        officialWeb: "https://quantumbloom.com/productos/planner-fitness",
        size: "21 x 14.8 cm",
        price: 5100.0,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Planner de Bienestar",
        description: "Un planner diseñado para conectar contigo y buscar tu proposito",
        image: "planner_3.png",
        category_id: 1,
        brand_id: 2,
        officialWeb: "https://quantumbloom.com/productos/planner-de-bienestar",
        size: "21 x 29.7 cm",
        price: 5500.0,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Planner Medita & Manifiesta",
        description: "Un planner que te enseña multiples herramientas de meditacion y relajacion",
        image: "planner_4.png",
        category_id: 1,
        brand_id: 1,
        officialWeb: "https://quantumbloom.com/productos/planner-medita-manifiesta",
        size: "10 x 14 cm",
        price: 3200.0,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Vela Aromática Lavanda & Madera",
        description: "Creá espacios de paz con esta vela de cera vegetal y aroma suave.",
        image: "vela_1.png",
        category_id: 2,
        brand_id: 2,
        officialWeb: "https://quantumbloom.com/productos/vela-aromatica-lavanda",
        size: "6 x 8 cm",
        price: 3600.0,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Vela Aromática Sandalo & Madera",
        description: "Creá espacios de conexión con esta vela de soja y aroma envolvente.",
        image: "vela_2.png",
        category_id: 2,
        brand_id: 2,
        officialWeb: "https://quantumbloom.com/productos/vela-aromatica-sandalo-madera",
        size: "6 x 8 cm",
        price: 4100.0,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Vela Aromática Petalos de Rosa",
        description: "Creá ambientes románticos con esta vela de cera natural y aroma floral.",
        image: "vela_3.png",
        category_id: 2,
        brand_id: 1,
        officialWeb: "https://quantumbloom.com/productos/vela-aromatica-petalos-de-rosa",
        size: "6 x 8 cm",
        price: 4100.0,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Vela Aromática de Vainilla",
        description: "Creá un ambiente acogedor con esta vela de cera de soja y aroma dulce.",
        image: "vela_4.png",
        category_id: 2,
        brand_id: 1,
        officialWeb: "https://quantumbloom.com/productos/vela-aromatica-vainilla",
        size: "6 x 8 cm",
        price: 4000.0,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Set de Stickers Exhale Exhale",
        description: "Stickers ilustrados para decorar tus cuadernos o planners.",
        image: "stickers_1.png",
        category_id: 3,
        brand_id: 1,
        officialWeb: "https://quantumbloom.com/productos/stickers-exhale-exhale",
        size: "A5 (14.8 x 21 cm)",
        price: 1200.0,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Set de Stickers Love Yourself!",
        description: "Pack de sticky notes ilustrados para decorar tus cuadernos o planners.",
        image: "stickers_2.png",
        category_id: 3,
        brand_id: 2,
        officialWeb: "https://quantumbloom.com/productos/stickers-love-yourself",
        size: "A5 (14.8 x 21 cm)",
        price: 950.0,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Set de Stickers You Will Be Fine",
        description: "Set de stickers con frases motivacionales.",
        image: "stickers_3.png",
        category_id: 3,
        brand_id: 1,
        officialWeb: "https://quantumbloom.com/productos/stickers-you-will-be-fine",
        size: "A5 (14.8 x 21 cm)",
        price: 1200.0,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Set de stickers Well Being",
        description: "Set de stickers con ilustraciones de bienestar.",
        image: "stickers_4.png",
        category_id: 3,
        brand_id: 2,
        officialWeb: "https://quantumbloom.com/productos/srickers-well-being",
        size: "A5 (14.8 x 21 cm)",
        price: 1200.0,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Taza Cerámica 'Wellness'",
        description: "Taza de cerámica artesanal con frase grabada para inspirarte.",
        image: "taza_1.png",
        category_id: 4,
        brand_id: 2,
        officialWeb: "https://quantumbloom.com/productos/taza-wellness",
        size: "10 x 8.5 cm",
        price: 14600.0,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Taza Cerámica 'Daily Reminders'",
        description: "Taza de cerámica para recordar tus intenciones diarias.",
        image: "taza_2.png",
        category_id: 4,
        brand_id: 1,
        officialWeb: "https://quantumbloom.com/productos/taza-daily-reminders",
        size: "10 x 8,5 cm",
        price: 14600.0,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Taza Termica 'Daily Sip'",
        description: "Taza térmica de acero inoxidable para mantener tus bebidas calientes.",
        image: "taza_3.png",
        category_id: 4,
        brand_id: 2,
        officialWeb: "https://quantumbloom.com/productos/daily-sip",
        size: "10 x 15 cm",
        price: 20000.0,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Taza Termica 'Daily Sip' Limited Edition",
        description: "Taza térmica de acero inoxidable edición limitada con diseño exclusivo.",
        image: "taza_4.png",
        category_id: 4,
        brand_id: 1,
        officialWeb: "https://quantumbloom.com/productos/daily-sip-limited-edition",
        size: "Caja 10 x 15 cm",
        price: 25800.0,
        createdAt: now,
        updatedAt: now,
      },
    ]);

    // Usuarios
    await queryInterface.bulkInsert("users", [
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

    // Colores
    await queryInterface.bulkInsert("colors", [
      { name: "Lavanda" },
      { name: "Rosa empolvado" },
      { name: "Verde salvia" },
      { name: "Crema" },
      { name: "Arena" },
      { name: "Celeste claro" },
    ]);

    // Asociación productos ↔ colores
    await queryInterface.bulkInsert("product_colors", [
      { product_id: 1, color_id: 4 },
      { product_id: 1, color_id: 1 },
      { product_id: 2, color_id: 1 },
      { product_id: 3, color_id: 3 },
      { product_id: 4, color_id: 5 },
      { product_id: 5, color_id: 2 },
    ]);

    // Carrito
    await queryInterface.bulkInsert("shoppingcarts", [
      {
        user_id: 2,
        total: 6200.0,
        createdAt: now,
        updatedAt: now,
      },
    ]);

    // Ítems del carrito
    await queryInterface.bulkInsert("cartitems", [
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
    await queryInterface.bulkDelete("sales", null, {});
    await queryInterface.bulkDelete("cartitems", null, {});
    await queryInterface.bulkDelete("shoppingcarts", null, {});
    await queryInterface.bulkDelete("product_colors", null, {});
    await queryInterface.bulkDelete("colors", null, {});
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("products", null, {});
    await queryInterface.bulkDelete("brands", null, {});
    await queryInterface.bulkDelete("categories", null, {});
  },
};
