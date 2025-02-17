import express from "express";
import cors from "cors";
import getFoldersStructure from "./controller/structure.js";
import getFilesByFolder from "./controller/folder.js";

const app = express();

app.use(cors());

app.get("/structure", async (req, res) => {
  const structure = await getFoldersStructure();
  res.json(structure);
});

app.get("/folder", (req, res) => {
  const { path, page } = req.query;
  const folder = getFilesByFolder(path, page, 200);
  res.json(folder);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
