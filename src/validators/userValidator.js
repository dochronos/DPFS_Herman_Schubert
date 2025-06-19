const { body } = require("express-validator");
const db = require("../database/models");

// Validaciones de campos comunes
const validateFirstName = body("firstName")
  .notEmpty()
  .withMessage("Por favor, ingresá tu nombre.")
  .isLength({ min: 2 })
  .withMessage("Tu nombre debe tener al menos 2 caracteres.");

const validateLastName = body("lastName")
  .notEmpty()
  .withMessage("Por favor, ingresá tu apellido.")
  .isLength({ min: 2 })
  .withMessage("Tu apellido debe tener al menos 2 caracteres.");

// Validación de email para registro
const validateCreateEmail = body("email")
  .notEmpty()
  .withMessage("El correo es obligatorio.")
  .isEmail()
  .withMessage("Ingresá un correo válido.")
  .custom(async (value) => {
    const user = await db.User.findOne({ where: { email: value } });
    if (user) {
      throw new Error("Este correo ya está registrado.");
    }
    return true;
  });

// Validación de email para edición
const validateEditEmail = body("email")
  .notEmpty()
  .withMessage("El correo es obligatorio.")
  .isEmail()
  .withMessage("Ingresá un correo válido.")
  .custom(async (value, { req }) => {
    const currentUser = await db.User.findByPk(req.params.id);
    if (currentUser && currentUser.email !== value) {
      const existingUser = await db.User.findOne({ where: { email: value } });
      if (existingUser) {
        throw new Error("Ese correo ya pertenece a otra cuenta.");
      }
    }
    return true;
  });

// Validación de imagen
const validateProfileImage = body("profileImage").custom((value, { req }) => {
  if (!req.file) return true;

  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
  if (!allowedTypes.includes(req.file.mimetype)) {
    throw new Error("Solo se permiten imágenes JPG, JPEG, PNG o GIF.");
  }

  return true;
});

// Validación de contraseña para registro
const validateCreatePassword = body("password")
  .notEmpty()
  .withMessage("La contraseña es obligatoria.")
  .isLength({ min: 8 })
  .withMessage("Debe tener al menos 8 caracteres.")
  .matches(/[A-Z]/)
  .withMessage("Debe incluir una letra mayúscula.")
  .matches(/[a-z]/)
  .withMessage("Debe incluir una letra minúscula.")
  .matches(/[0-9]/)
  .withMessage("Debe incluir un número.")
  .matches(/[\W_]/)
  .withMessage("Debe incluir al menos un símbolo o carácter especial.");

// Validación opcional de contraseña para edición
const validateEditPassword = body("passwordEdit")
  .optional()
  .if(body("passwordEdit").notEmpty())
  .isLength({ min: 8 })
  .withMessage("Debe tener al menos 8 caracteres.")
  .matches(/[A-Z]/)
  .withMessage("Debe incluir una letra mayúscula.")
  .matches(/[a-z]/)
  .withMessage("Debe incluir una letra minúscula.")
  .matches(/[0-9]/)
  .withMessage("Debe incluir un número.")
  .matches(/[\W_]/)
  .withMessage("Debe incluir al menos un símbolo o carácter especial.");

// Exportación
const userValidator = {
  store: [
    validateFirstName,
    validateLastName,
    validateCreateEmail,
    validateCreatePassword,
    validateProfileImage,
  ],

  update: [
    validateFirstName.optional().trim(),
    validateLastName.optional().trim(),
    validateEditEmail,
    validateEditPassword.optional().trim(),
    validateProfileImage,
  ],
};

module.exports = userValidator;
