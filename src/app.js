// src/app.js
import express from "express";
import { getPhrases } from "./dynamo.js";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(process.cwd(), "public")));

app.get("/api/phrase", async (req, res) => {
  try {
    const phrases = await getPhrases();
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    res.json(randomPhrase);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch phrase" });
  }
});

/*app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});*/

app.listen(3000, '0.0.0.0', () => {
    console.log('Server is running...');
  });