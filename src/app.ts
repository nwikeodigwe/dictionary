require("dotenv").config();
import express from "express";
const app = express();

module.exports = app;

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
