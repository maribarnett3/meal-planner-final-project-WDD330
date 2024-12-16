import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function saveToFavorites(recipe) {
  const favorites = getFavorites();
  favorites.push(recipe);
  setLocalStorage("favorites", favorites);
  updateFavoritesCount(favorites);
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

export function updateFavoritesCount(favorites) {
  try {
    
      const favoriteCount = document.querySelector("#favorite-count");
      if(favoriteCount){

        if(favorites.length > 0){
          favoriteCount.style.display = "";
          favoriteCount.textContent = favorites.length;
        } else {
          favoriteCount.style.display = "none";
        }
      }
  } catch (error) {
    
  }
}