const express = require("express");
const router = express.Router();

const upload = require("../../middlewares/upload");
const authorize = require("../../middlewares/authorize");
const {
  storeValidator,
  updateValidator,
} = require("../../validators/productValidator");

const { create, store } = require("../../controllers/products/create");
const { edit, update } = require("../../controllers/products/edit");
const { getAllProducts } = require("../../service/productRepository");
const search = require("../../controllers/products/search");
const deleteProduct = require("../../controllers/products/delete");
const show = require("../../controllers/products/show");
const cartControllers = require("../../controllers/products/cart");

// 🛒 Carrito (deben ir antes de las rutas con :id)
router.get("/cart", cartControllers.showCart);
router.post("/addItem/:id", cartControllers.addToCart);
router.post("/cart/increase/:id", cartControllers.increaseItem);
router.post("/cart/decrease/:id", cartControllers.decreaseItem);
router.post("/cart/remove/:id", cartControllers.removeItem);
router.post("/checkout", cartControllers.checkout);

// 🔍 Búsqueda
router.get("/search", search);

// 🛠️ Admin: Crear / Editar / Eliminar productos
router.get("/create", authorize("admin"), create);
router.get("/:id/edit", authorize("admin"), edit);
router.post(
  "/",
  authorize("admin"),
  upload.single("image"),
  storeValidator,
  store
);
router.put(
  "/:id",
  authorize("admin"),
  upload.single("image"),
  updateValidator,
  update
);
router.delete("/:id", authorize("admin"), deleteProduct);

// 📦 Vista general de productos
router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.render("products/productList", { data: products });
  } catch (error) {
    console.error("🛒 Error al obtener los productos:", error);
    res.status(500).render("error", {
      message: "Error al obtener los productos.",
      error,
    });
  }
});

// 📄 Detalle de producto
router.get("/:id", show);

module.exports = router;
