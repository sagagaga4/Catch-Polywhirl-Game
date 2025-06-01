### Polywhirl Collector Game
![image](https://github.com/user-attachments/assets/ccaac9ee-03fd-4c10-afad-e5c7e8205cf5)

A browser-based game built with HTML, CSS, and JavaScript, where players control Pikachu to collect Polywhirls by clicking them to earn points while avoiding falling Pokéballs. The game features smooth character movement, collision detection, and a score counter with a 200ms grow animation when points are added.

## Features

## Pikachu Movement: 
Move Pikachu left (A) or right (D) and jump (Space) to position for collecting Polywhirls.

## Catch Poly:
Click falling Polywhirls to increment the score, displayed as "Poly Bank: X" with a 200ms grow animation.

## Pokéball Avoidance: 
Dodge falling Pokéballs, which temporarily turn Pikachu red on collision.

## No Scrollbars:
The game is contained within a 90vw x 70vh area, ensuring a clean experience without scrollbars.

## Pixel Art Style:
Uses pixelated sprites for Pikachu, Pokéball, and Polywhirl, set against a mountain background.

## Lifebar Placeholder:
Displays a lifebar GIF (not yet functional).



### Clone the Repository:

git clone https://github.com/your-username/polywhirl-collector.git
cd polywhirl-collector



Set Up a Local Server: Run a local server to serve image assets correctly (due to CORS restrictions):

python -m http.server 8000

Alternatively, use a tool like Live Server in VS Code.



Open in Browser: Navigate to http://localhost:8000 to play the game.

## File Structure

polywhirl-collector/
├── index.html         # Main HTML file
├── style.css          # CSS for styling and layout
├── script.js          # JavaScript for game logic
├── photos/            # Image assets (not included in repo)
│   ├── pika-pixel.png
│   ├── redpika-pixel.png
│   ├── pokeball.png
│   ├── polywhirl.png
│   ├── gifs/
│   │   ├── energyball.gif
│   │   ├── life.gif
│   ├── mountain.jpeg
└── README.md          # This file

Note: The photos folder is not included in the repository due to potential copyright concerns. You must provide your own image assets with the same filenames and place them in the photos directory.

How to Play
