const { deleteAProductById } = require("../../service/productRepository");

const deleteProduct = async (req, res) => {
  try {
    const productId = Number(req.params.id);

    if (!Number.isInteger(productId) || productId <= 0) {
      return res.status(400).send("ID de producto inválido.");
    }

    const deletedCount = await deleteAProductById(productId);

    if (deletedCount === 1) {
      return res.redirect("/products");
    } else {
      return res.status(404).send("Producto no encontrado o ya eliminado.");
    }
  } catch (error) {
    console.error("🗑️ Error al eliminar el producto:", error.message);
    return res.status(500).send("Error interno al eliminar el producto.");
  }
};

module.exports = deleteProduct;
