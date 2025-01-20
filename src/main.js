// Code Practice: Making a Scene
// Name: Nicolas Vaillancourt
// Date: 1/13/25

"use strict"

let config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE, // Fit the game to the screen
        autoCenter: Phaser.Scale.CENTER_BOTH // Center the game canvas
    },
    physics: {
        default: 'matter',
        matter: {
            // fps: 5, // Set the physics update rate to 30 frames per second
            debug: false,
        }
    },
    // width: 1280,
    // height: 960,
    scene: [MainMenu, Play, UI]
}

let game = new Phaser.Game(config)