class UI extends Phaser.Scene {

    constructor() {
        super('uiScene')  // This scene is active by default
        console.log('UI: constructor')

    }

    preload() {
        // Preload UI assets
        this.load.path = "./assets/kenny/PNG/Retina/"
        this.load.image("stone_icon", "towerDefense_tile137.png")
        this.load.image("mana_icon", "towerDefense_tile019.png")
        this.load.image("up_arrow", "towerDefense_tile203.png")

    }

    create() {
        new UIClock(this, 0.5, 0.01)
        this.stone_resource = new UIResource(this, {
            resoruceName: "stone_icon", 
            pos: { x: 0.99, y: 0.01 },
        })
        this.mana_resource = new UIResource(this, {
            resourceName: "mana_icon",
            relativePos: { other: this.stone_resource, dx: 0, dy: 8 },
        })
    }

    update(time, dt) {
        time /= 1000
        dt /= 1000

        UIElement.update_all(this, time, dt)
    }
}