'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      firstName: Sequelize.STRING,
      lastName: Sequelize.STRING,
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: Sequelize.STRING,
      category: Sequelize.STRING,
      profileImage: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};