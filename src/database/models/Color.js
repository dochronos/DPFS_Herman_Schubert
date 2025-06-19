module.exports = (sequelize, DataTypes) => {
  const Color = sequelize.define(
    "Color",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El nombre del color no puede estar vacío.",
          },
        },
      },
    },
    {
      tableName: "Colors",
      timestamps: false,
    }
  );

  Color.associate = (models) => {
    Color.belongsToMany(models.Product, {
      through: "ProductColor",
      foreignKey: "color_id",
      otherKey: "product_id",
      as: "products",
    });
  };

  return Color;
};
