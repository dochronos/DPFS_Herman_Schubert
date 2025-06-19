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
        // where(fn("LOWER", col("Product.description")), "LIKE", `%${searchQuery}%`) // opcional
      ],
    };

    const products = await db.Product.findAll({
      include: [
        { model: db.Brand, required: false },
        { model: db.Category, required: false },
        // { model: db.Color, required: false } // opcional si se quiere expandir búsqueda
      ],
      where: searchConditions,
    });

    res.render("products/productSearch", {
      products,
      searchQuery: rawQuery,
    });
  } catch (error) {
    console.error("🔍 Error en la búsqueda de productos:", error);
    res.status(500).render("error", {
      message: "Ocurrió un error al realizar la búsqueda.",
      error,
    });
  }
};

module.exports = search;
