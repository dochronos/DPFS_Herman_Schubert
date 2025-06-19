module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM("user", "admin"),
        defaultValue: "user",
      },
      profileImage: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "Users",
      timestamps: true,
    }
  );

  User.associate = (models) => {
    User.hasMany(models.ShoppingCart, {
      foreignKey: "user_id",
      as: "shoppingCarts",
      onDelete: "CASCADE", // Limpia carritos si se borra el usuario
    });

    User.hasMany(models.Sale, {
      foreignKey: "user_id",
      as: "sales",
      onDelete: "CASCADE", // Limpia ventas si se borra el usuario
    });
  };

  return User;
};
