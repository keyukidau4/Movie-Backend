import express from "express";
import movies from "./movies.js";

const router = express.Router();

export default () => {
  movies(router);
  return router;
};
