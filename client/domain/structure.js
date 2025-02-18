import { mountFolderPromise } from "../controller/folder.js";

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

const folderComponent = (folderName, path, onClick) => {
  const folderElement = document.createElement("span");
  folderElement.classList.add("folder");

  if (path !== "") path = "/" + path;

  const slashCount = path.split("/").length;
  folderElement.style.paddingLeft = `${slashCount * 20}px`;

  folderElement.innerHTML = `
    <img src="assets/folder.png" alt="Folder" />
    <span>${folderName}</span>
  `;

  folderElement.addEventListener("click", onClick);

  return folderElement;
};

let lastActiveFolder;

/**
 * Set the active folder.
 * @param {HTMLElement} folderElement - The folder element to set as active.
 */

function setActiveFolder(folderElement) {
  if (lastActiveFolder) {
    lastActiveFolder.classList.remove("active");
  }
  lastActiveFolder = folderElement;
  lastActiveFolder.classList.add("active");
}

export function unselectFolders() {
  const folders = document.querySelectorAll(".folder");
  lastActiveFolder = null;
  folders.forEach((folder) => {
    folder.classList.remove("active");
  });
}

const foldersContainer = document.querySelector("#folders");

const rootFolder = folderComponent("Raiz", "", () => {
  setActiveFolder(rootFolder);
  mountFolderPromise("");
});

lastActiveFolder = rootFolder;
rootFolder.classList.add("active");

foldersContainer.appendChild(rootFolder);

/**
 * Recursively render the folder structure.
 * @param {FolderNode[]} structure - The hierarchical folder structure.
 */
export default function renderStructure(structure) {
  structure.forEach((folder) => {
    const folderElement = folderComponent(folder.name, folder.path, () => {
      setActiveFolder(folderElement);
      mountFolderPromise(folder.path);
    });

    foldersContainer.appendChild(folderElement);

    if (folder.children.length) {
      renderStructure(folder.children);
    }
  });
}
