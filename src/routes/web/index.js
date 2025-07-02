const express = require("express");
const router = express.Router();

const { getAllProducts } = require("../../service/productRepository");

router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();

    // 🔁 Cambiamos la vista y el nombre de la variable
    return res.render("products/productList", { data: products });
  } catch (error) {
    console.error("Error al obtener productos:", error);

    return res.status(500).render("error", {
      message: "No pudimos cargar los productos en este momento.",
      error,
    });
  }
});

module.exports = router;
