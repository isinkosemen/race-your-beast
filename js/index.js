class Game {
  constructor() {
    this.startingPage = document.getElementById("game-start");
    this.characterSelection = document.getElementById("choose-your-beast");
    this.playGame = document.getElementById("level1");
    this.gameOver = document.getElementById("game-over");
    this.congratulations = document.getElementById("congratulations");
    this.gameOverMessage = document.getElementById("game-over-message");

    this.obstaclesOnStartPage = document.querySelectorAll(".obstacle-image");
    this.beastSelector = new BeastSelector();
    this.selectedBeast = "";
    this.playerImage = document.getElementById("player");
    this.backgroundImage = document.querySelector(".background-image-level1");
    this.startGameButton = document.getElementById("startGameButton");
    this.startButton = document.getElementById("startButton");

    this.startButton.addEventListener("click", () => {
      this.handleStartButton();
    });

    this.obstacles = [
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

    this.countdownElement = document.getElementById("countdown");
    this.startCountdownElement = document.getElementById("startTimer");
    this.timeLimit = 5;
    this.countdown = this.timeLimit;
    this.initialCountdown = this.timeLimit;
    this.timerInterval = null;
    this.gameStarted = false;
    this.currentIndex = 0;

    this.startGameButton.addEventListener("click", () => {
      this.handleGameStartButton();
    });

    this.startButton.addEventListener("click", () => {
      this.handleStartButton();
    });

    this.obstacles[this.currentIndex].style.display = "block";
    setInterval(() => this.checkCollision(), 10);

    this.gameEnded = false;
    this.displayGameOverMessage = true;

    this.gameOverRestartButton = document.getElementById(
      "gameOverRestartButton"
    );
    this.congratulationsRestartButton = document.getElementById(
      "congratulationsRestartButton"
    );

    this.gameOverRestartButton.addEventListener("click", () => {
      this.handleGameOverRestartButton();
      location.reload();
    });

    this.congratulationsRestartButton.addEventListener("click", () => {
      this.handleCongratulationsRestartButton();
      location.reload();
    });

    this.setupInitialPage();

    
  }

  setupInitialPage() {
    this.startingPage.style.display = "block";
    this.characterSelection.style.display = "none";
    this.playGame.style.display = "none";
    this.gameOver.style.display = "none";
    this.congratulations.style.display = "none";

    this.hideObstacles();
  }

  hideObstacles() {
    this.obstaclesOnStartPage.forEach((obstacle) => {
      obstacle.classList.add("hidden");
    });
  }

  showObstacles() {
    this.obstaclesOnStartPage.forEach((obstacle) => {
      obstacle.classList.remove("hidden");
    });
  }

  handleGameStartButton() {
    this.startingPage.style.display = "none";
    this.characterSelection.style.display = "block";
    this.playGame.style.display = "none";
    this.gameOver.style.display = "none";
    this.congratulations.style.display = "none";

    this.resetGame();

    // Show obstacles when transitioning to the game page
    this.showObstacles();
    this.playerImage.style.left = "160px";
    this.playerImage.style.top = "420px";

    this.backgroundImage.addEventListener("mousemove", (e) => {
      if (this.gameStarted && !this.gameEnded) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        this.playerImage.style.left = mouseX - 500 + "px";
        this.playerImage.style.top = mouseY + "px";
      }
    });
  }

  showAllObstacles() {
    this.obstacles.forEach((obstacle) => {
      obstacle.style.display = "block";
    });
  }

  updatePlayerImage(imageSrc) {
    this.playerImage.src = imageSrc;
  }

handleStartButton() {
  this.startButton.addEventListener("click", () => {
    this.startButton.disabled = true;
    this.startButton.textContent = "Starting...";

    let startCount = 3;
    this.startCountdownElement.textContent = startCount;
    this.startCountdownElement.style.display = "block";

    const startCountdownInterval = setInterval(() => {
      if (startCount > 1) {
        startCount--;
        this.startCountdownElement.textContent = startCount;
      } else if (startCount === 1) {
        startCount--;
        this.startCountdownElement.textContent = "Go!";
      } else {
        this.startCountdownElement.style.display = "none";
        clearInterval(startCountdownInterval);
        this.startButton.textContent = "Start";

        // Set gameStarted to true when the game starts
        this.gameStarted = true;
        console.log(this.gameStarted); 

        let gameTimeout = 5;
        this.countdownElement.textContent = gameTimeout;

        const gameTimeoutInterval = setInterval(() => {
          gameTimeout--;
          this.countdownElement.textContent = gameTimeout;

          if (gameTimeout === 0) {
            clearInterval(gameTimeoutInterval);
            this.handleGameTimeout();
          }
        }, 1000);

        this.showAllObstacles();

        // Add event listener for mousemove to move the player image
        this.handleMouseMove();

        // Add event listeners for obstacle collisions
        this.setupObstacleCollisions();
      }
    }, 1000);
  });
}

  // Add this method to handle the mousemove event
  handleMouseMove() {
    window.addEventListener("mousemove", (e) => {
      if (this.gameStarted && !this.gameEnded) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        this.playerImage.style.left = mouseX - 500 + "px";
        this.playerImage.style.top = mouseY + "px";
      }
    });
  }

  handleGameTimeout() {
    if (!this.gameEnded) {
      this.displayGameOver();
    }
  }

  setupObstacleCollisions() {
    this.obstacles.forEach((obstacle, index) => {
      obstacle.addEventListener("mouseover", () => {
        this.handleObstacleCollision(index);
      });
    });
  }

  updateCountdown() {
    if (this.gameStarted && !this.gameEnded) {
      if (this.countdown > 0) {
        this.countdown--;
        this.countdownElement.textContent = this.countdown;
      } else {
        this.gameEnded = true;

        if (this.congratulations.style.display !== "block") {
          alert("Time's up! Game over.");
          this.displayGameOver();
        }

        clearInterval(this.timerInterval);
      }
    }
  }

  displayGameOver() {
    if (!this.gameEnded) {
      this.gameEnded = true;

      if (this.congratulations.style.display !== "block") {
        this.gameOver.style.display = "block";
        this.gameOverMessage.classList.remove("hidden");
        this.gameOverRestartButton.classList.remove("hidden");

        const gamePage = document.getElementById("level1");
        gamePage.style.display = "none";
      }
    }
  }

  checkCollision() {
    if (this.gameStarted) {
      const playerRect = this.playerImage.getBoundingClientRect();
      const obstacleRect =
        this.obstacles[this.currentIndex].getBoundingClientRect();

      if (
        playerRect.left < obstacleRect.right &&
        playerRect.right > obstacleRect.left &&
        playerRect.top < obstacleRect.bottom &&
        playerRect.bottom > obstacleRect.top
      ) {
        this.obstacles[this.currentIndex].style.display = "none";
        this.currentIndex++;

        if (this.currentIndex < this.obstacles.length) {
          this.obstacles[this.currentIndex].style.display = "block";
        } else {
          setTimeout(() => {
            alert("Congratulations! You cleared all obstacles!");
            this.showCongratulations();
            this.showConfetti();
          }, 1000);
        }
      }
    }
    // Check for collisions continuously
    requestAnimationFrame(() => this.checkCollision());
  }

  showCongratulations() {
    this.playGame.style.display = "none";
    this.countdownElement.style.display = "none";
    this.startButton.style.display = "none";

    this.gameOver.style.display = "none";
    this.congratulations.style.display = "block";
    this.congratulationsRestartButton.classList.remove("hidden");

    const chosenBeastImage = document.getElementById("chosen-beast-image");

    if (this.selectedBeast === "beast1") {
      chosenBeastImage.src = "../images/player1-image.png";
    } else if (this.selectedBeast === "beast2") {
      chosenBeastImage.src = "../images/beast2.png";
    } else if (this.selectedBeast === "beast3") {
      chosenBeastImage.src = "../images/beast3.png";
    } else if (this.selectedBeast === "beast4") {
      chosenBeastImage.src = "../images/beast4.png";
    }
  }

  showConfetti() {
    let duration = 15 * 1000;
    let animationEnd = Date.now() + duration;
    let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    let interval = setInterval(() => {
      let timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      let particleCount = 50 * (timeLeft / duration);
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

  handleGameOverRestartButton() {
    this.setupInitialPage();
    this.resetGame();
  }

  handleCongratulationsRestartButton() {
    this.setupInitialPage();
    this.resetGame();
  }

  resetGame() {
    this.countdown = this.initialCountdown; 
    this.countdownElement.textContent = this.countdown; 
    this.currentIndex = 0;
    this.gameEnded = false; 
    this.showAllObstacles();
    this.timeLimit = 5; 

   
    this.handleStartButton();
  }
}

class BeastSelector {
  constructor(game) {
    this.game = game;
    this.beast1 = document.getElementById("beast1");
    this.beast2 = document.getElementById("beast2");
    this.beast3 = document.getElementById("beast3");
    this.beast4 = document.getElementById("beast4");

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.beast1.addEventListener("click", () => this.selectBeast("beast1", "../images/player1-image.png"));
    this.beast2.addEventListener("click", () => this.selectBeast("beast2", "../images/beast2.png"));
    this.beast3.addEventListener("click", () => this.selectBeast("beast3", "../images/beast3.png"));
    this.beast4.addEventListener("click", () => this.selectBeast("beast4", "../images/beast4.png"));
  }

  selectBeast(beast, imageSrc) {
    this.game.selectedBeast = beast; 
    this.game.characterSelection.style.display = "none";
    this.game.playGame.style.display = "block";
    this.game.showObstacles();

    this.game.updatePlayerImage(imageSrc);
  }
}

window.addEventListener("DOMContentLoaded", () => {

  const game = new Game();
  const beastSelector = new BeastSelector(game);
});