//Ensure JavaScript code runs only after the HTML document has been completely loaded and parsed.
document.addEventListener("DOMContentLoaded", function () {
  // Declare constant to control the visibility of each one of them.
  const startingPage = document.getElementById("game-start");
  const characterSelection = document.getElementById("choose-your-beast");
  const playGame = document.getElementById("level1");
  const gameOver = document.getElementById("game-over");
  const congratulations = document.getElementById("congratulations");

  // Hide obstacles from the start section. Show them in the game section.
  const obstaclesOnStartPage = document.querySelectorAll(".obstacle-image");

  function hideObstacles() {
    obstaclesOnStartPage.forEach((obstacle) => {
      obstacle.classList.add("hidden");
    });
  }

  function showObstacles() {
    obstaclesOnStartPage.forEach((obstacle) => {
      obstacle.classList.remove("hidden");
    });
  }

  //Selection of beast by clicking
  class BeastSelector {
    constructor() {
      this.beast1 = document.getElementById("beast1");
      this.beast2 = document.getElementById("beast2");
      this.beast3 = document.getElementById("beast3");
      this.beast4 = document.getElementById("beast4");

      this.setupEventListeners();
    }

    setupEventListeners() {
      this.beast1.addEventListener("click", () => this.selectBeast("beast1"));
      this.beast2.addEventListener("click", () => this.selectBeast("beast2"));
      this.beast3.addEventListener("click", () => this.selectBeast("beast3"));
      this.beast4.addEventListener("click", () => this.selectBeast("beast4"));
    }

    selectBeast(beast) {
      // Set the selected beast in a variable
      selectedBeast = beast;

      characterSelection.style.display = "none";
      playGame.style.display = "block";
      // Update the chosen beast image
      updateChosenBeastImage();
    }
  }

  let selectedBeast = ""; // Variable to store the selected beast
  const playerImage = document.getElementById("player");

  // Function to update the chosen beast image
  function updateChosenBeastImage() {
    if (selectedBeast === "beast1") {
      playerImage.src = "../images/player1-image.png";
    } else if (selectedBeast === "beast2") {
      playerImage.src = "../images/player2-image.png";
    } else if (selectedBeast === "beast3") {
      playerImage.src = "../images/player3-image.png";
    } else if (selectedBeast === "beast4") {
      playerImage.src = "../images/player4-image.png";
    }
  }

  // Creating a new instance of class for the beast selection
  const beastSelector = new BeastSelector();

  function showStartGameSection() {
    const startingPage = document.getElementById("game-start");
    const characterSelection = document.getElementById("choose-your-beast");
    const playGame = document.getElementById("level1");
    const gameOver = document.getElementById("game-over");
    const congratulations = document.getElementById("congratulations");

    startingPage.style.display = "block";
    characterSelection.style.display = "none";
    playGame.style.display = "none";
    gameOver.style.display = "none";
    congratulations.style.display = "none";

    hideObstacles();
  }
  // Call the function to show the "Start Game" section
  showStartGameSection();

  // Click Start Button
  const startGameButton = document.getElementById("startGameButton");
  startGameButton.addEventListener("click", () => {
    startingPage.style.display = "none";
    characterSelection.style.display = "block";
    playGame.style.display = "none";
    gameOver.style.display = "none";
    congratulations.style.display = "none";

    // Show obstacles when transitioning to the game page
    showObstacles();
  });

  // Initially hide all obstacles on page load
  hideObstacles();

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
  const startCountdownElement = document.getElementById("startTimer");

  let timeLimit = 5;
  let countdown = timeLimit;
  let timerInterval;
  let gameStarted = false;
  //let readinessCountdown = 1;
  //let startCountdown = 1;

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
      currentIndex++; // Move to the next obstacles

      if (currentIndex < obstacles.length) {
        // Show the next obstacle
        obstacles[currentIndex].style.display = "block";
      } else {
        // All obstacles cleared, game completed
        setTimeout(() => {
          alert("Congratulations! You cleared all obstacles!");
          showCongratulations();
          showConfetti();
        }, 1000);
      }
    }
  }

  function showCongratulations() {
    const congratulations = document.getElementById("congratulations");
    const congratulationsRestartButton = document.getElementById(
      "congratulationsRestartButton"
    );

    // Hide game elements (level1) and other elements you want to hide
    const gamePage = document.getElementById("level1");
    const countdownElement = document.getElementById("countdown");
    const startButton = document.getElementById("startButton");

    gamePage.style.display = "none";
    countdownElement.style.display = "none";
    startButton.style.display = "none";

    // Hide the game-over section
    const gameOver = document.getElementById("game-over");
    gameOver.style.display = "none";

    congratulations.style.display = "block";
    congratulationsRestartButton.classList.remove("hidden");

    const chosenBeastImage = document.getElementById("chosen-beast-image");

    if (selectedBeast === "beast1") {
      chosenBeastImage.src = "../images/player1-image.png";
    } else if (selectedBeast === "beast2") {
      chosenBeastImage.src = "../images/beast2.png";
    } else if (selectedBeast === "beast3") {
      chosenBeastImage.src = "../images/beast3.png";
    } else if (selectedBeast === "beast4") {
      chosenBeastImage.src = "../images/beast4.png";
    }
  }
  // this code is referenced from https://www.littlemanproject.com/posts/javascript-confetti/
  function showConfetti() {
    let duration = 15 * 1000;
    let animationEnd = Date.now() + duration;
    let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    let interval = setInterval(function () {
      let timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      let particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);
  }

  obstacles[currentIndex].style.display = "block";
  setInterval(checkCollision, 10);

  let gameEnded = false;

  function updateCountdown() {
    if (gameStarted && !gameEnded) {
      if (countdown > 0) {
        countdown--;
        countdownElement.textContent = countdown;
      } else {
        gameEnded = true;

        if (congratulations.style.display !== "block") {
          alert("Time's up! Game over.");
          displayGameOver();
        }

        clearInterval(timerInterval);
      }
    }
  }

  let displayGameOverMessage = true;

  function displayGameOver() {
    const gameOver = document.getElementById("game-over");
    const gameOverMessage = document.getElementById("game-over-message");
    const gameOverRestartButton = document.getElementById(
      "gameOverRestartButton"
    );

    if (displayGameOverMessage) {
      gameOver.style.display = "block";
      gameOverMessage.classList.remove("hidden");
      gameOverRestartButton.classList.remove("hidden");

      const gamePage = document.getElementById("level1");
      gamePage.style.display = "none";
    }
  }

  const gameOverRestartButton = document.getElementById(
    "gameOverRestartButton"
  );
  const congratulationsRestartButton = document.getElementById(
    "congratulationsRestartButton"
  );

  gameOverRestartButton.addEventListener("click", () => {
    const startingPage = document.getElementById("game-start");
    const characterSelection = document.getElementById("choose-your-beast");
    const playGame = document.getElementById("level1");
    const congratulations = document.getElementById("congratulations");

    startingPage.style.display = "block";

    characterSelection.style.display = "none";
    playGame.style.display = "none";
    congratulations.style.display = "none";

    //resetGame();
  });

  congratulationsRestartButton.addEventListener("click", () => {
    const startingPage = document.getElementById("game-start");
    const characterSelection = document.getElementById("choose-your-beast");
    const playGame = document.getElementById("level1");
    const congratulations = document.getElementById("congratulations");

    startingPage.style.display = "block";
    characterSelection.style.display = "none";
    playGame.style.display = "none";
    congratulations.style.display = "none";

    resetGame();
    //window.location.href = window.location.href.split("?")[0];
  });

  function resetGame() {
    countdown = timeLimit;
    countdownElement.textContent = countdown;
    showObstacles();
  }
});
