import { URL_BASE } from "../constants.js";
import renderFolder, {
  appendFolder,
  lastPathRendered,
} from "../domain/folder.js";
import { setAppState } from "../main.js";

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

export default async function getFilesByFolder(path, page) {
  let url = `${URL_BASE}/folder?path=${path}`;
  if (page) url += `&page=${page}`;
  const response = await fetch(url);
  return await response.json();
}

export let currentPage = 1;

export const loadMore = async () =>
  await mountFolderPromise(lastPathRendered, currentPage + 1);

export const mountFolderPromise = async (path = "", page) => {
  setAppState("folder");

  if (path === lastPathRendered && currentPage == page) return;
  if (path != lastPathRendered) currentPage = 1;

  const folder = await getFilesByFolder(path, page);

  if (page) {
    if (page > folder.totalPages) return;

    currentPage = page;

    return appendFolder(folder);
  }

  renderFolder(folder);
};
