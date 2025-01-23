class MainMenu extends Phaser.Scene {
    constructor() {
        super('mainMenuScene')
        console.log('MainMenu: constructor')
    }

    preload() {
        this.load.path = "./assets/kenny/PNG/Retina/"
        this.load.image("ground", "towerDefense_tile236.png")
        this.load.image("sand", "towerDefense_tile098.png")
        this.load.image("spawnzone", "towerDefense_tile130.png")

        this.load.image("player", "towerDefense_tile245.png")
        this.load.image("turrettier1", "towerDefense_tile249.png")
        this.load.image("turrettier2", "towerDefense_tile250.png")
        this.load.image("rocket", "towerDefense_tile251.png")
        this.load.image("bullettier1", "towerDefense_tile275.png")
        this.load.image("bullettier2", "towerDefense_tile272.png")



        this.load.path = "./assets/kenny/Tilesheet/"
        this.load.image("tileset", "towerDefense_tilesheet.png")

        // Preload UI assets
        this.load.path = "./assets/kenny/PNG/Retina/"
        this.load.image("stone_icon", "towerDefense_tile137.png")
        this.load.image("bullettier1_icon", "towerDefense_tile275.png")
        this.load.image("bullettier2_icon", "towerDefense_tile272.png")
        
        this.load.path = "./assets/images/"
        this.load.image("mana_icon", "Mana.png")
        this.load.image("hub", "TempleTier1.png")
        this.load.image("enemytier1", "EnemyTier1.png")
        this.load.image("enemytier2", "EnemyTier2.png")
        this.load.image("enemytier3", "EnemyTier3.png")
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