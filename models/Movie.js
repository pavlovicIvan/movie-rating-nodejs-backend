const Sequelize = require("sequelize");
const db = require("../database/connection");

module.exports = db.sequelize.define(
  "movies",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
    },
    cover: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    release_date: {
      type: Sequelize.INTEGER,
    },
    actors: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
