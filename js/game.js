class Game {
  constructor() {
    this.cubeArr = [];
    this.frames = 0;
    this.isGameOn = true;
    this.canSpawn = true;
  }

  cubeAppears() {
    if (this.canSpawn) {
      const newCube = new Cube(0);
      this.cubeArr.push(newCube);
      this.canSpawn = false;
    }
  }

  dropCube() {
    if (this.cubeArr.length > 0) {
      const currentCube = this.cubeArr[0];
      if (!currentCube.isFalling) {
        currentCube.isFalling = true;
    }
    }
    
  }

  cubeFloorCollision() {
    for (let i = 0; i < this.cubeArr.length; i++) {
      const cube = this.cubeArr[i];
      if (cube.y + cube.h >= gameBoxNode.offsetHeight) {
        cube.y = gameBoxNode.offsetHeight - cube.h;
        cube.node.style.top = `${cube.y}px`;
        this.node.style.backgroundImage = "linear-gradient(315deg, #6b0f1a 0%, #b91372 74%)";
        this.node.style.boxShadow = "5px 10px 17px -3px"
        this.moveRight() = true
      }
    //   else if(cube.x + cube.w >= gameBoxNode.offsetWidth){
    //     this.gameOver()
    //   }
  }

    if (this.cubeArr.length > 0) {
        const currentCube = this.cubeArr[0];
        if (currentCube.y + currentCube.h >= gameBoxNode.offsetHeight && currentCube.isFalling) {
            currentCube.y = gameBoxNode.offsetHeight - currentCube.h;
            currentCube.node.style.top = `${currentCube.y}px`;
            this.node.style.backgroundImage = "linear-gradient(315deg, #6b0f1a 0%, #b91372 74%)";
            this.node.style.boxShadow = "5px 10px 17px -3px"
            currentCube.isFalling = false;
            this.canSpawn = true;
        }
    }
  }

  gameOver() {
    this.isGameOn = false;
    gameScreenNode.style.display = "none";
    gameOverScreenNode.style.display = "flex";
  }

  gameLoop() {
    this.frames++;
    this.cubeAppears();
    this.cubeArr.forEach((eachCube) => {
      eachCube.moveRight();
      if (eachCube.isFalling) {
        eachCube.moveDown();
      }
    });

    this.cubeFloorCollision();

    if (this.isGameOn === true) {
      requestAnimationFrame(() => this.gameLoop());
    }
  }
}