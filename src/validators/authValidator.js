const { body } = require("express-validator");
const db = require("../database/models");
const bcrypt = require("bcryptjs");

const authValidator = [
  body("email")
    .notEmpty()
    .withMessage("Por favor, ingresá tu correo electrónico.")
    .isEmail()
    .withMessage("Ingresá un correo electrónico válido.")
    .custom(async (value) => {
      const user = await db.User.findOne({ where: { email: value } });
      if (!user) {
        throw new Error("Este correo no está registrado.");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("Por favor, ingresá tu contraseña.")
    .custom(async (value, { req }) => {
      const user = await db.User.findOne({ where: { email: req.body.email } });
      if (user && !bcrypt.compareSync(value, user.password)) {
        throw new Error("La contraseña no coincide con la cuenta ingresada.");
      }
      return true;
    }),
];

module.exports = authValidator;
