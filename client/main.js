import { mountFolderPromise } from "./controller/folder.js";
import search from "./controller/search.js";
import { mountStructurePromise } from "./controller/structure.js";
import renderFolder from "./domain/folder.js";
import { unselectFolders } from "./domain/structure.js";

Promise.all([mountStructurePromise(), mountFolderPromise()]);

const searchBar = document.querySelector("#search-bar");
const searchInput = document.querySelector("#search");

searchBar.addEventListener("submit", async (e) => {
  e.preventDefault();
  unselectFolders();
  const searchResult = await search(searchInput.value);
  renderFolder(searchResult);
});
