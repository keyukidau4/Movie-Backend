import { TrendingMovie } from "../controllers/movies/index.js";

export default (router) => {
  router.get("/movies", TrendingMovie);
};
