import { loadHeaderFooter, renderListWithTemplate } from "./utils.mjs";
import { getRandomRecipes } from "./externalServices.mjs";
import { setupCarousel } from "./carousel.mjs";

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

function featuredRecipeCardTemplate(item) {
    return `<div
        class="slide hidden" 
    >
        <img src="${item.image}" />
        <div class=slideContent>
        <h3>${item.title}</h3>
        <p>${item.summary.substring(0,100)}</p>
        <div class=slideActions>
            <a href="${item.spoonacularSourceUrl}" target="_blank"><button>View Recipe</button></a>
            <button>Save</button>
        </div>
        </div>
    </div>`
}

function navigateSearch(){
    const inputValue = document.getElementById("searchInput").value;
    if(inputValue){
      window.location.href = `/search/?searchTerm=${inputValue}`
    }
  }

async function getFeaturedRecipes() {
    try {
        const results = await getRandomRecipes();
        console.log(results)
        // debugger
        if(results && results.length > 0) {
            const el = document.querySelector(".carousel");
            renderListWithTemplate(featuredRecipeCardTemplate, el, results);
            setupCarousel();
            //
        }
    } catch (error) {
        //
        console.log(error)
    }
}
