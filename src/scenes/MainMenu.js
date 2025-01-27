class MainMenu extends Phaser.Scene {
    constructor() {
        super('mainMenuScene')
    }

    preload() {
        WorldTextures.loadTextures(this)
    }

    create() {
        this.scene.start('playScene')
        this.scene.start('uiScene')
    }

    init() {}
}