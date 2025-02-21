/**
 * @typedef {Object} Folder
 * @property {number} page - Current page number.
 * @property {string} path - Folder path identifier.
 * @property {Image[]} files - List of file names.
 * @property {number} files_per_page - Number of files per page.
 * @property {number} total - Total number of files.
 */

import { formatFileSize } from "../utils/formatFileSize.js";
import { formatDate } from "../utils/formatFileDate.js";
import { currentPage, loadMore } from "../controller/folder.js";

/**
 * @typedef {Object} Image
 * @property {string} name - The name of the image file.
 * @property {string} path - The path to the image file.
 * @property {number} size - The size of the image file in bytes.
 * @property {Date} createdAt - The creation date of the image file.
 */

const contextMenu = document.querySelector("#context-menu");
const copyRelativePathButton = document.querySelector("#copy-relative-path");
const copyAbsolutePathButton = document.querySelector("#copy-title");

const openContextMenu = (event, file) => {
  console.log(event.clientX);

  const x = event.clientX;
  const y = event.clientY;

  contextMenu.style.display = "flex";
  contextMenu.style.left = `${x}px`;
  contextMenu.style.top = `${y}px`;
  copyRelativePathButton.onclick = () => {
    navigator.clipboard.writeText(`${file.relativePath}`);
    const originalText = copyRelativePathButton.innerText;
    copyRelativePathButton.innerText = "Copiado!";
    setTimeout(() => {
      copyRelativePathButton.innerText = originalText;
      closeContextMenu();
    }, 1000);
  };

  copyAbsolutePathButton.onclick = () => {
    navigator.clipboard.writeText(file.name);
    const originalText = copyAbsolutePathButton.innerText;
    copyAbsolutePathButton.innerText = "Copiado!";
    setTimeout(() => {
      copyAbsolutePathButton.innerText = originalText;
      closeContextMenu();
    }, 1000);
  };
};

const closeContextMenu = () => {
  contextMenu.style.display = "none";
};

window.onclick = (event) => {
  if (!contextMenu.contains(event.target)) {
    closeContextMenu();
  }
};
const filesContainer = document.querySelector("#files");

export let lastPathRendered = "";

export default function renderFolder(folder) {
  if (
    folder.path != lastPathRendered ||
    currentPage == folder.page ||
    window.appState == "search"
  ) {
    filesContainer.innerHTML = "";
  }

  appendFolder(folder);

  lastPathRendered = folder.path;
}

export function appendFolder(folder) {
  folder.files.forEach((file) => {
    const fileElement = document.createElement("div");
    fileElement.classList.add("file");
    fileElement.innerHTML = `
    <div class="img-container">
      <img src="/uploads/${
        file.relativePath
      }" alt="File icon" class="file-img" loading="lazy" />
      <span class="file-info">
          ${formatFileSize(file.size)} - ${formatDate(file.createdAt)}
      </span>
    </div>

    <p class="file-name">${file.name}</p>
    `;

    fileElement.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      openContextMenu(event, file);
    });

    filesContainer.appendChild(fileElement);
  });
}

const canLoadMore = () => {
  return (
    filesContainer.lastElementChild.getBoundingClientRect().bottom <
      window.innerHeight + 100 && appState !== "search"
  );
};

window.onscroll = async () => {
  if (canLoadMore()) {
    await loadMore();
  }
};
