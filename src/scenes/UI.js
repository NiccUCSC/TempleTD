class UI extends Phaser.Scene {

    constructor() {
        super('uiScene')  // This scene is active by default
        console.log('UI: constructor')
        World.UIInit(this)
    }

    create() {
        new UIClock(this, {
            interactive: true,
            relativePos: [0.5, 0],        // in screen width and height porporitons
            unitOffset: [0, 1],
            unitScale: [12, 2.5],          // in units
            anchorPoint: [0.5, 0],
        })


        // this.turret_shopItem = new UIShopItem(this, {
        //     resourceName: "turrettier1",
        //     shopName: "Turret Tier 1",
        //     pos: { x: 0.01, y: 0.01 },
        // })

        // this.stone_resource.setQuantity(200, 1)
        // this.mana_resource.setQuantity(0, 0)
        // this.bullettier1_resource.setQuantity(0, 0)
        // this.bullettier2_resource.setQuantity(0, 0)

        // this.stone_resource.setUnitScale(10, 5)
        // console.log(this.bullettier1_resource)

    }

    update(time, dt) {
        time /= 1000
        dt /= 1000

        UIElement.update_all(this, time, dt)
    }
}