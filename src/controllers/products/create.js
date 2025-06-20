const { validationResult } = require("express-validator");
const db = require("../../database/models");

const productCreateController = {
  create: async (req, res) => {
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
      console.error("🔴 Error al cargar el formulario:", error.message);
      return res.status(500).send("Error al cargar el formulario de producto.");
    }
  },

  store: async (req, res) => {
    const errors = validationResult(req);

    try {
      const [brands, categories, colors] = await Promise.all([
        db.Brand.findAll(),
        db.Category.findAll(),
        db.Color.findAll(),
      ]);

      if (!errors.isEmpty()) {
        return res.status(400).render("products/productCreate", {
          brands,
          categories,
          colors,
          oldData: req.body,
          errors: errors.array(),
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
        ? [selectedColors]
        : [];

      const productExists = await db.Product.findOne({ where: { name } });
      if (productExists) {
        return res.status(400).render("products/productCreate", {
          brands,
          categories,
          colors,
          oldData: req.body,
          errors: [{ msg: "El producto ya fue registrado con ese nombre." }],
        });
      }

      const newProduct = await db.Product.create({
        name: name.trim(),
        description: description.trim(),
        officialWeb: officialWeb?.trim() || null,
        size: size?.trim() || null,
        brand_id: parseInt(brand, 10),
        category_id: parseInt(category, 10),
        image: req.file?.filename || null,
        price: parseFloat(price) || 0.0,
      });

      await Promise.all(
        colorsArray.map((colorId) =>
          db.ProductColor.create({
            product_id: newProduct.id,
            color_id: parseInt(colorId, 10),
          })
        )
      );

      return res.redirect("/products/create");
    } catch (error) {
      console.error("🔴 Error al registrar el producto:", error.message);
      return res.status(500).send("Error interno al registrar el producto.");
    }
  },
};

module.exports = productCreateController;
