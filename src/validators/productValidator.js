const { body } = require("express-validator");
const db = require("../database/models");
const path = require("path");

const validateName = body("name")
  .notEmpty()
  .withMessage("Por favor, ingresá el nombre del producto.")
  .isLength({ min: 5 })
  .withMessage("El nombre debe tener al menos 5 caracteres.");

const validateDescription = body("description")
  .notEmpty()
  .withMessage("Por favor, escribí una descripción para el producto.")
  .isLength({ min: 20 })
  .withMessage("La descripción debe tener al menos 20 caracteres.");

const validateImage = body("image").custom((value, { req }) => {
  if (req.file) {
    const validExtensions = [".jpg", ".jpeg", ".png", ".gif"];
    const ext = path.extname(req.file.originalname).toLowerCase();
    if (!validExtensions.includes(ext)) {
      throw new Error("La imagen debe ser JPG, JPEG, PNG o GIF.");
    }
  }
  return true;
});

const validatePrice = body("price")
  .notEmpty()
  .withMessage("El precio es obligatorio.")
  .isFloat({ min: 0.01 })
  .withMessage("Ingresá un precio válido mayor a cero.");

const validateCategoryId = body("category")
  .notEmpty()
  .withMessage("Seleccioná una categoría.")
  .custom(async (value) => {
    const categoryExists = await db.Category.findByPk(value);
    if (!categoryExists) {
      throw new Error("La categoría seleccionada no existe.");
    }
    return true;
  });

const validateBrandId = body("brand")
  .notEmpty()
  .withMessage("Seleccioná una marca.")
  .custom(async (value) => {
    const brandExists = await db.Brand.findByPk(value);
    if (!brandExists) {
      throw new Error("La marca seleccionada no existe.");
    }
    return true;
  });

const validateColorIds = body("colors").custom(async (values) => {
  if (values) {
    for (const colorId of values) {
      const colorExists = await db.Color.findByPk(colorId);
      if (!colorExists) {
        throw new Error("Uno o más colores seleccionados no existen.");
      }
    }
  }
  return true;
});

const storeValidator = [
  validateName,
  validateDescription,
  validateImage,
  validatePrice,
  validateCategoryId,
  validateBrandId,
  validateColorIds,
];

const updateValidator = [
  validateName.optional(),
  validateDescription.optional(),
  validateImage,
  validatePrice,
  validateCategoryId,
  validateBrandId,
  validateColorIds,
];

module.exports = {
  storeValidator,
  updateValidator,
};
