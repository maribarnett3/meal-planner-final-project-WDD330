import { signup } from "./auth.mjs";

// login.js
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    signup({ email: username, password, name, address });
  });
  document.querySelector("#registerButton").addEventListener("click", (e) => {
    e.preventDefault();
    window.location = "/login/index.html";
  })
});
