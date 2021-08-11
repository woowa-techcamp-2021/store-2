import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (_, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log(`써-버 온`);
});
