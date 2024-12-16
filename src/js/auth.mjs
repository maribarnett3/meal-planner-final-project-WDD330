import { loginRequest, signupRequest } from "./externalServices.mjs";
import { getFavorites, updateFavoritesCount } from "./favorites.mjs";
import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";
import { jwtDecode } from "jwt-decode";

const tokenKey = "so-token";

export async function signup(creds, redirect = "/login/index.html") {
  try {
      const message = await signupRequest(creds);
      if(message.indexOf("User created") != -1) {
          alertMessage(message);
          // setLocalStorage(tokenKey, token);
          window.location = redirect;

      } else {
          alertMessage(message);
      }
  } catch (err) {
      alertMessage(err.message.message);
  }
}
export async function login(creds, redirect = "/") {
  try {
    const token = await loginRequest(creds);
    setLocalStorage(tokenKey, token);
    window.location = redirect;
  } catch (err) {
    alertMessage(err.message.message);
  }
}


export function updateAuth(){
  const authResult = checkLogin();
  if (authResult) {
    const navList = document.querySelector(".navList");
    navList.innerHTML = `
     <li><a href="/meal-planner/">Meal Planner</a></li>
      <li><a href="/favorites/">Favorites <span id="favorite-count" class="favorite-count" style="display: none;" >0</span></a></li>
      <li><a href="/login/index.html"><button id="loginBtn" class="login-btn">Logout</button></a></li>
    `;
    try {
      const favorites = getFavorites();
      updateFavoritesCount(favorites);
    } catch (error) {
      
    }
  } else {
    const navList = document.querySelector(".navList");
    navList.innerHTML = `<li><a href="/login/index.html"><button id="loginBtn" class="login-btn">Login</button></a></li>`;
  }
}

export function checkLogin() {
  const token = getLocalStorage(tokenKey);
  const valid = isTokenValid(token);
  if (!valid) {
    localStorage.removeItem(tokenKey);
    const location = window.location;
    console.log(location);
  } else return token;
}

function isTokenValid(token) {
  if (token) {
    const decoded = jwtDecode(token);
    let currentDate = new Date();
    if (decoded.exp * 1000 < currentDate.getTime()) {
      console.log("Token expired.");
      return false;
    } else {
      console.log("Valid Token");
      return true;
    }
  } else return false;
}
