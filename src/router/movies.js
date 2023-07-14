import {
  GenreMovie,
  RatingMovie,
  TrailerMovie,
  TrendingMovie,
  SearchMovie,
} from "../controllers/movies/index.js";
import { checkParam } from "../middleware/movies/index.js";

export default (router) => {
  router.get("/movies/trending", TrendingMovie);
  router.get("/movies/top-rate/:page", RatingMovie);
  router.get("/movies/discover/:page/:genre", GenreMovie);
  router.get("/movies/discover/:page/*", checkParam, GenreMovie);
  router.get("/movies/video", TrailerMovie);
  router.post("/movies/search", SearchMovie);
};
