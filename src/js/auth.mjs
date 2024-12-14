import { loginRequest } from "./externalServices.mjs";
import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";
import { jwtDecode } from "jwt-decode";

const tokenKey = "so-token";

export async function login(creds, redirect = "/") {
  try {
    const token = await loginRequest(creds);
    setLocalStorage(tokenKey, token);
    window.location = redirect;
  } catch (err) {
    alertMessage(err.message.message);
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
