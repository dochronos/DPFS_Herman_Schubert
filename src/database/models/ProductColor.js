module.exports = (sequelize, DataTypes) => {
  const ProductColor = sequelize.define(
    "ProductColor",
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "Products",
          key: "id",
        },
      },
      color_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "Colors",
          key: "id",
        },
      },
    },
    {
      tableName: "Product_Colors",
      timestamps: false,
      underscored: true,
    }
  );

  ProductColor.associate = (models) => {
    ProductColor.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });
    ProductColor.belongsTo(models.Color, {
      foreignKey: "color_id",
      as: "color",
    });
  };

  return ProductColor;
};
