document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registerForm");

  if (!form) {
    console.error("Form not found!");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    if (!name || !email || !password || !role) {
      document.getElementById("msg").textContent = "Please fill all fields.";
      return;
    }

    const user = { name, email, password, role };
    localStorage.setItem("canteenUser", JSON.stringify(user));

    document.getElementById("msg").textContent = "Registration successful!";

    setTimeout(() => {
      window.location.href = "menu.html";
    }, 2000);
  });
});
