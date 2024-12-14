// signup.js
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");

  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get form values
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Basic validation checks
    if (!username || !email || !password || !confirmPassword) {
      alert("All fields are required.");
      return;
    }

    // Check if the passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Check if the email is in a valid format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Simulate sending data to the server (replace with actual API call)
    console.log("Form submitted!");
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);

    // Simulate success and redirect to home page or login page
    alert("Account created successfully!");
    window.location.href = "/login.html"; // Redirect to login page (or home page)
  });
});
