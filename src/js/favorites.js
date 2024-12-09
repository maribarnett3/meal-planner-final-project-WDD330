import { loadHeaderFooter } from "./utils.mjs";

// this loads the updateCartCount after the content is loaded
document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter().then(() => {
    // updateCartCount();
  });
});

//   https://api.spoonacular.com/recipes/complexSearch?query=pasta&apiKey=xxx
