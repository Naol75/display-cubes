class Cube {
  constructor(posX, sizeMultiplier, speedMultiplier) {
    // Create a new DOM element for the cube and append it to the gameBoxNode
    this.node = document.createElement("div");
    gameBoxNode.appendChild(this.node);

    // Set initial position and dimensions of the cube
    this.x = posX;
    this.y = 0;
    this.w = 170;
    this.h = 120;

    // Initialize properties related to falling animation
    this.gravitySpeed = 1;
    this.isFalling = false;

    // Scale the dimensions of the cube based on sizeMultiplier
    this.w = this.w * sizeMultiplier;
    this.h = this.h * sizeMultiplier;

    // Set speedMultiplier and apply style attributes to the cube's DOM element
    this.speedMultiplier = speedMultiplier;
    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
    this.direction = 1;
    this.isFixed = false;

    // Scale the dimensions of the cube's DOM element based on sizeMultiplier
    this.w *= sizeMultiplier;
    this.h *= sizeMultiplier;

    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;
  }

  // Move the cube horizontally to the right
  moveRight() {
    if (!this.isFalling) {
      this.x += 5 * this.direction * this.speedMultiplier;
      this.node.style.left = `${this.x}px`;

      // Reverse direction if the cube reaches the right or left edge of the gameBoxNode
      if (this.x + this.w >= gameBoxNode.offsetWidth) {
        this.x = gameBoxNode.offsetWidth - this.w;
        this.direction = -1;
      }
      if (this.x <= 0) {
        this.x = 0;
        this.direction = 1;
      }
    }
  }

  // Move the cube downward during the falling animation
  moveDown = () => {
    if (this.isFalling) {
      this.y += this.gravitySpeed;
      this.gravitySpeed += 0.1;

      this.node.style.top = `${this.y}px`;

      // If the cube reaches the bottom of the gameBoxNode, stop falling
      if (this.y + this.h >= gameBoxNode.offsetHeight) {
        this.y = gameBoxNode.offsetHeight - this.h;
        this.node.style.top = `${this.y}px`;
        this.isFalling = false;
        this.gravitySpeed = 1;
      }
    }
  };

  // Fix the position of the cube when it reaches the bottom of the gameBoxNode
  fixPosition = () => {
    this.isFalling = false;
    this.y = gameBoxNode.offsetHeight - this.h;
    this.node.style.top = `${this.y}px`;
  };

  // Check if the cube has fallen beyond the bottom of the gameBoxNode
  hasFallen = () => {
    return this.y + this.h >= gameBoxNode.offsetHeight;
  };
}
