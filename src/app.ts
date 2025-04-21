require("dotenv").config();
import express from "express";
import setupRoutes from "./startup/routes";

const app = express();

setupRoutes(app);

module.exports = app;

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
