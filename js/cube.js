class Cube {
  constructor(posX, randomCubeColor) {
    this.node = document.createElement("div");
    gameBoxNode.appendChild(this.node);

    this.x = posX;
    this.y = 0;
    this.w = 170;
    this.h = 120;
    this.gravitySpeed = 1;
    this.isFalling = false;

    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;
    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
    this.direction = 1;
  }

  moveRight = () => {
    if (!this.isFalling) {
      this.x += 5 * this.direction;
      this.node.style.left = `${this.x}px`;

      if (this.x + this.w >= gameBoxNode.offsetWidth) {
        this.x = gameBoxNode.offsetWidth - this.w;
        this.direction = -1;
      }

      if (this.x <= 0) {
        this.x = 0;
        this.direction = 1;
      }
    }
  };

  moveDown = () => {
    if (this.isFalling) {
      this.y += this.gravitySpeed;
      this.gravitySpeed += 0.1;

      this.node.style.top = `${this.y}px`;

      if (this.y + this.h >= gameBoxNode.offsetHeight) {
        this.y = gameBoxNode.offsetHeight - this.h;
        this.node.style.top = `${this.y}px`;
        this.isFalling = false;
        this.gravitySpeed = 1;
      }
    }
  };


  fixPosition = () => {
    this.isFalling = false;
    this.y = gameBoxNode.offsetHeight - this.h;
    this.node.style.top = `${this.y}px`;
  };

  hasFallen = () => {
    return this.y + this.h >= gameBoxNode.offsetHeight;
  };
}