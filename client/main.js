import getFilesByFolder from "./controller/folder.js";
import getFoldersStructure from "./controller/structure.js";
import renderStructure from "./domain/structure.js";
import renderFolder from "./domain/folder.js";

const mountStructurePromise = async () => {
  const structure = await getFoldersStructure();
  renderStructure(structure);
};

const mountFolderPromise = async (path) => {
  const folder = await getFilesByFolder(path);
  console.log(folder);
  renderFolder(folder);
};

Promise.all([mountStructurePromise(), mountFolderPromise("pasta-pai")]);
