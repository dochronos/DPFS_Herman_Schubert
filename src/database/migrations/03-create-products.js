'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      name: { type: Sequelize.STRING, allowNull: false },
      description: Sequelize.TEXT,
      image: Sequelize.STRING,
      category_id: { type: Sequelize.INTEGER, references: { model: 'categories', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'CASCADE' },
      brand_id: { type: Sequelize.INTEGER, references: { model: 'brands', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'CASCADE' },
      officialWeb: Sequelize.STRING,
      size: Sequelize.STRING,
      price: Sequelize.FLOAT,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('products');
  },
};