'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Account.init({
    IssuingNetwork: DataTypes.STRING,
    CardNumber: DataTypes.STRING,
    Bank: DataTypes.STRING,
    Name: DataTypes.STRING,
    Address: DataTypes.STRING,
    Country: DataTypes.STRING,
    MoneyRange: DataTypes.STRING,
    CVV: DataTypes.INTEGER,
    Expiry: DataTypes.STRING,
    Pin: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};