class UI extends Phaser.Scene {

    constructor() {
        super('uiScene')  // This scene is active by default
        console.log('UI: constructor')

    }

    preload() {
        // Preload UI assets
    }

    create() {
        new Clock(this, 0.5, 0.01)
    }

    update(time, dt) {
        time /= 1000
        dt /= 1000

        UIElement.update_all(this, time, dt)
    }
}