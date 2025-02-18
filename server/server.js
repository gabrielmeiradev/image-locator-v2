import express from "express";
import cors from "cors";
import getFoldersStructure from "./controller/structure.js";
import getFilesByFolder from "./controller/folder.js";
import fs from "fs";
import path from "path";

const app = express();

app.use(cors());

app.get("/structure", async (req, res) => {
  const structure = await getFoldersStructure();
  res.json(structure);
});

app.get("/folder", (req, res) => {
  const { path, page } = req.query;
  const folder = getFilesByFolder(path, page);
  res.json(folder);
});

const readFilesRecursively = (dir, filesList = []) => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      readFilesRecursively(fullPath, filesList);
    } else {
      filesList.push(fullPath);
    }
  });

  return filesList;
};

app.get("/search", (req, res) => {
  const query = req.query.title?.toLowerCase();

  const imagesDirectory = process.env.ABSOLUTE_UPLOADS_DIR;

  try {
    const allFiles = readFilesRecursively(imagesDirectory);

    const filteredFiles = allFiles.filter(
      (file) => path.basename(file).toLowerCase().includes(query) || query == ""
    );

    if (filteredFiles.length === 0) {
      return res
        .status(404)
        .json({ message: "No images found matching the title query" });
    }

    const imageFiles = filteredFiles.map((file) => {
      const stats = fs.statSync(file);
      return {
        name: path.basename(file),
        path: file,
        relativePath: path.relative(imagesDirectory, file),
        size: stats.size,
        createdAt: stats.birthtime,
      };
    });

    res.json({ files: imageFiles });
  } catch (error) {
    res.status(500).json({ error: "Error reading directory" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
