import express, { RequestHandler } from "express";

const router = express.Router();

const index: RequestHandler = (req, res) => {
  res.json({ message: "Hello World" });
};

router.get("/", index);

export default router;
