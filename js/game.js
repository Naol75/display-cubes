class Game {
  constructor() {
    this.cubeArr = [];
    this.fixedCubesArr = []
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
      backgroundImage: `linear-gradient(150deg, ${color} 0%, white 95%)`,
      boxShadow: "5px 10px 17px -3px",
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
        cube.isFixed = true

        this.cubeArr.splice(i, 1);
        this.fixedCubesArr.push(cube)
        i--;
        this.canSpawn = true;
        console.log(this.cubeArr)


    
    }
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
            if (!nearestFixedCube || fixedCube.y + fixedCube.h > nearestFixedCube.y + nearestFixedCube.h) {
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
          console.log(this.cubeArr);
          break;
        }
      }
    }
  }
}
  


checkFixedCubeCount() {
  if (this.fixedCubesArr.length >= 6) {
    // Obtenemos el último cubo fijado que caerá al suelo
    const lastFixedCube = this.fixedCubesArr.pop();

    // Removemos todos los otros cubos fijados del DOM y del arreglo
    for (const fixedCube of this.fixedCubesArr) {
      fixedCube.node.remove();
    }
    this.fixedCubesArr = [];

    // Hacemos que el último cubo caiga al suelo
    lastFixedCube.isFalling = true;

    // Reiniciamos la posición en Y del último cubo para simular su caída
    let fallInterval = setInterval(() => {
      lastFixedCube.y += lastFixedCube.gravitySpeed;
      lastFixedCube.gravitySpeed += 1;
      lastFixedCube.node.style.top = `${lastFixedCube.y}px`;

      if (lastFixedCube.y + lastFixedCube.h >= gameBoxNode.offsetHeight) {
        // El cubo ha llegado al suelo
        clearInterval(fallInterval);
        lastFixedCube.isFalling = false;
        lastFixedCube.isFixed = false;
        this.canSpawn = true;
        this.cubeArr.push(lastFixedCube);
      }
    }, 16); // Aproximadamente 60fps
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
    this.cubeToCubeCollision();
    this.checkFixedCubeCount();
    if (this.isGameOn === true) {
      requestAnimationFrame(() => this.gameLoop());
    }
    console.log(this.fixedCubesArr)
  }
}