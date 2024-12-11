import {
  loadHeaderFooter,
  loadTemplate,
  renderListWithTemplate,
  renderWithTemplate,
} from "./utils.mjs";
import { getFavorites, removeFromFavorites } from "./favorites.mjs";

// this loads the updateCartCount after the content is loaded
document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter().then(() => {
    // updateCartCount();
    rendermealselection();
  });
});

//   https://api.spoonacular.com/recipes/complexSearch?query=pasta&apiKey=xxx
let favorites = [];
function rendermealselection() {
  favorites = getFavorites();
  const mealSelects = document.querySelectorAll(".mealSelect");
  let optionHTML = ' <option value="">Select a meal</option>';
  favorites.forEach((favorite) => {
    optionHTML += `<option value="${favorite.id}">${favorite.title}${
      favorite.extendedIngredients ? " ✔" : ""
    }</option>`;
  });
  mealSelects.forEach((select) => {
    select.innerHTML = optionHTML;
    // <option value="">Select a meal</option>
  });
  var genlistbtn = document.querySelector("#generateShoppingList");

  genlistbtn.addEventListener("click", async () => {
    // const selectedMeals = {};
    let ingredients = [];
    mealSelects.forEach((select) => {
      let selectedValue = select.value;
      if (selectedValue) {
        selectedValue = parseInt(selectedValue);
        const match = favorites.find(
          (favorite) => favorite.id === selectedValue
        );
        if (match) {
          if (
            match.extendedIngredients &&
            match.extendedIngredients.length > 0
          ) {
            match.extendedIngredients.forEach((ing) => {
              if (!ingredients.includes(ing)) {
                ingredients.push(ing);
              }
            });
          }
          //
        }
        // const day = select.parentElement.querySelector("h3").textContent;
        // selectedMeals[day] = selectedValue;
      }
    });
    console.log(ingredients);
    const modal = document.querySelector("#shoppingList");
    const shoppingListTemplate = loadTemplate("/partials/shoppinglist.html");
    // const htmlString = list.map(templateFn);
    await renderWithTemplate(shoppingListTemplate, modal);
    // modal.innerHTML = htmlString.join("");

    const el = document.querySelector("#ingredientList");
    el.innerHTML = "";
    renderListWithTemplate(ingredientsTemplate, el, ingredients);
    // bind print and close buttons
    const closeButton = document.querySelector(".closeButton");
    closeButton.addEventListener("click", () => {
      modal.innerHTML = "";
      // modal.style.display = "none";
    });
    const printButton = document.querySelector(".printButton");
    printButton.addEventListener("click", () => {
      window.print();
    });
  });
}

function ingredientsTemplate(ingredient) {
  return `<li data-key=${ingredient.id}>${ingredient.original}</li>`;
}
