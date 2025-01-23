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


        // this.test = new UIRect(this, {
        //     relativePos: [0, 0],        // in screen width and height porporitons
        //     unitScale: [8, 8],          // size in units
        //     unitOffset: [0, 0],         // displacment from relative position in units
        //     anchorPoint: [0.5, 0.5],    // origin of object in percent})
        // })

    }

    update(time, dt) {
        time /= 1000
        dt /= 1000

        // this.test.updateScaleAndPos()

        UIElement.update_all(this, time, dt)
    }
}