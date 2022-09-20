// the grid snake count works best with a multiple, or power, of 2
let grid = new Grid("snake");
let snake = new Snake(grid, grid.columns / 2, grid.rows / 2);
let food = new Food(grid, grid.columns / 2, grid.rows / 2 - 5)
let input = new KeyboardInput(snake);
let sound = new Sound();
let score = document.querySelector("#app-score");

document.addEventListener("keydown", keyDown);

function keyDown(event) {
    input.evaluate(event);
}

function main(x, y) {
    grid.clear();
    grid.draw();
    grid.debug();

    if (snake.detectWallCollision() || snake.detectTailCollision()) {
        sound.collision.play();
        snake = new Snake(grid, grid.columns / 2, grid.rows / 2);
        food = new Food(grid, grid.columns / 2, grid.rows / 2 - 5);
        input = new KeyboardInput(snake);
    }

    if (!snake.updateSpeed() && food.detectCollision(snake)) {
        sound.pickUp.play();
    }

    if (snake.updateSpeed() && food.detectCollision(snake)) {
        sound.powerUp.play();
    }

    snake.updateVector();
    snake.draw();
    snake.debug();

    food.draw();
    food.debug();

    score.innerText = `Score: ${snake.length}`

    setTimeout(main, snake.speed, x, y);
}

main(0, 0);
