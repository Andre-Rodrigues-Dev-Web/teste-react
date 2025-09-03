import { Router } from "express";
import {
  addNews,
  createSampleNews,
  getNews,
  updateNews,
} from "../Repository/NewsRepository";
import { validateAddNews, validateID } from "./Middleware/ValidateNews";
const newsController = Router();
newsController.post("/createSample", async (_, res) => {
  await createSampleNews();
  res.sendStatus(200);
});
newsController.get("/", async (_, res) => {
  const news = await getNews();
  res.status(200).json(news);
});
newsController.post("/", validateAddNews, async (req, res) => {
  const { title, author, content } = req.body;
  let news = await addNews({ title, author, content });
  res.status(201).json(news);
});
newsController.put("/:id", validateID, validateAddNews, async (req, res) => {
  const id = req.params["id"];
  if (!id) {
    res.status(400).json({ msg: "No ID provided" });
    return;
  }
  const { title, author, content } = req.body;
  let news = await updateNews(id, { title, author, content });
  res.status(201).json(news);
});
export { newsController };
