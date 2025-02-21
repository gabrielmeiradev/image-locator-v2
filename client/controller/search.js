import { URL_BASE } from "../constants.js";
import { setAppState } from "../main.js";

export default async function search(term) {
  setAppState("search");

  const response = await fetch(`${URL_BASE}/search?title=${term}`);
  const json = await response.json();

  return json;
}
