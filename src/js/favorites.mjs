import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function saveToFavorites(recipe) {
  const favorites = getFavorites();
  favorites.push(recipe);
  setLocalStorage("favorites", favorites);
}

export { saveToFavorites };

export function getFavorites() {
  return getLocalStorage("favorites") || [];
}

export function removeFromFavorites(index) {
  const favorites = getFavorites();
  favorites.splice(index, 1);
  setLocalStorage("favorites", favorites);
}
