// Global Variables
const startBtnNode = document.querySelector("#start-btn");
const startScreenNode = document.querySelector("#start-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameBoxNode = document.querySelector("#game-box");
const gameOverScreenNode = document.querySelector("#gameover-screen");
const winScreenNode = document.querySelector("#win-screen");
const restartWinScreenBtnNode = document.querySelector(
  "#win-screen-restart-btn"
);
const restartGameOverBtnNode = document.querySelector("#restart-btn");
const winScreenRestartBtnNode = document.querySelector(
  "#win-screen-restart-btn"
);

const coolColorsArr = [
  "#f94144",
  "#00a8e8",
  "#f8961e",
  "#f9c74f",
  "#007ea7",
  "#003459",
  "#64c2c2",
];

const warmColorsArr = [
  "#e6e6fa",
  "#0000ff",
  "#ffc0cb",
  "#f9c74f",
  "#f94144",
  "#f3722c",
  "#f8961e",
  "#90be6d",
];

const gradientRandomColor =
  "#" + Math.floor(Math.random() * 16777215).toString(16);

// State Management Functions

// Function to get a random color from an array of colors
function getRandomColor(colorsArr) {
  const randomIndex = Math.floor(Math.random() * colorsArr.length);
  return colorsArr[randomIndex];
}

// Function to start the game when the "Start" button is clicked
function startGame() {
  startScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";
  gameObj = new Game();
  gameObj.startBackgroundMusic();
  gameObj.gameLoop();
}

// Function to restart the game when the "Restart" button is clicked
function restartGame() {
  gameOverScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";
  gameObj.resetGame();
  gameObj.stopGameOverMusic();
  gameObj.gameLoop();
}

// Function to handle the "Space" key press
function spaceBar(event) {
  if (event.key === " " && !gameObj.isGameOn) {
    restartGame();
  } else if (event.key === " ") {
    gameObj.dropCube();
  }
}

// Add Event Listeners

// Start the game when the "Start" button is clicked
startBtnNode.addEventListener("click", startGame);

// Restart the game when the "Restart" button is clicked on the game over screen
restartGameOverBtnNode.addEventListener("click", restartGame);

// Listen for the "Space" key press to drop a cube or restart the game
window.addEventListener("keydown", spaceBar);
