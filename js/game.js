class Game {
  constructor() {
    // Initialize game properties
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

    // Initialize properties for tracking time
    this.lastTime = new Date(); // current date
    this.realSecondsPassed = 0;

    // Load high score from local storage
    this.loadHighScore();

    // Add event listener to handle clicks on the game screen
    gameScreenNode.addEventListener("click", (event) => this.dropCube());

    // Get reference to the score display node
    this.scoreDisplayNode = document.querySelector("#score-display");

    // Initialize audio objects for background music and sounds
    this.backgroundMusic = new Audio(
      "./Music-sounds/2019-01-02_-_8_Bit_Menu_-_David_Renda_-_FesliyanStudios (mp3cut.net).mp3"
    );
    this.scoreSound = new Audio("./Music-sounds/powerup.mp3");
    this.gameOverSound = new Audio("./Music-sounds/game over.mp3");
  }

  // Reset the game state to start a new game
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

  // Load the high score from local storage
  loadHighScore() {
    const storedHighScore = localStorage.getItem("highScore");
    if (storedHighScore) {
      this.highScore = parseInt(storedHighScore, 10);
    }
  }

  // Save the high score to local storage
  saveHighScore() {
    localStorage.setItem("highScore", this.highScore.toString());
  }

  // Generate a random cube color and return a style object
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

  // Start playing the background music
  startBackgroundMusic() {
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.4;
    this.backgroundMusic.play();
  }

  // Play the score sound when a cube is successfully stacked
  playScoreSound() {
    this.scoreSound.currentTime = 0;
    this.scoreSound.volume = 0.033;
    this.scoreSound.play();
  }

  // Play the game over sound
  playGameOverSound() {
    this.gameOverSound.currentTime = 0;
    this.gameOverSound.volume = 0.4;
    this.gameOverSound.play();
  }

  // Stop the game over music and reset its time
  stopGameOverMusic() {
    this.gameOverSound.pause();
    this.gameOverSound.currentTime = 0;
  }

  // Spawn a new cube with a random color
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

  // Handle the click event on the game screen to drop a cube
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

  // Check if a falling cube has collided with the floor
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

        // Check if the last fixed cube has collided with the penultimate fixed cube
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

  // Create the HTML for displaying the score
  createScoreLetters() {
    const scoreDisplayNode = document.querySelector("#score-display");
    const scoreText = "";
    const score = this.score.toString();
    const scoreHTML = `${scoreText}<span id="blue-s">S</span><span id="red-c">c</span><span id="orange-o">o</span><span id="green-r">r</span><span id="purple-e">e</span>: <span id="score-value">${score}</span>`;
    scoreDisplayNode.innerHTML = scoreHTML;
  }

  // Update the score display based on the current score and high score
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
        scoreValueNode.textContent = this.score + "🏆";
        scoreValueNode.style.color = "green";
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

  // Check for collisions between cubes
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
            // Stack the falling cube on top of the nearest fixed cube
            currentCube.isFixed = true;
            currentCube.y = nearestFixedCube.y - currentCube.h;
            this.fixedCubesArr.push(currentCube);
            this.cubeArr.splice(i, 1);
            this.canSpawn = true;

            // Increase the score and update the score display
            this.score += 10;
            this.updateScoreDisplay();
            this.playScoreSound();
            break;
          }
        }
      }
    }
  }

  // Check if the number of fixed cubes has reached the target height
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
        // Transition to the next level by adjusting sizeMultiplier and speedMultiplier
        this.sizeMultiplier -= 0.1;
        this.speedMultiplier += 0.1;
        lastFixedCube.isFalling = true;
        lastFixedCube.isFixed = false;

        // Remove all fixed cubes and reset the game state
        for (const fixedCube of this.fixedCubesArr) {
          fixedCube.node.remove();
        }
        this.fixedCubesArr = [];
        this.canSpawn = false;
        lastFixedCube.isFalling = true;
        let fallInterval = setInterval(() => {
          // Perform the falling animation for the last fixed cube
          lastFixedCube.y += lastFixedCube.gravitySpeed;
          lastFixedCube.gravitySpeed += 0.1;
          lastFixedCube.node.style.top = `${lastFixedCube.y}px`;
          if (lastFixedCube.y + lastFixedCube.h >= targetHeight) {
            // Stop the falling animation and reset the game state
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

  // End the game and display the game over screen
  gameOver() {
    this.isGameOn = false;
    gameScreenNode.style.display = "none";
    gameOverScreenNode.style.display = "flex";
    this.backgroundMusic.pause();
    this.backgroundMusic.currentTime = 0;
    this.playGameOverSound();

    // Update the final score and high score display on the game over screen
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

  // The main game loop that runs continuously while the game is active
  gameLoop() {
    this.frames++;

    // Spawn a new cube at regular intervals
    this.spawnNewCube();

    // Move the cubes and perform collision checks
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

    // Continue the game loop as long as the game is active
    if (this.isGameOn === true) {
      requestAnimationFrame(() => this.gameLoop());
    }
  }
}
