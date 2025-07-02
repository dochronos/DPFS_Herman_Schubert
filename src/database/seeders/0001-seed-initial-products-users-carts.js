const bcrypt = require("bcryptjs");
const saltRounds = 10;

("use strict");

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // Insertar categorías
    await queryInterface.bulkInsert("categories", [
      { name: "Planners" },
      { name: "Decoración" },
      { name: "Papelería" },
      { name: "Regalos" },
    ]);

    // Insertar marcas
    await queryInterface.bulkInsert("brands", [
      { name: "Quantum Bloom Space" },
      { name: "Calma Studio" },
    ]);

    // Insertar productos (20 total, 4 por categoría)
    await queryInterface.bulkInsert("products", [
      // Planners
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
        name: "Planner Floral",
        description: "Diseño con flores minimalistas y papel reciclado.",
        image: "planner_2.png",
        category_id: 1,
        brand_id: 1,
        officialWeb: "https://quantumbloom.com/productos/planner-floral",
        size: "21 x 14.8 cm",
        price: 5100.0,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Planner Diario Cuadro",
        description: "Planner con secciones por hora y encuadernado artesanal.",
        image: "planner_3.png",
        category_id: 1,
        brand_id: 2,
        officialWeb: "https://quantumbloom.com/productos/planner-diario",
        size: "21 x 29.7 cm",
        price: 5500.0,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Planner Pocket",
        description: "Ideal para llevar en cartera o mochila.",
        image: "planner_4.png",
        category_id: 1,
        brand_id: 1,
        officialWeb: "https://quantumbloom.com/productos/planner-pocket",
        size: "10 x 14 cm",
        price: 3200.0,
        createdAt: now,
        updatedAt: now,
      },

      // Decoración
      {
        name: "Vela Aromática Lavanda",
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
        name: "Cuadro con Frase",
        description: "Frase inspiradora en marco de madera clara.",
        image: "vela_2.png",
        category_id: 2,
        brand_id: 2,
        officialWeb: "https://quantumbloom.com/productos/cuadro-frase",
        size: "20 x 25 cm",
        price: 4100.0,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Espejo de Pared Boho",
        description: "Espejo con detalles en cuerda natural.",
        image: "vela_3.png",
        category_id: 2,
        brand_id: 1,
        officialWeb: "https://quantumbloom.com/productos/espejo-boho",
        size: "30 cm diámetro",
        price: 6200.0,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Portavelas Cerámica",
        description: "Hecho a mano en tonos tierra.",
        image: "vela_4.png",
        category_id: 2,
        brand_id: 1,
        officialWeb: "https://quantumbloom.com/productos/portavelas",
        size: "8 x 6 cm",
        price: 2500.0,
        createdAt: now,
        updatedAt: now,
      },

      // Papelería
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
        name: "Notas Adhesivas Pastel",
        description: "Pack de sticky notes en tonos suaves.",
        image: "stickers_2.png",
        category_id: 3,
        brand_id: 2,
        officialWeb: "https://quantumbloom.com/productos/notas-pastel",
        size: "7 x 7 cm",
        price: 950.0,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Cuaderno Rayado Eco",
        description: "Cubierta kraft reciclada y hojas rayadas.",
        image: "stickers_3.png",
        category_id: 3,
        brand_id: 1,
        officialWeb: "https://quantumbloom.com/productos/cuaderno-eco",
        size: "21 x 29.7 cm",
        price: 2600.0,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Marcadores Pastel",
        description: "Set de 6 marcadores con tinta suave.",
        image: "stickers_4.png",
        category_id: 3,
        brand_id: 2,
        officialWeb: "https://quantumbloom.com/productos/marcadores-pastel",
        size: "14 cm",
        price: 2100.0,
        createdAt: now,
        updatedAt: now,
      },

      // Regalos
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
      {
        name: "Caja de Regalo Aromática",
        description: "Incluye mini vela, jabón artesanal y bolsita de té.",
        image: "taza_2.png",
        category_id: 4,
        brand_id: 1,
        officialWeb: "https://quantumbloom.com/productos/caja-aromatica",
        size: "20 x 20 cm",
        price: 4600.0,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Tarjetas con Mensajes",
        description: "Pack de 10 tarjetas con frases para regalar.",
        image: "taza_3.png",
        category_id: 4,
        brand_id: 2,
        officialWeb: "https://quantumbloom.com/productos/tarjetas-mensajes",
        size: "10 x 15 cm",
        price: 1300.0,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Kit Autocuidado",
        description: "Incluye libreta, vela pequeña y esencias.",
        image: "taza_4.png",
        category_id: 4,
        brand_id: 1,
        officialWeb: "https://quantumbloom.com/productos/kit-autocuidado",
        size: "Caja 25 x 18 cm",
        price: 5800.0,
        createdAt: now,
        updatedAt: now,
      },
    ]);

    // Insertar usuarios
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

    // Insertar colores
    await queryInterface.bulkInsert("colors", [
      { name: "Lavanda" },
      { name: "Rosa empolvado" },
      { name: "Verde salvia" },
      { name: "Crema" },
      { name: "Arena" },
      { name: "Celeste claro" },
    ]);

    // Asociar productos con colores (solo 6 como ejemplo)
    await queryInterface.bulkInsert("product_colors", [
      { product_id: 1, color_id: 4 },
      { product_id: 1, color_id: 1 },
      { product_id: 2, color_id: 1 },
      { product_id: 3, color_id: 3 },
      { product_id: 4, color_id: 5 },
      { product_id: 5, color_id: 2 },
    ]);

    // Crear carrito
    await queryInterface.bulkInsert("shoppingcarts", [
      {
        user_id: 2,
        total: 6200.0,
        createdAt: now,
        updatedAt: now,
      },
    ]);

    // Items del carrito
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

// Helpers
const encryptPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};
