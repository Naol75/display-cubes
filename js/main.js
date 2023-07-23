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
const winScreenRestartBtnNode = document.querySelector("#win-screen-restart-btn");


const coolColorsArr = ["#00a8e8", "#ae79c9","#aeecef", "#00a8e8", "#007ea7", "#003459", "#64c2c2"];

// Definir los colores cálidos
const warmColorsArr = ["#6b0f1a", "#d4af37", "#f9c74f", "#f94144", "#f94144", "#f3722c", "#f8961e", "#90be6d"];


const gradientRandomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);




// Variable para alternar entre colores fríos y cálidos





// * STATE MANAGEMENT FUNCTIONS


function startGame() {
  startScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";
  gameObj = new Game();
  gameObj.gameLoop();
}




function spaceBar(event) {
  if (event.key === " ") {
    gameObj.dropCube();
  }
}




// * ADD EVENT LISTENERS



startBtnNode.addEventListener("click", startGame);

restartGameOverBtnNode.addEventListener("click", startGame)

winScreenRestartBtnNode.addEventListener("click", startGame)

window.addEventListener("keydown", spaceBar);


