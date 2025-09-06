import { Router } from "express";
import {
  addNews,
  deleteNews,
  getAllNews,
  getNews,
  newsBelongsToUser,
  updateNews,
} from "../Repository/NewsRepository";
import { validateAddNews, validateID } from "./Middleware/ValidateNews";
import {
  RepositoryError,
  RepositoryErrorType,
} from "../Repository/RepositoryError";
import { authenticate } from "./Middleware/Authenticate";
const newsController = Router();
newsController.get("/", async (_, res) => {
  const news = await getAllNews();
  res.status(200).json(news);
});
newsController.get("/:id", async (req, res) => {
  const id = req.params["id"];
  if (!id) {
    res.status(400).json({ msg: "No ID provided" });
    return;
  }
  try {
    let news = await getNews(id);
    res.status(200).json(news);
  } catch (error) {
    if (error instanceof RepositoryError) {
      let status: number;
      const { message, errorType } = error;
      if (
        errorType === RepositoryErrorType.Empty ||
        errorType === RepositoryErrorType.NotFound
      ) {
        status = 404;
      } else {
        status = 400;
      }
      res.status(status).json({ message, errorType });
    } else {
      throw error;
    }
  }
});
newsController.post("/", authenticate, validateAddNews, async (req, res) => {
  const { title, content } = req.body;
  const author = res.locals["user"];
  let news = await addNews({
    title,
    author,
    content,
  });
  res.status(201).json(news);
});
newsController.put(
  "/:id",
  authenticate,
  validateID,
  validateAddNews,
  async (req, res) => {
    const newsID = req.params["id"];
    if (!newsID) {
      res.status(400).json({ msg: "No ID provided" });
      return;
    }
    const { title, content } = req.body;
    const { id: authorID } = res.locals["user"];
    if (!(await newsBelongsToUser(newsID, authorID))) {
      res.status(403).json({ msg: "This news belongs to another user" });
      return;
    }
    try {
      let news = await updateNews(newsID, { title, content });
      res.status(201).json(news);
    } catch (error) {
      if (error instanceof RepositoryError) {
        let status: number;
        const { message, errorType } = error;
        if (
          errorType === RepositoryErrorType.Empty ||
          errorType === RepositoryErrorType.NotFound
        ) {
          status = 404;
        } else {
          status = 400;
        }
        res.status(status).json({ message, errorType });
      } else {
        throw error;
      }
    }
  },
);
newsController.delete("/:id", authenticate, validateID, async (req, res) => {
  const newsID = req.params["id"];
  if (!newsID) {
    res.status(400).json({ msg: "No ID provided" });
    return;
  }
  const { id: authorID } = res.locals["user"];
  if (!(await newsBelongsToUser(newsID, authorID))) {
    res.status(403).json({ msg: "This news belongs to another user" });
    return;
  }
  try {
    await deleteNews(newsID);
    res.sendStatus(204);
  } catch (error) {
    if (error instanceof RepositoryError) {
      let status: number;
      const { message, errorType } = error;
      if (
        errorType === RepositoryErrorType.Empty ||
        errorType === RepositoryErrorType.NotFound
      ) {
        status = 404;
      } else {
        status = 400;
      }
      res.status(status).json({ message, errorType });
    } else {
      throw error;
    }
  }
});
export { newsController };
