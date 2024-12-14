import { loadHeaderFooter, renderListWithTemplate } from "./utils.mjs";
import { getRandomRecipes } from "./externalServices.mjs";
import { setupCarousel } from "./carousel.mjs";
import { saveToFavorites } from "./favorites.mjs";
import { checkLogin } from "./auth.mjs";

// this loads the updateCartCount after the content is loaded
document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter().then(() => {
    getFeaturedRecipes();
    setupSearchBtn();
  });
});

function setupSearchBtn() {
  const searchBtn = document.getElementById("searchBtn");
  searchBtn.addEventListener("click", () => navigateSearch());
}

function featuredRecipeCardNotLoggedInTemplate(item) {
  return `<div
        class="slide hidden" 
    >
        <img src="${item.image}" />
        <div class=slideContent>
        <h3>${item.title}</h3>
        <p>${item.summary.substring(0, 100)}</p>
        <div class=slideActions>
            <a href="${
              item.spoonacularSourceUrl
            }" target="_blank"><button>View Recipe</button></a>
        </div>
        </div>
    </div>`;
}

function featuredRecipeCardTemplate(item) {
  return `<div
        class="slide hidden" 
    >
        <img src="${item.image}" />
        <div class=slideContent>
        <h3>${item.title}</h3>
        <p>${item.summary.substring(0, 100)}</p>
        <div class=slideActions>
            <a href="${
              item.spoonacularSourceUrl
            }" target="_blank"><button>View Recipe</button></a>
            <button class="saveButton" data-index=${item.index} >Save</button>
        </div>
        </div>
    </div>`;
}

function navigateSearch() {
  const inputValue = document.getElementById("searchInput").value;
  if (inputValue) {
    window.location.href = `/search/?searchTerm=${inputValue}`;
  }
}
let results = [];
async function getFeaturedRecipes() {
  try {
    const authResult = checkLogin();
    if (authResult) {
      const navList = document.querySelector(".navList");
      navList.innerHTML = `
       <li><a href="/meal-planner/">Meal Planner</a></li>
        <li><a href="/favorites/">Favorites</a></li>
        <li><a href="/login/index.html"><button id="loginBtn" class="login-btn">Logout</button></a></li>
      `;
    } else {
      const navList = document.querySelector(".navList");
      navList.innerHTML = `<li><a href="/login/index.html"><button id="loginBtn" class="login-btn">Login</button></a></li>`;
    }
    results = await getRandomRecipes();
    console.log(results);
    // debugger
    if (results && results.length > 0) {
      results = results.map((obj, index) => ({ ...obj, index }));
      const el = document.querySelector(".carousel");
      if (authResult)
        renderListWithTemplate(featuredRecipeCardTemplate, el, results);
      else
        renderListWithTemplate(
          featuredRecipeCardNotLoggedInTemplate,
          el,
          results
        );

      setupCarousel();
      const saveButtons = document.querySelectorAll(".saveButton");

      saveButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          const index = e.target.dataset.index;
          const recipe = results[index];
          if (recipe) {
            saveToFavorites(recipe);
          }
        });
      });
      //
    }
  } catch (error) {
    //
    console.log(error);
  }
}
