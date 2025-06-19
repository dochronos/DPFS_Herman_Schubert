module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define(
    "CartItem",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "ShoppingCarts", // Nombre real de la tabla
          key: "id",
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Products",
          key: "id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          isInt: true,
        },
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0,
          isDecimal: true,
        },
      },
    },
    {
      tableName: "CartItems",
      timestamps: true,
    }
  );

  CartItem.associate = (models) => {
    CartItem.belongsTo(models.ShoppingCart, {
      foreignKey: "cart_id",
      as: "cart",
    });
    CartItem.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });
  };

  return CartItem;
};
