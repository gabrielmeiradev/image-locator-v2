/**
 * @typedef {Object} Folder
 * @property {number} page - Current page number.
 * @property {string} path - Folder path identifier.
 * @property {string[]} files - List of file names.
 * @property {number} files_per_page - Number of files per page.
 * @property {number} total - Total number of files.
 */

/**
 * Get files by a folder path.
 * @param {string} path - Folder path.
 * @returns {Promise<Folder>} Returns a folder structure.
 */

export default async function getFilesByFolder(path) {
  const response = await fetch(`http://localhost:3000/folder?path=${path}`);
  return await response.json();
}
