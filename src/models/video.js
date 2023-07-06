import fs from "fs";
import path from "path";

const filePath = path.resolve(__dirname, "../Data/videoList.json");

const Videos = {
  all: () => {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  },
};

export default Videos;
