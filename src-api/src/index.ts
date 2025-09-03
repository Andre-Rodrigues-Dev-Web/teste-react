import express from "express";
import { newsController } from "./Controller/NewsController";

const port = 8000;
const app = express();
app.use(express.json());
app.get("/", (_, res) => {
  res.status(200).json({ msg: "API" });
});

app.use("/news", newsController);
app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
