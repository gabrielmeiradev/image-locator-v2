/**
 * @typedef {Object} Folder
 * @property {number} page - Current page number.
 * @property {string} path - Folder path identifier.
 * @property {string[]} files - List of file names.
 * @property {number} files_per_page - Number of files per page.
 * @property {number} total - Total number of files.
 */

/**
 * Render folder details.
 * @param {Folder} folder - The folder structure to render.
 */

export default function renderFolder(folder) {
  const filesContainer = document.querySelector("#files");
  console.log(folder);
  folder.files.forEach((file) => {
    console.log("aqui", file);
    const fileElement = document.createElement("img");
    fileElement.src = `/uploads/${folder.path}/${file}`;
    filesContainer.appendChild(fileElement);
  });
}
