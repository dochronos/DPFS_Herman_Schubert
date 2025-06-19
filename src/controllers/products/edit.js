const { validationResult } = require("express-validator");
const db = require("../../database/models");

let productEditController = {
  edit: async function (req, res) {
    try {
      const productId = req.params.id;

      const [product, brands, categories, colors] = await Promise.all([
        db.Product.findByPk(productId, {
          include: [
            { model: db.Brand },
            { model: db.Category },
            { model: db.Color },
          ],
        }),
        db.Brand.findAll(),
        db.Category.findAll(),
        db.Color.findAll(),
      ]);

      if (!product) {
        return res.status(404).send("Producto no encontrado");
      }

      return res.render("products/productEdit", {
        product,
        brands,
        categories,
        colors,
        errors: [],
        oldData: {},
      });
    } catch (error) {
      console.error("Error al cargar la edición del producto:", error);
      return res.status(500).send("Error interno del servidor.");
    }
  },

  update: async function (req, res) {
    const productId = req.params.id;
    const result = validationResult(req);

    const [brands, categories, colors] = await Promise.all([
      db.Brand.findAll(),
      db.Category.findAll(),
      db.Color.findAll(),
    ]);

    if (!result.isEmpty()) {
      return res.status(400).render("products/productEdit", {
        product: { ...req.body, id: productId },
        brands,
        categories,
        colors,
        errors: result.array(),
        oldData: req.body,
      });
    }

    const {
      name,
      description,
      price,
      category,
      brand,
      colors: selectedColors,
      size,
      officialWeb,
    } = req.body;

    const colorsArray = Array.isArray(selectedColors)
      ? selectedColors
      : selectedColors
      ? selectedColors.split(",")
      : [];

    const actualProducto = {
      name,
      description,
      category_id: parseInt(category),
      brand_id: parseInt(brand),
      size,
      price: parseFloat(price) || 0.0,
      officialWeb,
    };

    if (req.file) {
      actualProducto.image = req.file.filename;
    }

    try {
      const existingProduct = await db.Product.findOne({
        where: {
          name: name,
          id: { [db.Sequelize.Op.ne]: productId },
        },
      });

      if (existingProduct) {
        return res.status(400).render("products/productEdit", {
          product: { ...req.body, id: productId },
          brands,
          categories,
          colors,
          errors: [{ msg: "El nombre del producto ya está en uso." }],
          oldData: req.body,
        });
      }

      const [updatedRows] = await db.Product.update(actualProducto, {
        where: { id: productId },
      });

      if (updatedRows === 0) {
        return res
          .status(404)
          .send("No se actualizó el producto. Verificá el ID.");
      }

      await db.ProductColor.destroy({ where: { product_id: productId } });

      const colorPromises = colorsArray.map((colorId) =>
        db.ProductColor.create({
          product_id: productId,
          color_id: parseInt(colorId),
        })
      );

      await Promise.all(colorPromises);

      return res.redirect(`/products/${productId}`);
    } catch (error) {
      console.error("Error al actualizar producto:", error.message);
      return res.status(500).send("Error al actualizar el producto.");
    }
  },
};

module.exports = productEditController;
