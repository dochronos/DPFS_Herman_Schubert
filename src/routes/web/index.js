const express = require("express");
const router = express.Router();

const { findAllProducts } = require("../../service/productRepository");

router.get("/", async (req, res) => {
  try {
    const products = await findAllProducts();

    return res.render("index", { products });
  } catch (error) {
    console.error("Error al obtener productos:", error);

    return res.status(500).render("error", {
      message: "No pudimos cargar los productos en este momento.",
      error,
    });
  }
});

module.exports = router;
