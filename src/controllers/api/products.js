const Sequelize = require("sequelize");
const db = require("../../database/models");
const {
  getAllProducts,
  getProductById,
} = require("../../service/productRepository");

const showAllProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    const count = products.length;

    const countByCategory = products.reduce((acc, product) => {
      const categoryName = product.Category.name;
      acc[categoryName] = (acc[categoryName] || 0) + 1;
      return acc;
    }, {});

    const productDetails = products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.Category.name,
      brand: product.Brand.name,
      colors: product.Colors.map((color) => color.name),
      price: product.price,
      detail: `/products/${product.id}`,
      imageUrl: `${req.protocol}://${req.get("host")}/images/quantumbloom/${product.image}`, // ✅ Ruta absoluta corregida
    }));

    // Métricas de ventas
    const [totalUnitsSold, totalSalesAmount, latestSales, topProducts] =
      await Promise.all([
        db.Sale.sum("quantity"),
        db.Sale.sum("total"),
        db.Sale.findAll({
          include: [{ model: db.Product, as: "product", attributes: ["name"] }],
          order: [["sale_date", "DESC"]],
          limit: 5,
        }),
        db.Sale.findAll({
          attributes: [
            "product_id",
            [Sequelize.fn("SUM", Sequelize.col("quantity")), "totalSold"],
          ],
          include: [{ model: db.Product, as: "product", attributes: ["name"] }],
          group: ["product_id", "product.id"],
          order: [[Sequelize.literal("totalSold"), "DESC"]],
          limit: 5,
        }),
      ]);

    const latestSalesDetails = latestSales.map((sale) => ({
      productName: sale.product ? sale.product.name : "Producto no disponible",
      quantity: sale.quantity,
      total: sale.total,
      saleDate: sale.sale_date,
    }));

    const topProductsDetails = topProducts.map((sale) => ({
      productName: sale.product ? sale.product.name : "Producto no disponible",
      totalSold: sale.dataValues.totalSold,
    }));

    return res.json({
      count,
      countByCategory,
      totalUnitsSold: totalUnitsSold || 0,
      totalSalesAmount: totalSalesAmount || 0.0,
      latestSales: latestSalesDetails,
      topProducts: topProductsDetails,
      products: productDetails,
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return res.status(500).send("Error al obtener los productos");
  }
};

const showAProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await getProductById(productId);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const productDetail = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      brand: product.Brand.name,
      category: product.Category.name,
      colors: product.Colors.map((color) => color.name),
      size: product.size,
      imageUrl: `${req.protocol}://${req.get("host")}/images/quantumbloom/${product.image}`,
    };

    return res.json(productDetail);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return res.status(500).send("Error al obtener el producto");
  }
};

module.exports = {
  showAllProducts,
  showAProduct,
};
