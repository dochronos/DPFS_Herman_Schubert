const { deleteAProductById } = require("../../service/productRepository");

const deleteProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    if (isNaN(productId)) {
      return res.status(400).send("ID de producto inválido.");
    }

    const deletedCount = await deleteAProductById(productId);

    if (deletedCount === 1) {
      return res.redirect("/products");
    } else {
      return res.status(404).send("Producto no encontrado.");
    }
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    return res.status(500).send("Error interno al eliminar el producto.");
  }
};

module.exports = deleteProduct;
