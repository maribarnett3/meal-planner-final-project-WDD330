const baseURL = import.meta.env.VITE_SERVER_URL;
const recipeURL = import.meta.env.VITE_SPOONACULAR_URL;
const recipeKey = import.meta.env.VITE_SPOONACULAR_KEY;

async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: "servicesError", message: data };
  }
}

export async function getRandomRecipes() {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const response = await fetch(
    recipeURL + `random?limitLicense=true&apiKey=${recipeKey}&number=3`,
    requestOptions
  );
  const data = await convertToJson(response);
  return data.recipes;
}

export async function getRecipes(searchTerm) {
  
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const response = await fetch(
    recipeURL + `complexSearch?limitLicense=true&apiKey=${recipeKey}&addRecipeInformation=true&number=3&query=${searchTerm}`,
    requestOptions
  );
  const data = await convertToJson(response);
  return data;
}
//   https://api.spoonacular.com/recipes/complexSearch?query=pasta&apiKey=xxx