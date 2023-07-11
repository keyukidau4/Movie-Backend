import { existsSync, mkdirSync } from "fs";
import { Logger } from "winston";
const winston = require("winston");

const logDir = "./logs";

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: `${logDir}/system-log.log`,
    }),
  ],
});

export default logger;
