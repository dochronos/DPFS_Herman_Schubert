const router = require("express").Router();

const upload = require("../../middlewares/upload");
const auth = require("../../controllers/auth");
const authMiddleware = require("../../middlewares/authMiddleware");
const authValidator = require("../../validators/authValidator");
const userValidator = require("../../validators/userValidator");

const createController = require("../../controllers/users/create");
const editController = require("../../controllers/users/edit");
const deleteController = require("../../controllers/users/delete");
const profileController = require("../../controllers/users/profile");

// 🛡️ Autenticación
router.get("/login", authMiddleware.isGuest, auth.login);
router.post("/login", authMiddleware.isGuest, authValidator, auth.authenticate);
router.get("/logout", authMiddleware.isAuthenticated, auth.logout);
router.get("/requirelogin", authMiddleware.isGuest, auth.requireLogin);

// 👤 Registro y creación de usuarios
router.get("/create", authMiddleware.isGuest, createController.create);
router.post(
  "/",
  authMiddleware.isGuest,
  upload.single("profileImage"),
  userValidator.store,
  createController.store
);

// 🧾 Perfil y edición
router.get("/edit", authMiddleware.isAuthenticated, editController.edit);
router.put(
  "/:id",
  authMiddleware.isAuthenticated,
  upload.single("profileImage"),
  userValidator.update,
  editController.update
);

// 🧹 Eliminación
router.delete("/:id", authMiddleware.isAuthenticated, deleteController);

// 📄 Perfil público del usuario
router.get("/:id", authMiddleware.isAuthenticated, profileController);

module.exports = router;
