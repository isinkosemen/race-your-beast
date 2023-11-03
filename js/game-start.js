const startingPage = document.getElementById("game-start");
const characterSelection = document.getElementById("choose-your-beast");
const playGame = document.getElementById("level1");
const gameOver = document.getElementById("game-over");
const congratulations = document.getElementById("congratulations");

startGameButton.addEventListener("click", () => {
    startingPage.style.display = "none";
  window.location.href = "choose-your-beast.html";
});
