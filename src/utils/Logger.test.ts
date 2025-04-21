// logger.test.js
import logger, { Logger } from "./Logger";
import winston from "winston";

describe("Logger", () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  describe("debug environment", () => {
    it("should add console transport when NODE_ENV is debug", () => {
      process.env.NODE_ENV = "debug";
      const log = new Logger();
      const transports = log.transports;
      expect(
        transports.some((t) => t instanceof winston.transports.Console)
      ).toBe(true);
    });

    it("should not add console transport when NODE_ENV is not debug", () => {
      process.env.NODE_ENV = "production";
      const log = new Logger();
      const transports = log.transports;
      expect(
        transports.some((t) => t instanceof winston.transports.Console)
      ).toBe(false);
    });
  });

  describe("info method", () => {
    it("should call the underlying winston.info method", () => {
      const spy = jest.spyOn(logger, "info");
      const message = "Test info message";
      const meta = { key: "value" };

      logger.info(message, meta);

      expect(spy).toHaveBeenCalledWith(message, meta);
    });
  });

  describe("error method", () => {
    it("should call the underlying winston.error method", () => {
      const spy = jest.spyOn(logger, "error");
      const message = "Test error message";
      const meta = { error: true };

      logger.error(message, meta);

      expect(spy).toHaveBeenCalledWith(message, meta);
    });
  });

  describe("warn method", () => {
    it("should call the underlying winston.warn method", () => {
      const spy = jest.spyOn(logger, "warn");
      const message = "Test warn message";
      const meta = { warning: true };

      logger.warn(message, meta);

      expect(spy).toHaveBeenCalledWith(message, meta);
    });
  });

  describe("debug method", () => {
    it("should call the underlying winston.debug method", () => {
      const spy = jest.spyOn(logger, "debug");
      const message = "Test debug message";
      const meta = { debug: true };

      logger.debug(message, meta);

      expect(spy).toHaveBeenCalledWith(message, meta);
    });
  });
});
