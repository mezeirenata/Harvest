// Set up the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Character properties
const character = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 50,
    height: 50,
    speed: 5,
};

// Key states for movement (false means not pressed)
let keyState = {
    right: false,
    left: false,
    up: false,
    down: false
};

// Keydown and keyup event listeners
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        keyState.right = true;
    }
    if (e.key === 'ArrowLeft') {
        keyState.left = true;
    }
    if (e.key === 'ArrowUp') {
        keyState.up = true;
    }
    if (e.key === 'ArrowDown') {
        keyState.down = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight') {
        keyState.right = false;
    }
    if (e.key === 'ArrowLeft') {
        keyState.left = false;
    }
    if (e.key === 'ArrowUp') {
        keyState.up = false;
    }
    if (e.key === 'ArrowDown') {
        keyState.down = false;
    }
});

// Function to move the character based on key states
function moveCharacter() {
    if (keyState.right) {
        character.x += character.speed;
    }
    if (keyState.left) {
        character.x -= character.speed;
    }
    if (keyState.up) {
        character.y -= character.speed;
    }
    if (keyState.down) {
        character.y += character.speed;
    }

    // Keep the character within canvas bounds
    if (character.x < 0) character.x = 0;
    if (character.y < 0) character.y = 0;
    if (character.x + character.width > canvas.width) character.x = canvas.width - character.width;
    if (character.y + character.height > canvas.height) character.y = canvas.height - character.height;
}

// Function to clear the canvas
function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Function to draw the character
function drawCharacter() {
    ctx.fillStyle = 'red';
    ctx.fillRect(character.x, character.y, character.width, character.height);
}

// The update function to run each frame
function update() {
    clear();  // Clear the canvas
    moveCharacter();  // Move the character based on key states
    drawCharacter();  // Draw the character
    requestAnimationFrame(update);  // Call the next frame
}

// Start the game loop
update();
