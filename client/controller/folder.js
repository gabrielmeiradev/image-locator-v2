import { URL_BASE } from "../constants.js";
import renderFolder from "../domain/folder.js";

/**
 * @typedef {Object} Folder
 * @property {number} page - Current page number.
 * @property {string} path - Folder path identifier.
 * @property {Image[]} files - List of file names.
 * @property {number} files_per_page - Number of files per page.
 * @property {number} total - Total number of files.
 */

/**
 * @typedef {Object} Image
 * @property {string} name - The name of the image file.
 * @property {string} path - The path to the image file.
 * @property {number} size - The size of the image file in bytes.
 * @property {Date} createdAt - The creation date of the image file.
 */

export default async function getFilesByFolder(path) {
  const response = await fetch(`${URL_BASE}/folder?path=${path}`);
  return await response.json();
}

export const mountFolderPromise = async (path = "") => {
  const folder = await getFilesByFolder(path);
  renderFolder(folder);
};
