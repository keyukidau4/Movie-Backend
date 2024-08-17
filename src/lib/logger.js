import { existsSync, mkdirSync } from "fs";
import winston from "winston";

const logDir = "./logs";

const { combine, timestamp, label, printf, prettyPrint } = winston.format;
const CATEGORY = "winston custom Log";

// if (!existsSync(logDir)) {
//   mkdirSync(logDir);
// }

const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  // format: winston.format.json(),
  format: combine(
    label({ label: CATEGORY }),
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    // customFormat
    prettyPrint()
  ),
  transports: [
    new winston.transports.File({
      filename: `${logDir}/system-log.log`,
    }),
    new winston.transports.File({
      level: "error",
      filename: `${logDir}/error-log.log`,
    }),
    new winston.transports.Console(),
  ],
});

export default logger;
