const express = require("express");
const { Op } = require("sequelize");
const movies = express.Router();
const cors = require("cors");
const Movie = require("../models/Movie");
const Rating = require("../models/Rating");
movies.use(cors());

Movie.hasMany(Rating, { foreignKey: "movie_id" });

const calculateAvarage = (response) => {
  const flattenDataValues = ({ dataValues }) => {
    const flattenedObject = {};
    Object.keys(dataValues).forEach((key) => {
      const sum = dataValues["ratings"].reduce((a, b) => a + b.rating, 0);
      flattenedObject["avg_rating"] = sum / dataValues["ratings"].length;
      flattenedObject[key] = dataValues[key];
    });
    return flattenedObject;
  };
  return response
    .map(flattenDataValues)
    .sort((a, b) => b.avg_rating - a.avg_rating);
};

movies.get("/getAll", (req, res) => {
  Movie.findAndCountAll({
    where: {
      type: {
        [req.query.filter === "all" ? Op.or : Op.eq]:
          req.query.filter === "all" ? ["movie", "show"] : req.query.filter,
      },
      [Op.or]: [
        { title: { [Op.like]: "%" + req.query.term + "%" } },
        { description: { [Op.like]: "%" + req.query.term + "%" } },
      ],
    },
    limit: 10,
    offset: req.query.page * 10,
    distinct: true,
    include: [
      {
        model: Rating,
      },
    ],
  })
    .then((item) => {
      const averagedItems = calculateAvarage(item.rows);
      res.send({ ...item, rows: averagedItems });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

module.exports = movies;
