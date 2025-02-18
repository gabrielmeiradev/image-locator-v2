import fs from "fs";
import path from "path";

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

/**
 * Render folder details.
 * @param {Folder} fPath - The folder structure to render.
 */

export default function getFilesByFolder(
  folderPath,
  page = 1,
  filesPerPage = 1000
) {
  try {
    const rootPath = process.env.ABSOLUTE_UPLOADS_DIR;
    const directoryPath = path.join(rootPath, folderPath);
    const files = fs.readdirSync(directoryPath);

    const filteredFiles = files
      .map((file) => {
        const filePath = path.join(directoryPath, file);
        const relativePath = path.relative(
          rootPath,
          path.join(directoryPath, file)
        );
        const stats = fs.statSync(filePath);
        const isFile = stats.isFile();
        const isImage = /\.(jpg|jpeg|png|gif)$/i.test(file);
        if (isFile && isImage) {
          return {
            name: file,
            path: filePath,
            relativePath: relativePath,
            size: stats.size,
            createdAt: stats.birthtime,
          };
        }
        return null;
      })
      .filter(Boolean);

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
