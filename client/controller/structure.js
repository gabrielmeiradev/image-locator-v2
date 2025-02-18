import { URL_BASE } from "../constants.js";
import renderStructure from "../domain/structure.js";

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
  const response = await fetch(`${URL_BASE}/structure`);
  const data = await response.json();
  return data;
}

export const mountStructurePromise = async () => {
  const structure = await getFoldersStructure();
  renderStructure(structure);
};

export default getFoldersStructure;
