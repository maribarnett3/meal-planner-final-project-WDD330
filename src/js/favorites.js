import { loadHeaderFooter } from "./utils.mjs";
import { getFavorites, removeFromFavorites } from "./favorites.mjs";
import { renderListWithTemplate } from "./utils.mjs";


// this loads the updateCartCount after the content is loaded
document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter().then(() => {
    // updateCartCount();
    renderFavorites();
  
  });
});
let favorites = [];
function renderFavorites() {
  favorites = getFavorites();
  favorites = favorites.map((obj, index) => ({ ...obj, index }));
  const el = document.querySelector(".grid");
  el.innerHTML = "";
  renderListWithTemplate(favoritesTemplate, el, favorites);
  const removeButtons = document.querySelectorAll(".removeButton");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const fIndex = e.target.dataset.index;
      removeFromFavorites(fIndex);
      
        renderFavorites();
      
    });
  });
}

function favoritesTemplate(recipe) {
  return `
    <div class="recipeCard">
      <img src="${recipe.image}" alt="${recipe.title}" />
      <div class="recipeContent">
        <h3>${recipe.title}</h3>
        <p>${recipe.summary}</p>
        <div class="cardActions">
          <a href="${recipe.spoonacularSourceUrl}" target="_blank"><button>View Recipe</button></a>
          <button class="removeButton" data-index=${recipe.index}>Remove</button>
        </div>
      </div>
    </div>
  `;
}

//   https://api.spoonacular.com/recipes/complexSearch?query=pasta&apiKey=xxx
