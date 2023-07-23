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


const coolColorsArr = ["#00a8e8", "#007ea7", "#003459"];
const warmColorsArr = ["#f94144", "#f3722c", "#f8961e"];
const gradientRandomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
let colorIndex = 0;


function randomCubeColor() {

  const color = colorIndex % 2 === 0 ? coolColorsArr[colorIndex / 2] : warmColorsArr[Math.floor(colorIndex / 2)];
  colorIndex++;

  const randomGradient = {
    background: color,
    backgroundImage: "linear-gradient(315deg, ${color} 0%, ${gradientRandomColor} 74%)",
    boxShadow: "5px 10px 17px -3px",
  };

  return randomGradient;
}

// * STATE MANAGEMENT FUNCTIONS


function startGame() {
  startScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";
  gameObj = new Game();
  gameObj.gameLoop();
}


function randomColor() {
  // Generar colores aleatorios en formato hexadecimal (#RRGGBB)
  const color1 = "#" + Math.floor(Math.random() * 16777215).toString(16);
  const color2 = "#" + Math.floor(Math.random() * 16777215).toString(16);
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


