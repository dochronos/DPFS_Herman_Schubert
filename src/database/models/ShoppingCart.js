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
      tableName: "ShoppingCart",
      timestamps: true, // createdAt, updatedAt
    }
  );

  ShoppingCart.associate = (models) => {
    ShoppingCart.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
      onDelete: "CASCADE", // Opcional pero recomendado
    });

    ShoppingCart.hasMany(models.CartItem, {
      foreignKey: "cart_id",
      as: "items",
      onDelete: "CASCADE", // Limpia items si se borra el carrito
    });
  };

  return ShoppingCart;
};
