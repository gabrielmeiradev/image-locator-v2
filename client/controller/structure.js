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

async function getFoldersStructure() {
  const response = await fetch("http://localhost:3000/structure");
  const data = await response.json();
  return data;
}

export default getFoldersStructure;
