module.exports = (sequelize, DataTypes) => {
  const ShoppingCart = sequelize.define(
    "ShoppingCart",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
    },
    {
      tableName: "ShoppingCarts", // 🟢 CAMBIO: plural para evitar conflictos con FK
      timestamps: true,
    }
  );

  ShoppingCart.associate = (models) => {
    ShoppingCart.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
      onDelete: "CASCADE",
    });

    ShoppingCart.hasMany(models.CartItem, {
      foreignKey: "cart_id",
      as: "items",
      onDelete: "CASCADE",
    });
  };

  return ShoppingCart;
};
