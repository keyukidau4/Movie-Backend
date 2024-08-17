import {
  GenreMovie,
  RatingMovie,
  TrailerMovie,
  TrendingMovie,
  SearchMovie,
} from "../controllers/movies/index.js";
import { checkParam } from "../middleware/movies/index.js";
import { authern } from "../middleware/user/index.js";

export default (router) => {
  // router.get("/movies/trending/:page/:language", authern, TrendingMovie);
  // router.get("/movies/top-rate/:page", authern, RatingMovie);
  // router.get("/movies/discover/:page/:genre", authern, GenreMovie);
  // router.get("/movies/discover/:page/*", authern, checkParam, GenreMovie);
  // router.get("/movies/video", authern, TrailerMovie);
  // router.post("/movies/search", authern, SearchMovie);
  router.get("/movies/trending/:page/:language", TrendingMovie);
  router.get("/movies/top-rate/:page", RatingMovie);
  router.get("/movies/discover/:page/:genre", GenreMovie);
  // router.get("/movies/discover/:page/*", checkParam, GenreMovie);
  router.get("/movies/video", TrailerMovie);
  router.post("/movies/search", SearchMovie);
};
