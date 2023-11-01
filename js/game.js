const playerImage = document.getElementById("player");
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

let timeLimit = 100;
let countdown = timeLimit;
let timerInterval;
let gameStarted = false;


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
    timerInterval = setInterval(updateCountdown, 1000);
  }, 5000);
});

let currentIndex=0;

function checkCollision() {
    const playerRect = playerImage.getBoundingClientRect();
    const obstacleRect = obstacles[currentIndex].getBoundingClientRect();
  
    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      // Collision detected with the current obstacle
      obstacles[currentIndex].style.display = "none"; // Hide the current obstacle
      currentIndex++; // Move to the next obstacle
  
      if (currentIndex < obstacles.length) {
        // Show the next obstacle
        obstacles[currentIndex].style.display = "block";
      } else {
        // All obstacles cleared, game completed
        alert("Congratulations! You cleared all obstacles!");
        window.location.href = "congratulations.html";
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
      alert("Time's up! Game over.");
      window.location.href = "game-over.html";
      clearInterval(timerInterval);
    }
  }
}
