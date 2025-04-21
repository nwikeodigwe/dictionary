import express from "express";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import en from "../routes/en";

export default (app: express.Application) => {
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/en", en);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
