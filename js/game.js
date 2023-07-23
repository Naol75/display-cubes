class Game {
  constructor() {
    this.cubeArr = [];
    this.frames = 0;
    this.isGameOn = true;
    this.canSpawn = true;
    this.colorIndex = 0
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
      backgroundImage: `linear-gradient(315deg, ${color} 0%, ${gradientColor} 60%)`,
      boxShadow: "5px 10px 17px -3px ",
    };
  
    return style;
  }


  spawnNewCube() {
    if (this.canSpawn) {
      const style = this.randomCubeColor();
      const newCube = new Cube(0);
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
      }
    }
  }

  cubeFloorCollision() {
    for (let i = 0; i < this.cubeArr.length; i++) {
      const cube = this.cubeArr[i];
      if (cube.hasFallen()) {
        cube.fixPosition();
        this.cubeArr.splice(i, 1);
        i--;
        this.canSpawn = true;
      }

    
      for (let j = 0; j < this.cubeArr.length; j++) {
        if (i !== j) {
          const otherCube = this.cubeArr[j];
          if (
            cube.y + cube.h >= otherCube.y &&
            cube.y <= otherCube.y + otherCube.h &&
            cube.x + cube.w >= otherCube.x &&
            cube.x <= otherCube.x + otherCube.w
          ) {
            cube.fixPosition();
            this.cubeArr.splice(i, 1);
            i--;
            break;
          }
        }
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
    this.spawnNewCube();
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