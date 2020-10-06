const Sequelize = require("sequelize");

const sequelize = new Sequelize("shorturldb", "root", "root@123", {
  dialect: "mysql",
  port: 3306,
  host: "localhost",
  logging: false,
});

module.exports = sequelize;
