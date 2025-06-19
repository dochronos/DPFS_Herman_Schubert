const multer = require("multer");
const path = require("path");

/**
 * Configuración del almacenamiento con multer:
 * - Almacena imágenes en carpetas distintas según el campo del formulario.
 * - Genera nombres únicos para evitar conflictos.
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = file.fieldname === "profileImage" ? "users" : "quantumbloom"; // Se ajusta a la nueva carpeta
    cb(null, path.join(__dirname, `../../public/images/${folder}`));
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

/**
 * Middleware de subida de archivos con multer.
 */
const upload = multer({ storage });

module.exports = upload;
