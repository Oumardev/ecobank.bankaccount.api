'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      IssuingNetwork: {
        type: Sequelize.STRING
      },
      CardNumber: {
        type: Sequelize.STRING
      },
      Bank: {
        type: Sequelize.STRING
      },
      Name: {
        type: Sequelize.STRING
      },
      Address: {
        type: Sequelize.STRING
      },
      Country: {
        type: Sequelize.STRING
      },
      MoneyRange: {
        type: Sequelize.STRING
      },
      CVV: {
        type: Sequelize.INTEGER
      },
      Expiry: {
        type: Sequelize.STRING
      },
      Pin: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Accounts');
  }
};