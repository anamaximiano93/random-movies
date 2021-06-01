const express = require("express");
const randomRouter = express.Router();

const serviceRandom = require("../services/randomServices.js");

randomRouter.post("/roulette/:language", serviceRandom.randomMovies);
randomRouter.get("/popular/:language", serviceRandom.popularMovies);
randomRouter.get("/popular/:language/:page", serviceRandom.popularMovies);
randomRouter.get("/top_rated/:language", serviceRandom.topRatedMovies);
randomRouter.get("/top_rated/:language/:page", serviceRandom.topRatedMovies);
randomRouter.get("/up_coming/:language", serviceRandom.upComingMovies);
randomRouter.get("/up_coming/:language/:page", serviceRandom.upComingMovies);
randomRouter.get("/now_playing/:language", serviceRandom.nowPlayingMovies);
//prettier-ignore
randomRouter.get("/now_playing/:language/:page",serviceRandom.nowPlayingMovies);
//prettier-ignore
randomRouter.post("/recommendations/:language", serviceRandom.recommendationsMovies);
//prettier-ignore
randomRouter.post("/recommendations/:language/:page", serviceRandom.recommendationsMovies);
randomRouter.get("/trending_week/:language", serviceRandom.trendingMovies);
//prettier-ignore
randomRouter.get("/trending_week/:language/:page",serviceRandom.trendingMovies);
randomRouter.post("/search/:language", serviceRandom.searchMovies);
randomRouter.post("/search/:language/:page", serviceRandom.searchMovies);
randomRouter.get("/movie_details/:language/:id", serviceRandom.moviesDetails);
randomRouter.get("/genres/:language", serviceRandom.genresMovies);

module.exports = randomRouter;
