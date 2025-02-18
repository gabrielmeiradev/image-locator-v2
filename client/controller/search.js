import { URL_BASE } from "../constants.js";

export default async function search(term) {
  const response = await fetch(`${URL_BASE}/search?title=${term}`);
  const json = await response.json();

  return json;
}
