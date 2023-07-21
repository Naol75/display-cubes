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

window.addEventListener("keydown", spaceBar)


