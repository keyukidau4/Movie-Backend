import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import http from "http";
import cors from "cors";
import router from "../src/router/index.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "https://movie-frontend-flame.vercel.app",
    ],
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server listen on port 8080");
});

app.use("/api", router());
