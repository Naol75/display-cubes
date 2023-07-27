// * GLOBAL VARIABLES
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

// * STATE MANAGEMENT FUNCTIONS

function getRandomColor(colorsArr) {
  const randomIndex = Math.floor(Math.random() * colorsArr.length);
  return colorsArr[randomIndex];
}

function startGame() {
  startScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";
  gameObj = new Game();
  gameObj.startBackgroundMusic();
  gameObj.lastFrameTime = performance.now();
  gameObj.gameLoop(gameObj.lastFrameTime);
}

function restartGame() {
  gameOverScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";
  gameObj.resetGame();
  gameObj.stopGameOverMusic();
  gameObj.lastFrameTime = performance.now();
  gameObj.gameLoop();
}

function spaceBar(event) {
  if (event.key === " ") {
    gameObj.dropCube();
  }
}

// * ADD EVENT LISTENERS

startBtnNode.addEventListener("click", startGame);

restartGameOverBtnNode.addEventListener("click", restartGame);

window.addEventListener("keydown", spaceBar);