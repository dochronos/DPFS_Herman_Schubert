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
const index = require("../../controllers/products");
const search = require("../../controllers/products/search");
const deleteProduct = require("../../controllers/products/delete");
const show = require("../../controllers/products/show");
const cartControllers = require("../../controllers/products/cart");

// 📦 Productos
router.get("/", index);
router.get("/search", search);
router.get("/create", authorize("admin"), create);
router.get("/:id/edit", authorize("admin"), edit);
router.get("/:id", show);

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

// 🛒 Carrito
router.get("/cart", cartControllers.showCart);
router.post("/addItem/:id", cartControllers.addToCart);
router.post("/cart/increase/:id", cartControllers.increaseItem);
router.post("/cart/decrease/:id", cartControllers.decreaseItem);
router.post("/cart/remove/:id", cartControllers.removeItem);
router.post("/checkout", cartControllers.checkout);

module.exports = router;
