// const logger = require("../utils/Logger");
import status from "http-status";
import { ErrorRequestHandler } from "express";

const error: ErrorRequestHandler = (err, req, res, next) => {
  //   logger.error(err.message, err);
  res
    .status(status.INTERNAL_SERVER_ERROR)
    .json({ message: status[status.INTERNAL_SERVER_ERROR], data: {} });
};

export default error;
