import fs from "fs";
import path from "path";

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
 * @param {Folder} fPath - The folder structure to render.
 */

export default function getFilesByFolder(
  folderPath,
  page = 1,
  filesPerPage = 10
) {
  try {
    const rootPath = process.env.ABSOLUTE_UPLOADS_DIR;
    const directoryPath = path.join(rootPath, folderPath);
    const files = fs.readdirSync(directoryPath);

    const filteredFiles = files.filter((file) => {
      const filePath = path.join(directoryPath, file);
      return fs.statSync(filePath).isFile();
    });

    const totalFiles = filteredFiles.length;
    const totalPages = Math.ceil(totalFiles / filesPerPage);
    const startIndex = (page - 1) * filesPerPage;
    const endIndex = startIndex + filesPerPage;
    const paginatedFiles = filteredFiles.slice(startIndex, endIndex);

    return {
      page,
      path: folderPath,
      filesPerPage,
      totalFiles,
      totalPages,
      files: paginatedFiles,
    };
  } catch (error) {
    console.error(error);
    return {
      page,
      path: folderPath,
      filesPerPage,
      totalFiles: 0,
      totalPages: 0,
      files: [],
    };
  }
}
