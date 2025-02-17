/**
 * @typedef {Object} FolderNode
 * @property {string} name - Name of the folder.
 * @property {string} path - Path of the folder.
 * @property {FolderNode[]} children - Subfolders inside this folder.
 */

/**
 * Render the folder structure.
 * @param {FolderNode[]} structure - The hierarchical folder structure.
 */

export default function renderStructure(structure) {
  const foldersContainer = document.querySelector("#folders");
  console.log(structure);

  structure.forEach((folder) => {
    const folderElement = document.createElement("p");
    folderElement.innerText = folder.name;
    foldersContainer.appendChild(folderElement);

    if (folder.children.length) {
      renderStructure(folder.children);
    }
  });
}
