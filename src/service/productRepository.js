const db = require("../database/models");

// Relaciones a incluir en las consultas de productos
const includeModels = [
  {
    model: db.Brand,
    attributes: ["name"],
  },
  {
    model: db.Category,
    attributes: ["name"],
  },
  {
    model: db.Color,
    attributes: ["name"],
  },
];

/**
 * Obtiene todos los productos con sus relaciones asociadas.
 */
const getAllProducts = async () => {
  try {
    return await db.Product.findAll({
      include: includeModels,
    });
  } catch (error) {
    console.error("Error al obtener todos los productos:", error);
    throw new Error("Ocurrió un error al consultar la base de datos.");
  }
};

/**
 * Busca un producto por su ID con relaciones.
 * @param {number} productId - ID del producto.
 */
const getProductById = async (productId) => {
  try {
    return await db.Product.findByPk(productId, {
      include: includeModels,
    });
  } catch (error) {
    console.error(`Error al obtener el producto con ID ${productId}:`, error);
    throw new Error("Ocurrió un error al consultar la base de datos.");
  }
};

/**
 * Elimina un producto por su ID.
 * @param {number} productId - ID del producto a eliminar.
 */
const deleteProductById = async (productId) => {
  try {
    return await db.Product.destroy({ where: { id: productId } });
  } catch (error) {
    console.error(`Error al eliminar el producto con ID ${productId}:`, error);
    throw new Error("Ocurrió un error al eliminar el producto.");
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  deleteProductById,
};
