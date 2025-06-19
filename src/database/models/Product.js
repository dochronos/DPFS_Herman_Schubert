module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Categories",
          key: "id",
        },
      },
      brand_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Brands",
          key: "id",
        },
      },
      officialWeb: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      size: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "Products",
      timestamps: true,
      underscored: false,
    }
  );

  Product.associate = (models) => {
    Product.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "Category",
    });
    Product.belongsTo(models.Brand, {
      foreignKey: "brand_id",
      as: "Brand",
    });
    Product.belongsToMany(models.Color, {
      through: "ProductColor",
      foreignKey: "product_id",
      otherKey: "color_id",
      as: "Colors",
    });
    Product.hasMany(models.CartItem, {
      foreignKey: "product_id",
      as: "CartItems",
    });
  };

  return Product;
};
