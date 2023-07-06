import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);
const pathFile = path.resolve(__dirname, "../Data/movieList.json");

const Movie = {
  all: () => {
    return JSON.parse(fs.readFileSync(pathFile, "utf8"));
  },
};

export default Movie;
