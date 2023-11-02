const urlParams = new URLSearchParams(window.location.search);
const selectedBeast = urlParams.get("beast");
console.log("Selected beast:", selectedBeast);

const playerImage = document.getElementById("player");

if (selectedBeast === "beast1") {
  playerImage.src = "../images/player1-image.png";
} else if (selectedBeast === "beast2") {
  playerImage.src = "../images/player2-image.png";
} else if (selectedBeast === "beast3") {
  playerImage.src = "../images/player3-image.png";
} else if (selectedBeast === "beast4") {
  playerImage.src = "../images/player4-image.png";
}


const backgroundImage = document.querySelector(".background-image-level1");
const startButton = document.getElementById("startButton");
playerImage.style.left = "160px";
playerImage.style.top = "420px";
const obstacles = [
  document.getElementById("obstacle1"),
  document.getElementById("obstacle2"),
  document.getElementById("obstacle3"),
  document.getElementById("obstacle4"),
  document.getElementById("obstacle5"),
  document.getElementById("obstacle6"),
  document.getElementById("obstacle7"),
  document.getElementById("obstacle8"),
  document.getElementById("obstacle9"),
];

backgroundImage.addEventListener("mousemove", (e) => {
  if (gameStarted) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    playerImage.style.left = mouseX - 500 + "px";
    playerImage.style.top = mouseY + "px";
  }
});

const countdownElement = document.getElementById("countdown");
const startCountdownElement = document.getElementById("startTimer")

let timeLimit = 5;
let countdown = timeLimit;
let timerInterval;
let gameStarted = false;
let readinessCountdown = 1;
let startCountdown = 1;

function updatePlayerPosition(e) {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  playerImage.style.left = mouseX + "px";
  playerImage.style.top = mouseY + "px";
}

startButton.addEventListener("click", () => {
  setTimeout(() => {
    gameStarted = true;
    startButton.disabled = true;
    startButton.textContent = "Start";
    timerInterval = setInterval(updateCountdown, 1000);
  }, 5000);
});

startButton.addEventListener("click", () => {
  startButton.disabled = true;
  startButton.textContent = "Starting...";

  let startCount = 3;
  startCountdownElement.textContent = startCount;
  startCountdownElement.style.display = "block";

  const startCountdownInterval = setInterval(() => {
    if (startCount > 1) {
      startCount--;
      startCountdownElement.textContent = startCount;
    } else if (startCount === 1) {
      startCount--;
      startCountdownElement.textContent = "Go!";
    } else {
      startCountdownElement.style.display = "none";
      clearInterval(startCountdownInterval);
    }
  }, 1000);
});

let currentIndex = 0;

function checkCollision() {
  const playerRect = playerImage.getBoundingClientRect();
  const obstacleRect = obstacles[currentIndex].getBoundingClientRect();

  if (
    playerRect.left < obstacleRect.right &&
    playerRect.right > obstacleRect.left &&
    playerRect.top < obstacleRect.bottom &&
    playerRect.bottom > obstacleRect.top
  ) {
    // Collision
    obstacles[currentIndex].style.display = "none"; // Hide the current obstacle
    currentIndex++; // Move to the next obstacle

    if (currentIndex < obstacles.length) {
      // Show the next obstacle
      obstacles[currentIndex].style.display = "block";
    } else {
      // All obstacles cleared, game completed
      setTimeout(() => {
        alert("Congratulations! You cleared all obstacles!");
        window.location.href = "congratulations.html";
      }, 1000);
    }
  }
}

obstacles[currentIndex].style.display = "block";
setInterval(checkCollision, 10);

function updateCountdown() {
  if (gameStarted) {
    if (countdown > 0) {
      countdown--;
      countdownElement.textContent = countdown;
    } else {
      setTimeout(() => {
        alert("Time's up! Game over.");
        window.location.href = "game-over.html";
      }, 2000);
      clearInterval(timerInterval);
    }
  }
}
