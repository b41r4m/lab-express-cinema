const express = require("express");
const router = express.Router();

const Movie = require("../models/Movie.model");

/* GET home page */
router.get("/", (req, res, next) => res.render("index"));

// GET movies page
router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((allTheMovieFromDB) => {
      console.log("Retrieved movies from DB:", allTheMovieFromDB);
      res.render("movies", { movies: allTheMovieFromDB });
    })
    .catch((error) => {
      console.log("Error while getting the movies from the DB: ", error);

      next(error);
    });
});

//GET movie details page
router.get("/movies/:movieId", (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((theMovie) => res.render("details", { movie: theMovie }))
    .catch((error) => {
      console.log("Error while retrieving book details: ", error);

      next(error);
    });
});

module.exports = router;
