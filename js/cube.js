class Cube {
  constructor(posX) {
    this.node = document.createElement("div");
    gameBoxNode.appendChild(this.node);

    this.x = 0;
    this.y = 0;
    this.w = 200;
    this.h = 100;
    this.gravitySpeed = 1;

    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;
    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
    this.node.style.background = "red";
    this.isFalling = false;
  }

  moveRight = () => {
    if (!this.isFalling) {
        this.x += 5;
        this.node.style.left = `${this.x}px`;

        if (this.x + this.w >= gameBoxNode.offsetWidth) {
            this.x = gameBoxNode.offsetWidth - this.w;
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
        this.node.style.background = "red";
      }
    }
  };
}
