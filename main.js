//Home

class HomePage {
    constructor() {
      this.startButton = document.getElementById("start-btn");
      this.statusMessage = document.getElementById("status-msg");
      this.init();
    }
  
    init() {
      this.startButton.addEventListener("click", () => this.handleStart());
      this.showWelcomeMessage();
    }
  
    showWelcomeMessage() {
      const activeUser = JSON.parse(localStorage.getItem("activeUser"));
      if (activeUser) {
        this.statusMessage.textContent = `Welcome back, ${activeUser.username}!`;
        this.statusMessage.style.color = "#ffca28";
      } else {
        this.statusMessage.textContent = "You are not logged in.";
        this.statusMessage.style.color = "#ccc";
      }
    }
  
    handleStart() {
      const activeUser = JSON.parse(localStorage.getItem("activeUser"));
      if (activeUser) {
        window.location.href = "game.html"; 
      } else {
        this.statusMessage.textContent = "Please login to play the game!";
        this.statusMessage.style.color = "salmon";
        setTimeout(() => (window.location.href = "login.html"), 1500);
      }
    }
  }
  
  // run when page is loaded
  document.addEventListener("DOMContentLoaded", () => new HomePage());
  
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
  