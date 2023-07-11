import { RatingMovie, TrendingMovie } from "../controllers/movies/index.js";

export default (router) => {
  router.get("/movies/trending", TrendingMovie);
  router.get("/movies/top-rate/:page", RatingMovie);
};
