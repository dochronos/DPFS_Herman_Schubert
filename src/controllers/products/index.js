const { findAllProducts } = require("../../service/productRepository");

const index = async (req, res) => {
  try {
    const products = await findAllProducts();

    return res.render("products/productList", {
      data: products,
      title: "Listado de Productos",
    });
  } catch (error) {
    console.error("🛒 Error al obtener los productos:", error.message);

    return res.status(500).render("error", {
      message: "Ocurrió un error al cargar los productos.",
      error,
    });
  }
};

module.exports = index;
