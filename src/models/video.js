import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);
const filePath = path.resolve(__dirname, "../Data/videoList.json");

const Videos = {
  all: () => {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  },
};

export default Videos;
