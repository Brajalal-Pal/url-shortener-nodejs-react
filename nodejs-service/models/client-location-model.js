const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/database");

class ClientLocation extends Model {}
ClientLocation.init(
  {
    country_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0,
    },
    postal: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0,
    },
    ipv4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
  },
  { sequelize, modelName: "clientlocation" }
);

module.exports = ClientLocation;
