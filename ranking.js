//Ranking

class Rankings {
  constructor() {
    this.tableBody = document.getElementById("rankings-body");
    this.message = document.getElementById("message");
    this.loadRankings();
  }

  getUsers() {
    // get all users from localStorage
    return JSON.parse(localStorage.getItem("users")) || [];
  }

  loadRankings() {
    const users = this.getUsers();
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));

    if (users.length === 0) {
      this.message.textContent = "No users or scores yet!";
      return;
    }

    // sort users by highest score
    const sorted = users.sort((a, b) => (b.score || 0) - (a.score || 0));

    // display top 10
    sorted.slice(0, 10).forEach((user, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${user.username}</td>
        <td>${user.score || 0}</td>
      `;

      // highlight current logged-in player
      if (activeUser && user.username === activeUser.username) {
        row.style.backgroundColor = "#cceeff";
        row.style.fontWeight = "bold";
      }

      this.tableBody.appendChild(row);
    });
  }
}

// wait until page is ready
document.addEventListener("DOMContentLoaded", () => new Rankings());


// Navbar login/logout toggle 
function updateNavForLoginState() {
  const loginLink = document.getElementById("login-link");
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));

  if (!loginLink) return; 

  if (activeUser) {
    loginLink.textContent = "Logout";
    loginLink.href = "#";
    loginLink.addEventListener("click", () => {
      localStorage.removeItem("activeUser");
      window.location.href = "/html/login.html";
    });
  } else {
    loginLink.textContent = "Login";
    loginLink.href = "/html/login.html";
  }
}

document.addEventListener("DOMContentLoaded", updateNavForLoginState);
