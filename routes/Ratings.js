const express = require("express");
const ratings = express.Router();
const cors = require("cors");
const Rating = require("../models/Rating");
ratings.use(cors());

ratings.post("/rate", (req, res) => {
  const data = {
    user_id: req.body.user,
    movie_id: req.body.movie,
    rating: req.body.rating,
  };
  Rating.create(data)
    .then((item) => {
      if (item) {
        res.json(item);
      } else {
        res.status(400).json({ error: "Something went wrong" });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

module.exports = ratings;
