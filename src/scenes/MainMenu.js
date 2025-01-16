class MainMenu extends Phaser.Scene {
    constructor() {
        super('mainMenuScene')
        console.log('MainMenu: constructor')
    }

    create() {
        console.log('MainMenu: create')
        this.scene.start('playScene')
    }

    init() {
        console.log('MainMenu: init')
    }
}