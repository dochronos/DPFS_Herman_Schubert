const { findAProductById } = require("../../service/productRepository");

const show = async (req, res) => {
  try {
    const productId = parseInt(req.params.id, 10);

    if (isNaN(productId)) {
      return res.status(400).send("ID de producto inválido.");
    }

    const product = await findAProductById(productId);

    if (!product) {
      return res.status(404).send("Producto no encontrado.");
    }

    return res.render("products/productDetail", { data: product });
  } catch (error) {
    console.error("🛒 Error en show.js:", error.message);
    return res.status(500).render("error", {
      message: "Ocurrió un error al mostrar el producto.",
      error,
    });
  }
};

module.exports = show;
