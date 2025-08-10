document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("errorMsg");

  const storedUser = JSON.parse(localStorage.getItem("canteenUser"));

  if (!storedUser) {
    errorMsg.textContent = "No registered user found. Please register first.";
    return;
  }

  if (email === storedUser.email && password === storedUser.password) {
    // Store current logged in user session (optional)
    localStorage.setItem("currentUser", JSON.stringify(storedUser));
    window.location.href = "menu.html";
  } else {
    errorMsg.textContent = "Invalid email or password.";
  }
});
