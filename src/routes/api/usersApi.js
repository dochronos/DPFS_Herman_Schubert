const express = require("express");
const router = express.Router();

const authorize = require("../../middlewares/authorize");

const { showAllUsers, showUser } = require("../../controllers/api/users");
const { checkUser, checkEmail } = require("../../controllers/api/authUsers");

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: API para la gestión de usuarios en QuantumBloom
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Listar todos los usuarios registrados
 *     tags: [Usuarios]
 *     description: Devuelve una lista de todos los usuarios con su información básica.
 *     responses:
 *       200:
 *         description: Lista obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 32
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Ariana Bloom"
 *                       email:
 *                         type: string
 *                         example: "ariana@quantumbloom.com"
 *                       detail:
 *                         type: string
 *                         example: "http://localhost:3000/users/1"
 */
router.get("/", authorize("admin"), showAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener información de un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Datos del usuario encontrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 firstName:
 *                   type: string
 *                   example: "Ariana"
 *                 lastName:
 *                   type: string
 *                   example: "Bloom"
 *                 email:
 *                   type: string
 *                   example: "ariana@quantumbloom.com"
 *                 profileImage:
 *                   type: string
 *                   example: "/images/users/ari_bloom.jpg"
 *                 createdAt:
 *                   type: string
 *                   example: "2025-05-01T12:00:00.000Z"
 *                 updatedAt:
 *                   type: string
 *                   example: "2025-06-01T10:22:00.000Z"
 */
router.get("/:id", authorize("admin"), showUser);

/**
 * @swagger
 * /api/users/check-credentials:
 *   post:
 *     summary: Validar credenciales de acceso
 *     tags: [Usuarios]
 *     description: Verifica si las credenciales proporcionadas son correctas para iniciar sesión.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: ariana@quantumbloom.com
 *               password:
 *                 type: string
 *                 example: Bloom123!
 *     responses:
 *       200:
 *         description: Usuario válido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Credenciales válidas.
 *       400:
 *         description: Datos faltantes.
 *       404:
 *         description: Usuario no encontrado.
 *       401:
 *         description: Contraseña incorrecta.
 *       500:
 *         description: Error del servidor.
 */
router.post("/check-credentials", checkUser);

/**
 * @swagger
 * /api/users/check-email:
 *   post:
 *     summary: Verificar si un email ya está en uso
 *     tags: [Usuarios]
 *     description: Útil al registrar o editar usuario para evitar duplicaciones de email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: florencia@quantumbloom.com
 *               currentEmail:
 *                 type: string
 *                 example: ariana@quantumbloom.com
 *     responses:
 *       200:
 *         description: Email disponible.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: El correo no está registrado.
 *       404:
 *         description: Email en uso.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/check-email", checkEmail);

module.exports = router;
