import { promises as fs } from "fs";
import path from "path";
import "dotenv/config";

/**
 * @typedef {Object} FolderNode
 * @property {string} name - Name of the folder.
 * @property {string} path - Path of the folder.
 * @property {FolderNode[]} children - Subfolders inside this folder.
 */

/**
 * Get the folder structure.
 * @returns {Promise<FolderNode[]>} The hierarchical folder structure.
 */

export default async function getFoldersStructure() {
  const rootPath = process.env.ABSOLUTE_UPLOADS_DIR;
  const rootPathLength = rootPath.length;

  async function readDirectory(dirPath) {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    const folders = [];

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const folderPath = path.join(dirPath, entry.name);
        const children = await readDirectory(folderPath);
        folders.push({
          name: entry.name,
          path: folderPath.substring(rootPathLength + 1), // remove the rootPath prefix
          children: children,
        });
      }
    }

    return folders;
  }

  return readDirectory(rootPath);
}
