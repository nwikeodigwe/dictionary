import express, { RequestHandler } from "express";
import { dictionary } from "../utils/Dictionary";
import { status } from "http-status";

const router = express.Router();

const index: RequestHandler = async (req, res) => {
  const lang = "en";
  const word = dictionary.getRandomWord(lang);
  console.log(word);
  if (!word) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: "Error getting word" });
    return;
  }
  const data = await dictionary.transform(word, lang);
  if (!data) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: "Error transforming word" });
    return;
  }
  res.status(status.OK).json({ message: status[status.OK], data });
};

const getWord: RequestHandler = async (req, res) => {
  const lang = "en";
  const word = req.params.word;
  const data = await dictionary.transform(word, lang);
  if (!data) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: "Error transforming word" });
    return;
  }
  res.status(status.OK).json({ message: status[status.OK], data });
};

router.get("/", index);
router.get("/:word", getWord);

export default router;
