//////////////////////////////get characters//////////////////////////////////// 

const character = document.getElementById("pika");
const pokeball = document.getElementById("pokeball");
const poly = document.getElementById("poly");
const counterDisplay = document.querySelector(".count");

//////////////////////////////global variables characters////////////////////////
let counter = 0; // Counter for the number of polywhirls clicked
const catchAudio = new Audio('./sounds/wah.wav');
const hitAudio = new Audio('./sounds/UUU.wav');
//////////////////////////////variable decleartions///////////////////////////// 

// Initial character position and state
let isJumping = false;
let verticalVelocity = 0;
let currentBottom = 5;
// Gravity and jump constants
const gravity = 0.8;
const jumpPower = -15;
const groundLevel = 5;

//////////////////////////////event listeners//////////////////////////////////// 

// Jump functionality with spacebar
document.addEventListener('keydown', function(event) {
    if (!isJumping && event.code === 'Space') {
        event.preventDefault(); // Prevents page scrolling
        isJumping = true;
        verticalVelocity = jumpPower;
    }
});

//* MOVE LEFT RIGHT*/

//////////////////////////////variable decleartions//////////////////////////////

// Smooth movement variables
let currentLeft = 1;
let targetLeft = 1;
// Keyboard controls
let isMovingLeft = false;
let isMovingRight = false;
// Movement speed and acceleration
const moveSpeed = 3; // pixels per frame
const acceleration = 0.5;
// Horizontal velocity for smooth movement
let horizontalVelocity = 0;

// Maximum speed and friction
const maxSpeed = 5;
const friction = 0.8;

// Sprite direction
let facingRight = true;

//////////////////////////////event listeners//////////////////////////////////// 

// Smooth keyboard controls
document.addEventListener('keydown', function(event) {
    if (event.code === 'KeyA') {
        isMovingLeft = true;
        if (facingRight) {
            facingRight = false;
            character.style.transform = 'scaleX(1)'; // Flip horizontally
        }
    } else if (event.code === 'KeyD') {
        isMovingRight = true;
        if (!facingRight) {
            facingRight = true;
            character.style.transform = 'scaleX(1)'; // Normal direction
        }
    }
});

//Don't when keys are not pressed
document.addEventListener('keyup', function(event) {
    if (event.code === 'KeyA') {
        isMovingLeft = false;
    } else if (event.code === 'KeyD') {
        isMovingRight = false;
    }
});


////////////////////////////Character Movement Functions///////////////////////////// 

// Update character function to handle movement and jumping
function updateCharacter() {
    // Handle jumping
    if (isJumping) {
        verticalVelocity += gravity;
        currentBottom -= verticalVelocity;
       
        // Prevent falling below ground level
        if (currentBottom <= groundLevel) {
            currentBottom = groundLevel;
            isJumping = false;
            verticalVelocity = 0;
        }
        // Apply the vertical position              
        character.style.bottom = currentBottom + 'px';
    }
   
    // Handle smooth horizontal movement
    if (isMovingLeft) {
        horizontalVelocity -= acceleration;
    } else if (isMovingRight) {
        horizontalVelocity += acceleration;
    } else {
        // Apply friction when no keys are pressed
        horizontalVelocity *= friction;
    }
   
    // Limit maximum speed
    if (horizontalVelocity > maxSpeed) horizontalVelocity = maxSpeed;
    if (horizontalVelocity < -maxSpeed) horizontalVelocity = -maxSpeed;
   
    // Update position
    currentLeft += horizontalVelocity;
   
    // Boundary checks
    const containerWidth = window.innerWidth * 1.4; // 90vw
    const characterWidth = containerWidth * 0.5; // 25% width from CSS
   
    // Ensure character stays within the container
    if (currentLeft < 0) {
        currentLeft = 0;
        horizontalVelocity = 0;
    } else if (currentLeft > containerWidth - characterWidth) {
        currentLeft = containerWidth - characterWidth;
        horizontalVelocity = 0;
    }
   
    // Apply the movement
    character.style.left = currentLeft + 'px';

    // Request the next frame
    requestAnimationFrame(updateCharacter);
}

updateCharacter();

//_______________________________*POKEBALL*____________________________________/

//* FALLING POKEBALLS */

//////////////////////////////variable decleartions///////////////////////////// 

//Initial pokeball position and speed
let pokeballbottom = 50;
let pokeballleft = Math.random() * 60; // Random horizontal position
let pokeballSpeed = 0.5; // Speed of falling pokeball
//Gravity effect on the pokeball
const gravityPokeball = 0.5;
const pokeballgroundLevel = 5;

///////////////////////////////PokeBall Functions//////////////////////////////////// 

// Function to handle the falling pokeball
function fallingpokeball() {
    pokeballbottom -= pokeballSpeed; // Move the pokeball down

    if(pokeballbottom <= pokeballgroundLevel) {

        pokeballbottom = 50; // Reset position to the top
        pokeballleft = Math.random() * 60; // Randomize horizontal position
        pokeballSpeed = 0.5; // Reset speed
        // Update the pokeball position
        pokeball.style.bottom = pokeballbottom + 'vh';
        pokeball.style.left = pokeballleft + 'vw';
        // Reset the pokeball's position
        pokeball.style.transition = 'none'; // Disable transition for immediate effect
    }
    else {
        // Update the pokeball position
        pokeball.style.bottom = pokeballbottom + 'vh';
        pokeball.style.left = pokeballleft + 'vw';
    }
    // Check for collision with the character
    checkCollision();
    
    requestAnimationFrame(fallingpokeball);
}

// Start the falling pokeball animation
function updatePokeball() {
    // Apply gravity effect on the pokeball
    pokeballSpeed += gravityPokeball;
    fallingpokeball();
}

// Function to check for collision between character and pokeball
function checkCollision() {
    const characterRect = character.getBoundingClientRect();
    const pokeballRect = pokeball.getBoundingClientRect();
    
    const colliding = (
        characterRect.left < pokeballRect.right &&
        characterRect.right > pokeballRect.left &&
        characterRect.top < pokeballRect.bottom &&
        characterRect.bottom > pokeballRect.top
    );
    
    if (colliding) {
        hitAudio.play(); // Play the hit sound
        // Change to red Pikachu
        character.style.backgroundImage = "url('./photos/redpika-pixel.png')";
       
        // Optional: Reset back to normal after some time
        setTimeout(() => {
            character.style.backgroundImage = "url('./photos/pika-pixel.png')";
        }, 500); // Change back after 1 second
    }
}

updatePokeball();

//_______________________________*POLYWHIRL*____________________________________/

//* POLYWHIRL ANIMATION */

//////////////////////////////variable decleartions/////////////////////////////

let polyBottom = 50; // Starting vertical position (vh)
let polyLeft = Math.random() * 69; // Random horizontal position (vw)
let polySpeed = 0.2; // Initial falling speed

// Gravity effect on the polywhirl
const gravityPoly = 0.05; // Gravity effect
const polyGroundLevel = 5; // Ground level (vh)
const maxPolySpeed = 0.5; // Maximum speed for polywhirl

//////////////////////////////event listeners///////////////////////////////////

document.addEventListener('click', (event) => {
    if (event.target.id === 'poly') {
        console.log("Polywhirl clicked!"); // Debug to confirm click
        catchAudio.play(); // Play the catch sound
        counter++; // Increment the counter
        counterDisplay.textContent = `Poly Bank: ${counter}`; // Update the counter display
        poly.style.backgroundImage = "url('./photos/gifs/life.gif')";
        poly.style.transition = 'background-image 0.5s ease-in-out';
        counterDisplay.classList.add('count-grow'); // Apply grow effect
        setTimeout(() => {
            counterDisplay.classList.remove('count-grow'); // Remove after 200ms
        }, 150);
        // Reset to original image after 0.5 seconds
        setTimeout(() => {
            poly.style.backgroundImage = "url('./photos/mis.png')";
        }, 500);
    }
});


///////////////////////////////Polywhirl Functions///////////////////////////////

// Function to handle the falling polywhirl
// Animation function
function fallingPolywhirl() {
    polySpeed += gravityPoly; // Apply gravity
    if (polySpeed > maxPolySpeed) polySpeed = maxPolySpeed; // Cap speed
    polyBottom -= polySpeed; // Update position

    if (polyBottom <= polyGroundLevel) {
        polyBottom = 50;
        polyLeft = Math.random() * 69;
        polySpeed = 0.2;
        poly.style.transition = 'none';
    }

    poly.style.bottom = polyBottom + 'vh';
    poly.style.left = polyLeft + 'vw';

    requestAnimationFrame(fallingPolywhirl);
}

fallingPolywhirl();
