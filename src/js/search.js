import {
  loadHeaderFooter,
  renderListWithTemplate,
  getParam,
} from "./utils.mjs";
import { getRecipes } from "./externalServices.mjs";
import { saveToFavorites } from "./favorites.mjs";

// this loads the updateCartCount after the content is loaded
document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter().then(() => {
    runSearch();
    setupSearchBtn();
  });
});

function setupSearchBtn() {
  const searchBtn = document.getElementById("searchBtn");
  searchBtn.addEventListener("click", () => navigateSearch());
}

function navigateSearch() {
  const inputValue = document.getElementById("searchInput").value;
  if (inputValue) {
    window.location.href = `/search/?searchTerm=${inputValue}`;
  }
}

function searchRecipeResultTemplate(item) {
  return `<div key=${item.index} class=recipeCard>
    <img src="${item.image}" />
    <div class=recipeContent>
      <h3>${item.title}</h3>
      <p>${item.summary.substring(0, 100)}</p>
      <div class=cardActions>
        <a href="${
          item.spoonacularSourceUrl
        }" target="_blank"><button>View Recipe</button></a>
        <button class=saveButton data-index=${item.index}>Save</button>
      </div>
    </div>
  </div>
  `;
}

async function runSearch() {
  const searchTerm = getParam("searchTerm");
  debugger;
  if (searchTerm) {
    try {
      document.querySelector("[name='searchTerm']").value = searchTerm;

      let result = await getRecipes(searchTerm);
      console.log(result);
      debugger;
      if (result && result.results && result.results.length > 0) {
        result.results = result.results.map((obj, index) => ({
          ...obj,
          index,
        }));
        const el = document.querySelector(".grid");
        renderListWithTemplate(searchRecipeResultTemplate, el, result.results);
        const saveButtons = document.querySelectorAll(".saveButton");

        saveButtons.forEach((button) => {
          button.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            const recipe = result.results[index];
            if (recipe) {
              saveToFavorites(recipe);
            }
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

//   https://api.spoonacular.com/recipes/complexSearch?query=pasta&apiKey=xxx
