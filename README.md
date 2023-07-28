# Display: cubes

## [Play the Game!](https://github.com/Naol75/display-cubes)

![Game Logo](../images/favicon.jpg)


# Description

Display Cubes es un juego simple donde debes apilar cubos en una torre. El objetivo es lograr la mayor altura posible sin dejar caer ninguno de los cubos, pasando de esta forma al próximo nivel, donde los cubos se mueven más rápido y son más pequeños. Qué puntuación vas a conseguir!?


# Main Functionalities

- Los cubos caen automáticamente desde la parte superior de la pantalla.
- Los cubos se generan con colores y gradientes aleatorios.
- Los cubos caen con gravedad hasta que colisionan con el suelo o con otro cubo fijo.
- El juego lleva un registro de la puntuación y la puntuación más alta.
- El juego se vuelve más desafiante con cubos más pequeños y rápidos en cada transición de nivel.
- El juego termina cuando un cubo toca el suelo

# Backlog Functionalities

- Adaptar el juego para móviles mediante media query
- Adaptar el juego según los hercios de cada pantalla


# Technologies used

- HTML, CSS y JavaScript para crear la estructura, el diseño y la lógica del juego.
- Manipulación del DOM para interactuar con elementos de la página web.
- Uso de Local Storage para almacenar la puntuación más alta del jugador.
- Audio

# States

- Pantalla de inicio: La pantalla que se muestra cuando el juego se carga por primera vez.
- Pantalla del juego: La pantalla principal del juego.
- Pantalla de fin de juego: La pantalla que se muestra cuando el jugador pierde y muestra la puntuación final.

# Project Structure


## main.js

- startGame()
- restartGame()
- spaceBar(event)

## Game.js

- Game () {
- cubeArr:
- fixedCubesArr
- frames
- isGameOn
- canSpawn
- colorIndex
- sizeMultiplier
- speedMultiplier
- score
- highScore
}

- resetGame():
- loadHighScore()
- saveHighScore()
- randomCubeColor()
- startBackgroundMusic()
- playScoreSound()
- playGameOverSound()
- stopGameOverMusic()
- spawnNewCube()
- dropCube()
- cubeFloorCollision()
- createScoreLetters()
- updateScoreDisplay()
- cubeToCubeCollision()
- checkFixedCubeCount()
- gameOver()
- gameLoop()

## cube.js 

- Cube () {
- node
- x, y
- w, h
- gravitySpeed
- isFalling
- speedMultiplier
- direction
- isFixed
}

moveRight()
moveDown()
fixPosition()
hasFallen()


# Extra Links 

### Sketch
[Link](https://excalidraw.com/#room=836a1be90b1fc7c44319,C_Ogq6vSYJX0oYQYuWc9Ng)

### Trello
[Link](https://trello.com/b/yTK93IU8/display-cubes)

### Slides
[Link](https://www.canva.com/design/DAFp6r-nVmI/fbMWwrpPJBxXprgAEK-5ug/edit?utm_content=DAFp6r-nVmI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

## Deploy
[Link](https://github.com/Naol75/display-cubes)