const express = require("express");
const router = express.Router();
const authorize = require("../../middlewares/authorize");

const {
  showAllProducts,
  showAProduct,
} = require("../../controllers/api/products");

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: API para la gestión de productos de QuantumBloom
 */

/**
 * Ruta pública - sin autorización
 */
router.get("/public", showAllProducts);
router.get("/public/:id", showAProduct);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos con estadísticas
 *     tags: [Productos]
 *     description: Devuelve información de productos, métricas de ventas y destacados.
 *     responses:
 *       200:
 *         description: Productos obtenidos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 12
 *                 countByCategory:
 *                   type: object
 *                   example:
 *                     Velas: 4
 *                     Planners: 5
 *                     Deco: 3
 *                 totalUnitsSold:
 *                   type: integer
 *                   example: 83
 *                 totalSalesAmount:
 *                   type: number
 *                   example: 5230.50
 *                 latestSales:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productName:
 *                         type: string
 *                         example: "Planner Floral"
 *                       quantity:
 *                         type: integer
 *                         example: 2
 *                       total:
 *                         type: string
 *                         example: "180.00"
 *                       saleDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-23T14:31:09.000Z"
 *                 topProducts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productName:
 *                         type: string
 *                         example: "Vela Lavanda"
 *                       totalSold:
 *                         type: string
 *                         example: "35"
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Planner Floral"
 *                       description:
 *                         type: string
 *                         example: "Planner semanal con tapas ilustradas y diseño minimalista."
 *                       category:
 *                         type: string
 *                         example: "Planners"
 *                       brand:
 *                         type: string
 *                         example: "QuantumBloom"
 *                       colors:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Lavanda", "Salmón"]
 *                       detail:
 *                         type: string
 *                         example: "/products/1"
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", authorize("admin"), showAllProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtener detalle de un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Detalle del producto obtenido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Planner Floral"
 *                 description:
 *                   type: string
 *                   example: "Planner semanal con diseño delicado."
 *                 price:
 *                   type: string
 *                   example: "95.00"
 *                 brand:
 *                   type: string
 *                   example: "QuantumBloom"
 *                 category:
 *                   type: string
 *                   example: "Planners"
 *                 colors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Lavanda", "Salmón"]
 *                 size:
 *                   type: string
 *                   example: "21 x 14 cm"
 *                 imageUrl:
 *                   type: string
 *                   example: "/images/quantumbloom/planner_floral.jpg"
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Producto no encontrado."
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:id", authorize("admin"), showAProduct);

module.exports = router;
