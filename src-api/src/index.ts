import express = require("express");

const port = 8000;
const app = express();

app.get("/", (_, res) => {
  res.status(200).json({ msg: "API" });
});

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
