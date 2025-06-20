const { validationResult } = require("express-validator");
const db = require("../../database/models");

let productEditController = {
  // Mostrar formulario de edición
  edit: async function (req, res) {
    try {
      const productId = Number(req.params.id);
      if (!Number.isInteger(productId) || productId <= 0) {
        return res.status(400).send("ID de producto inválido.");
      }

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
        return res.status(404).send("Producto no encontrado.");
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
      console.error("⚠️ Error al cargar la edición del producto:", error.message);
      return res.status(500).send("Error interno del servidor.");
    }
  },

  // Actualizar producto
  update: async function (req, res) {
    const productId = Number(req.params.id);
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

    const updatedProductData = {
      name,
      description,
      price: parseFloat(price) || 0.0,
      category_id: Number(category),
      brand_id: Number(brand),
      size,
      officialWeb,
    };

    if (req.file) {
      updatedProductData.image = req.file.filename;
    }

    try {
      const duplicate = await db.Product.findOne({
        where: {
          name: name,
          id: { [db.Sequelize.Op.ne]: productId },
        },
      });

      if (duplicate) {
        return res.status(400).render("products/productEdit", {
          product: { ...req.body, id: productId },
          brands,
          categories,
          colors,
          errors: [{ msg: "El nombre del producto ya está en uso." }],
          oldData: req.body,
        });
      }

      const [affectedRows] = await db.Product.update(updatedProductData, {
        where: { id: productId },
      });

      if (affectedRows === 0) {
        return res.status(404).send("No se actualizó el producto. Verificá el ID.");
      }

      await db.ProductColor.destroy({ where: { product_id: productId } });

      const colorInsertions = colorsArray.map((colorId) =>
        db.ProductColor.create({
          product_id: productId,
          color_id: Number(colorId),
        })
      );

      await Promise.all(colorInsertions);

      return res.redirect(`/products/${productId}`);
    } catch (error) {
      console.error("❌ Error al actualizar producto:", error.message);
      return res.status(500).send("Error al actualizar el producto.");
    }
  },
};

module.exports = productEditController;
