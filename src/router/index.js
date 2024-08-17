import express from "express";
import movies from "./movies.js";
import user from "./user.js";

const router = express.Router();

export default () => {
  // user(router);
  movies(router);
  return router;
};
