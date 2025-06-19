module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define(
    "Brand",
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
          notEmpty: {
            msg: "El nombre de la marca no puede estar vacío",
          },
          len: {
            args: [2, 100],
            msg: "El nombre debe tener entre 2 y 100 caracteres",
          },
        },
      },
    },
    {
      tableName: "Brands",
      timestamps: false,
    }
  );

  Brand.associate = (models) => {
    Brand.hasMany(models.Product, {
      foreignKey: "brand_id",
      as: "products",
    });
  };

  return Brand;
};
