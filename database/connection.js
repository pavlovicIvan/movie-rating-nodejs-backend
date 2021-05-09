const Sequelize = require("sequelize");
const db = {};
const sequelize = new Sequelize("movies", "root", "", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

db.sequelize = sequelize;
module.exports = db;
