const { validationResult } = require("express-validator");
const db = require("../../database/models");

let productCreateController = {
  create: async function (req, res) {
    try {
      const [brands, categories, colors] = await Promise.all([
        db.Brand.findAll(),
        db.Category.findAll(),
        db.Color.findAll(),
      ]);
      return res.render("products/productCreate", {
        brands,
        categories,
        colors,
        oldData: {},
        errors: [],
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error al cargar el formulario de producto.");
    }
  },

  store: async function (req, res) {
    const result = validationResult(req);

    try {
      const [brands, categories, colors] = await Promise.all([
        db.Brand.findAll(),
        db.Category.findAll(),
        db.Color.findAll(),
      ]);

      if (!result.isEmpty()) {
        return res.status(400).render("products/productCreate", {
          brands,
          categories,
          colors,
          errors: result.array(),
          oldData: req.body,
        });
      }

      const {
        name,
        brand,
        description,
        category,
        colors: selectedColors,
        officialWeb,
        size,
        price,
      } = req.body;

      const colorsArray = Array.isArray(selectedColors)
        ? selectedColors
        : selectedColors
        ? selectedColors.split(",")
        : [];

      const existingProduct = await db.Product.findOne({ where: { name } });
      if (existingProduct) {
        return res.status(400).render("products/productCreate", {
          brands,
          categories,
          colors,
          errors: [{ msg: "El producto ya fue registrado con ese nombre." }],
          oldData: req.body,
        });
      }

      const nuevoProducto = await db.Product.create({
        name,
        description,
        officialWeb,
        size,
        brand_id: parseInt(brand),
        category_id: parseInt(category),
        image: req.file ? req.file.filename : null,
        price: parseFloat(price) || 0.0,
      });

      const colorPromises = colorsArray.map((colorId) =>
        db.ProductColor.create({
          product_id: nuevoProducto.id,
          color_id: parseInt(colorId),
        })
      );

      await Promise.all(colorPromises);

      return res.redirect("/products/create");
    } catch (error) {
      console.error("Error al crear el producto:", error);
      return res.status(500).send("Error interno al registrar el producto.");
    }
  },
};

module.exports = productCreateController;
