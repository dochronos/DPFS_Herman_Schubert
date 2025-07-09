const db = require("../../database/models");
const { Op, fn, col, where } = db.Sequelize;

const search = async (req, res) => {
  try {
    const rawQuery = req.query.search || "";
    const searchQuery = rawQuery.trim().toLowerCase();

    if (!searchQuery) {
      return res.render("products/productSearch", {
        products: [],
        searchQuery: "",
      });
    }

    const searchConditions = {
      [Op.or]: [
        where(fn("LOWER", col("Product.name")), "LIKE", `%${searchQuery}%`),
        where(fn("LOWER", col("Brand.name")), "LIKE", `%${searchQuery}%`),
        where(fn("LOWER", col("Category.name")), "LIKE", `%${searchQuery}%`),
        // where(fn("LOWER", col("Product.description")), "LIKE", `%${searchQuery}%`) // Activar si se desea
      ],
    };

    const products = await db.Product.findAll({
      include: [
        { model: db.Brand, as: "Brand", required: false },
        { model: db.Category, as: "Category", required: false },
        // { model: db.Color, as: "Colors", required: false } // Activar si es necesario
      ],
      where: searchConditions,
    });

    return res.render("products/productSearch", {
      products,
      searchQuery: rawQuery,
    });
  } catch (error) {
    console.error("🔍 Error en la búsqueda de productos:", error.message);
    return res.status(500).render("error", {
      message: "Ocurrió un error al realizar la búsqueda.",
      error,
    });
  }
};

module.exports = search;
