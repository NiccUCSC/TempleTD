class MainMenu extends Phaser.Scene {
    constructor() {
        super('mainMenuScene')
        console.log('MainMenu: constructor')
    }

    create() {
        console.log('MainMenu: create')
        this.scene.start('playScene')
        this.scene.start('uiScene')
    }

    init() {
        console.log('MainMenu: init')
    }
}