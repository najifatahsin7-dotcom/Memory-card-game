class LoginManager {
  constructor() {
    this.form = document.getElementById("login-form");
    this.message = document.getElementById("login-msg");
    this.init();
  }

  init() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.loginUser();
    });
  }

  getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
  }

  showMessage(msg) {
    this.message.textContent = msg;
  }

  loginUser() {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!username || !password) {
      this.showMessage("Please enter both username and password.");
      return;
    }

    const users = this.getUsers();
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!foundUser) {
      this.showMessage("Incorrect username or password.");
      return;
    }

    localStorage.setItem("activeUser", JSON.stringify(foundUser));
    this.showMessage(`Welcome back, ${foundUser.username}!`);

    setTimeout(() => {
      window.location.href = "/html/game.html";
    }, 1500);
  }
}

function updateNavForLoginState() {
  const loginLink = document.getElementById("login-link");
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));

  if (activeUser) {
    loginLink.textContent = "Logout";
    loginLink.href = "#"; 
    loginLink.addEventListener("click", () => {
      localStorage.removeItem("activeUser");
      window.location.reload(); 
    });
  } else {
    loginLink.textContent = "Login";
    loginLink.href = "login.html";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new LoginManager();
  updateNavForLoginState();
});

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
