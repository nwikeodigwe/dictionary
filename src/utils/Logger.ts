import winston from "winston";
import "express-async-errors";

class Logger {
  private logger: winston.Logger;

  constructor() {
    const format = winston.format.combine(
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      winston.format.json(),
      winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
      )
    );
    const transports: winston.transport[] = [
      new winston.transports.File({ filename: "logs/info.log" }),
    ];

    if (process.env.NODE_ENV === "debug")
      transports.push(
        new winston.transports.Console({
          format: winston.format.combine(winston.format.colorize(), format),
        })
      );

    this.logger = winston.createLogger({
      level: "debug",
      format,
      transports,
      exceptionHandlers: [
        new winston.transports.File({
          filename: "logs/exceptions.log",
        }),
        new winston.transports.Console({
          format: winston.format.combine(winston.format.colorize()),
        }),
      ],
      exitOnError: false,
    });
  }

  info(message: string, ...args: any[]) {
    this.logger.info(message, ...args);
  }

  error(message: string, ...args: any[]) {
    this.logger.error(message, ...args);
  }

  warn(message: string, ...args: any[]) {
    this.logger.warn(message, ...args);
  }

  debug(message: string, ...args: any[]) {
    this.logger.debug(message, ...args);
  }
}

export default new Logger();
