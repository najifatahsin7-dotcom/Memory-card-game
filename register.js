// User class
class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.score = 0; 
  }
}

class Register {
  constructor() {
    this.form = document.getElementById("register-form");
    this.message = document.getElementById("reg-msg");
    this.init();
  }

  init() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.registerUser();
    });
  }

  getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
  }

  saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
  }

  showMessage(msg) {
    this.message.textContent = msg;
  }

  registerUser() {
    const username = document.getElementById("reg-username").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value.trim();
    const confirm = document.getElementById("reg-confirm").value.trim();

    if (!username || !email || !password || !confirm) {
      this.showMessage("Please fill out all fields!");
      return;
    }

    if (password !== confirm) {
      this.showMessage("Passwords do not match!");
      return;
    }

    const users = this.getUsers();

    if (users.some((u) => u.username === username)) {
      this.showMessage("That username is already taken!");
      return;
    }

    const newUser = new User(username, email, password);
    users.push(newUser);
    this.saveUsers(users);

    this.showMessage("Account created! Redirecting to login...");
    setTimeout(() => {
      window.location.href = "/html/login.html";
    }, 1500);
  }
}

// start when page loads
document.addEventListener("DOMContentLoaded", () => new Register());

// Navbar login/logout toggle 
function updateNavForLoginState() {
  const loginLink = document.getElementById("login-link");
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));

  if (!loginLink) return; 

  if (activeUser) {
    // show logout option
    loginLink.textContent = "Logout";
    loginLink.href = "#";
    loginLink.addEventListener("click", () => {
      localStorage.removeItem("activeUser");
      // redirect to login page after logout
      window.location.href = "/html/login.html";
    });
  } else {
    // show login option
    loginLink.textContent = "Login";
    loginLink.href = "/html/login.html";
  }
}

// run when page loads
document.addEventListener("DOMContentLoaded", updateNavForLoginState);
