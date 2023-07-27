class Game {
  constructor() {
    this.cubeArr = [];
    this.fixedCubesArr = [];
    this.frames = 0;
    this.isGameOn = true;
    this.canSpawn = true;
    this.colorIndex = 0;
    this.sizeMultiplier = 1;
    this.speedMultiplier = 1;
    this.score = 0;
    this.highScore = 0;
    this.loadHighScore();
    gameScreenNode.addEventListener("click", (event) => this.dropCube(event));
    this.scoreDisplayNode = document.querySelector("#score-display");
    this.backgroundMusic = new Audio(
      "./Music-sounds/2019-01-02_-_8_Bit_Menu_-_David_Renda_-_FesliyanStudios (mp3cut.net).mp3"
    );
    this.scoreSound = new Audio("./Music-sounds/powerup.mp3");
    this.gameOverSound = new Audio("./Music-sounds/game over.mp3");
  }
  resetGame() {
    this.cubeArr = [];
    this.fixedCubesArr = [];
    this.frames = 0;
    this.isGameOn = true;
    this.canSpawn = true;
    this.colorIndex = 0;
    this.score = 0;
    this.sizeMultiplier = 1;
    this.speedMultiplier = 1;
    gameBoxNode.innerHTML = "";
    this.startBackgroundMusic();
  }
  loadHighScore() {
    const storedHighScore = localStorage.getItem("highScore");
    if (storedHighScore) {
      this.highScore = parseInt(storedHighScore, 10);
    }
  }
  saveHighScore() {
    localStorage.setItem("highScore", this.highScore.toString());
  }
  randomCubeColor() {
    this.colorIndex++;
    const color =
      this.colorIndex % 2 === 0
        ? getRandomColor(coolColorsArr)
        : getRandomColor(warmColorsArr);
    const gradientColor =
      this.colorIndex % 2 === 1
        ? getRandomColor(coolColorsArr)
        : getRandomColor(warmColorsArr);
    const style = {
      background: color,
      backgroundImage: `linear-gradient(150deg, ${color} 0%, white 95%)`,
      boxShadow: "5px 10px 17px -3px",
    };
    return style;
  }
  startBackgroundMusic() {
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.4;
    this.backgroundMusic.play();
  }
  playScoreSound() {
    this.scoreSound.currentTime = 0;
    this.scoreSound.volume = 0.033;
    this.scoreSound.play();
  }
  playGameOverSound() {
    this.gameOverSound.currentTime = 0;
    this.gameOverSound.volume = 0.4;
    this.gameOverSound.play();
  }
  stopGameOverMusic() {
    this.gameOverSound.pause();
    this.gameOverSound.currentTime = 0;
  }
  spawnNewCube() {
    if (this.canSpawn) {
      const style = this.randomCubeColor();
      const cubeWidth = this.sizeMultiplier * 170;
      const maxX = gameBoxNode.offsetWidth - cubeWidth;
      const minX = 0;
      const newX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
      const newCube = new Cube(newX, this.sizeMultiplier, this.speedMultiplier);
      newCube.node.style.background = style.background;
      newCube.node.style.backgroundImage = style.backgroundImage;
      newCube.node.style.boxShadow = style.boxShadow;
      this.cubeArr.push(newCube);
      this.canSpawn = false;
    }
  }
  dropCube() {
    if (this.cubeArr.length > 0) {
      const currentCube = this.cubeArr[this.cubeArr.length - 1];
      if (!currentCube.isFalling) {
        currentCube.isFalling = true;
      } else {
        this.canSpawn = false;
      }
    }
  }
  cubeFloorCollision() {
    for (let i = 0; i < this.cubeArr.length; i++) {
      const cube = this.cubeArr[i];
      if (cube.hasFallen()) {
        cube.fixPosition();
        cube.isFixed = true;
        this.cubeArr.splice(i, 1);
        this.fixedCubesArr.push(cube);
        i--;
        this.canSpawn = true;
        console.log(this.cubeArr);
        const penultimateFixedCubeIndex = this.fixedCubesArr.length - 2;
        if (penultimateFixedCubeIndex >= 0 && this.fixedCubesArr.length >= 0) {
          const penultimateFixedCube =
            this.fixedCubesArr[penultimateFixedCubeIndex];
          if (cube.y + cube.h >= penultimateFixedCube.y) {
            this.gameOver();
            return;
          }
        }
      } else {
        this.canSpawn = false;
      }
    }
  }
  createScoreLetters() {
    const scoreDisplayNode = document.querySelector("#score-display");
    const scoreText = "";
    const score = this.score.toString();
    const scoreHTML = `${scoreText}<span id="blue-s">S</span><span id="red-c">c</span><span id="orange-o">o</span><span id="green-r">r</span><span id="purple-e">e</span>: <span id="score-value">${score}</span>`;
    scoreDisplayNode.innerHTML = scoreHTML;
  }
  updateScoreDisplay() {
    const scoreLetters = document.querySelectorAll("#score-display span");
    scoreLetters[0].style.color = "blue";
    scoreLetters[1].style.color = "red";
    scoreLetters[2].style.color = "orange";
    scoreLetters[3].style.color = "green";
    scoreLetters[4].style.color = "purple";
    const scoreValueNode = document.querySelector("#score-value");
    const highScoreValueNode = document.querySelector("#high-score-value");
    if (highScoreValueNode) {
      highScoreValueNode.textContent = this.highScore;
      highScoreValueNode.style.color = "red";
    }
    if (scoreValueNode) {
      scoreValueNode.textContent = this.score;
      if (this.score > this.highScore) {
        scoreValueNode.style.color = "green";
        this.score.scoreValueNode.style.outline = "none";
      } else if (this.score < this.highScore) {
        scoreValueNode.style.color = "red";
      } else {
        scoreValueNode.style.color = "white";
      }
    }
    if (highScoreValueNode) {
      highScoreValueNode.textContent = this.highScore;
    }
  }
  cubeToCubeCollision() {
    if (this.fixedCubesArr.length > 0) {
      for (let i = 0; i < this.cubeArr.length; i++) {
        const currentCube = this.cubeArr[i];
        if (!currentCube.isFixed) {
          let nearestFixedCube = null;
          for (const fixedCube of this.fixedCubesArr) {
            if (
              currentCube.y + currentCube.h >= fixedCube.y &&
              currentCube.y <= fixedCube.y + fixedCube.h &&
              currentCube.x + currentCube.w >= fixedCube.x &&
              currentCube.x <= fixedCube.x + fixedCube.w
            ) {
              if (
                !nearestFixedCube ||
                fixedCube.y + fixedCube.h >
                  nearestFixedCube.y + nearestFixedCube.h
              ) {
                nearestFixedCube = fixedCube;
              }
            }
          }
          if (nearestFixedCube) {
            currentCube.isFixed = true;
            currentCube.y = nearestFixedCube.y - currentCube.h;
            this.fixedCubesArr.push(currentCube);
            this.cubeArr.splice(i, 1);
            this.canSpawn = true;
            this.score += 10;
            this.updateScoreDisplay();
            this.playScoreSound();
            break;
          }
        }
      }
    }
  }
  checkFixedCubeCount() {
    if (this.fixedCubesArr.length > 0) {
      const lastFixedCube = this.fixedCubesArr[this.fixedCubesArr.length - 1];
      const targetHeight = 100;
      let penultimateFixedCube = null;
      if (this.fixedCubesArr.length >= 2) {
        penultimateFixedCube =
          this.fixedCubesArr[this.fixedCubesArr.length - 2];
      }
      if (lastFixedCube.y <= targetHeight) {
        this.sizeMultiplier -= 0.1;
        this.speedMultiplier += 0.1;
        lastFixedCube.isFalling = true;
        lastFixedCube.isFixed = false;
        for (const fixedCube of this.fixedCubesArr) {
          fixedCube.node.remove();
        }
        this.fixedCubesArr = [];
        this.canSpawn = false;
        lastFixedCube.isFalling = true;
        let fallInterval = setInterval(() => {
          lastFixedCube.y += lastFixedCube.gravitySpeed;
          lastFixedCube.gravitySpeed += 0.1;
          lastFixedCube.node.style.top = `${lastFixedCube.y}px`;
          if (lastFixedCube.y + lastFixedCube.h >= targetHeight) {
            clearInterval(fallInterval);
            lastFixedCube.isFalling = false;
            lastFixedCube.isFixed = false;
            this.cubeArr = [];
            this.canSpawn = true;
            this.fixedCubesArr = [];
          }
        }, 5);
      }
    }
  }
  gameOver() {
    this.isGameOn = false;
    gameScreenNode.style.display = "none";
    gameOverScreenNode.style.display = "flex";
    this.backgroundMusic.pause();
    this.backgroundMusic.currentTime = 0;
    this.playGameOverSound();
    const finalScoreNode = document.querySelector("#final-score");
    if (finalScoreNode) {
      finalScoreNode.textContent = this.score;
      if (this.score > this.highScore) {
        finalScoreNode.style.color = "green";
      } else {
        finalScoreNode.style.color = "red";
      }
    }
    const highScoreValueNode = document.querySelector("#high-score-value");
    if (highScoreValueNode) {
      highScoreValueNode.textContent = this.highScore;
      if (this.highScore > this.score) {
        highScoreValueNode.style.color = "green";
      } else {
        highScoreValueNode.style.color = "red";
      }
    }
    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.saveHighScore();
    }
  }
  gameLoop() {
    this.frames++;
    this.spawnNewCube();
    this.cubeArr.forEach((eachCube) => {
      eachCube.moveRight();
      if (eachCube.isFalling) {
        eachCube.moveDown();
      }
    });
    this.cubeFloorCollision();
    this.cubeToCubeCollision();
    this.checkFixedCubeCount();
    this.createScoreLetters();
    this.updateScoreDisplay();
    if (this.isGameOn === true) {
      requestAnimationFrame(() => this.gameLoop());
    }
  }
}