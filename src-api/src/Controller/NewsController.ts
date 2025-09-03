import { Router } from "express";
import {
  addNews,
  createSampleNews,
  getNews,
} from "../Repository/NewsRepository";
const newsController = Router();
newsController.post("/createSample", async (_, res) => {
  await createSampleNews();
  res.sendStatus(200);
});
newsController.get("/", async (_, res) => {
  const news = await getNews();
  res.status(200).json(news);
});
newsController.post("/", async (req, res) => {
  if (!req.body) {
    res.status(400).json({ msg: "Request missing body" });
    return;
  }
  const { title, author, content } = req.body;
  const missing = [];
  if (!title) missing.push("title");
  if (!author) missing.push("author");
  if (!content) missing.push("content");
  if (missing.length > 0) {
    res.status(400).json({
      msg: `News object is missing the following fields: ${missing.join(", ")}`,
    });
    return;
  }
  let news = await addNews({ title, author, content });
  res.status(201).json(news);
});

export { newsController };
