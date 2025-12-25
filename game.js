//Game

import { GameBoard } from "./modules/board.js";
import { generateCards, createCard } from "./modules/cards.js";
import { GameLogic } from "./modules/logic.js";
import { GameTimer } from "./modules/timer.js";

const board = new GameBoard(document.getElementById("game-board"));
const logic = new GameLogic();

const timeDisplay = document.getElementById("time");
const matchesDisplay = document.getElementById("matches");
const startBtn = document.getElementById("start-btn");
const categorySelect = document.getElementById("category");
const difficultySelect = document.getElementById("difficulty");

const gameSettings = {
  easy: { pairs: 8, time: 90 },
  medium: { pairs: 12, time: 60 },
  hard: { pairs: 15, time: 40 },
};

let timer;

// when player clicks-Start Game
startBtn.addEventListener("click", () => {
  const category = categorySelect.value;
  const difficulty = difficultySelect.value;
  const { pairs, time } = gameSettings[difficulty];

  startGame(category, pairs, time);
});

// the main game starter
function startGame(category, pairs, timeLimit) {
  logic.reset();
  matchesDisplay.textContent = "0";

  // generate cards from selected category
  const cards = generateCards(category, pairs).map((img) =>
    createCard(img, handleFlip)
  );
  

  board.setupBoard(pairs);
  board.renderCards(cards);

  // stop any existing timer
  if (timer) timer.stop();

  // new timer
  timer = new GameTimer(
    timeLimit,
    (t) => (timeDisplay.textContent = t),
    handleTimeUp
  );

  timer.start();
}

// handle flipping and matching
function handleFlip(card) {
  logic.flipCard(
    card,
    (matches) => {
      matchesDisplay.textContent = matches;
      const totalCards = document.querySelectorAll(".card").length;

      if (matches * 2 === totalCards) {
        timer.stop();
      
        // save the score (number of pairs matched)
        saveScore(matches);
      
        setTimeout(() => {
          showMessage("🎉 You Win!");
          // redirect after short delay
          setTimeout(() => window.location.href = "/html/ranking.html", 2000);
        }, 300);
      }
      
    },
    () => {}
  );
}


function handleTimeUp() {
  // disable all card clicks
  document.querySelectorAll(".card").forEach(card => {
    card.style.pointerEvents = "none";
  });

  const currentScore = parseInt(matchesDisplay.textContent) || 0;
  saveScore(currentScore);

  showMessage("⏰ Time’s up! Try again next time!");
}



function showMessage(text) {
  const messageBox = document.createElement("div");
  messageBox.className = "end-message";
  messageBox.textContent = text;

  document.body.appendChild(messageBox);

  setTimeout(() => {
    messageBox.classList.add("show");
  }, 100); 

  setTimeout(() => {
    window.location.href = "/html/ranking.html";
  }, 2500);
}

//save score in ranking
function saveScore(score) {
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  if (!activeUser) return;

  // get all users
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // find and update user's total score
  const updatedUsers = users.map((user) => {
    if (user.username === activeUser.username) {
      user.score = (user.score || 0) + score;
    }
    return user;
  });

  // save updated users list
  localStorage.setItem("users", JSON.stringify(updatedUsers));

  //update the activeUser’s score in localStorage
  activeUser.score = (activeUser.score || 0) + score;
  localStorage.setItem("activeUser", JSON.stringify(activeUser));
}


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
