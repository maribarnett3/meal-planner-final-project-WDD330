import { checkLogin } from "./auth.mjs";

// header.js
document.addEventListener("DOMContentLoaded", () => {
  // const loginButton = document.getElementById("loginBtn");

  // // When the login button is clicked, redirect to the login page
  // loginButton.addEventListener("click", () => {
  //   window.location.href = "/login.html"; // Redirect to the login page
  // });
  debugger;
  const result = checkLogin();
  debugger
  if (result) {
    //
  }
});
