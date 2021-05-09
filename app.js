var express = require("express");
var cors = require("cors");
var app = express();
var port = process.env.PORT || 8001;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

var Movies = require("./routes/Movies");
var Ratings = require("./routes/Ratings");

app.use("/movies", Movies);
app.use("/ratings", Ratings);

app.get("/test", (req, res) => {
  res.json({
    message: "Test",
  });
});

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
