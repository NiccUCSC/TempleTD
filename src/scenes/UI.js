class UI extends Phaser.Scene {

    constructor() {
        super('uiScene')  // This scene is active by default
        console.log('UI: constructor')

    }

    create() {
        // new UIClock(this, 0.5, 0.01)
        this.stone_resource = new UIResource(this, {
            resourceName: "stone_icon", 
            relativePos: [ 1, 0 ],              // in porportions of the screen
            unitOffset: [-1, 1],                // offset from relative position in units
            anchorPoint: [1, 0],                // in units of unitScale
        })
        this.mana_resource = new UIResource(this, {
            resourceName: "mana_icon",
            relativePos: [ 1, 0 ],              // in porportions of the screen
            unitOffset: [-1, 9],                // offset from relative position in units
            anchorPoint: [1, 0],                // in units of unitScale        
        })
        this.bullettier1_resource = new UIResource(this, {
            resourceName: "bullettier1_icon", 
            relativePos: [ 1, 0 ],              // in porportions of the screen
            unitOffset: [-1, 17],                // offset from relative position in units
            anchorPoint: [1, 0],                // in units of unitScale
        })
        this.bullettier2_resource = new UIResource(this, {
            resourceName: "bullettier2_icon",
            relativePos: [ 1, 0 ],              // in porportions of the screen
            unitOffset: [-1, 25],                // offset from relative position in units
            anchorPoint: [1, 0],                // in units of unitScale        
        })

        // this.turret_shopItem = new UIShopItem(this, {
        //     resourceName: "turrettier1",
        //     shopName: "Turret Tier 1",
        //     pos: { x: 0.01, y: 0.01 },
        // })

        this.stone_resource.setQuantity(123456, 384328)
        this.mana_resource.setQuantity(1234567, 989.4)
        this.bullettier1_resource.setQuantity(123456, 384328)
        this.bullettier2_resource.setQuantity(10000000000000000000, 111111111)

        console.log(this.bullettier1_resource)
    }

    update(time, dt) {
        time /= 1000
        dt /= 1000

        UIElement.update_all(this, time, dt)
    }
}