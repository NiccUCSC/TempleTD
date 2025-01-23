// class UIRect extends Phaser.GameObjects.Container {

//     // sizes are done in units of screen height / 100
//     static width = 640
//     static height = 480
//     static unit = 6.4

//     static params = {
//         relativePos: [0, 0],        // in screen width and height porporitons
//         unitScale: [8, 8],          // size in units
//         unitOffset: [0, 0],         // displacment from relative position in units
//         anchorPoint: [0.5, 0.5],    // origin of object in percent
//     }

//     constructor(scene, params) {
//         params = {...UIRect.params, ...params}
//         super(scene, UIRect.width / 2, UIRect.height / 2)
//         scene.add.existing(this)
//         this.scene = scene
//         Object.keys(params).forEach(key => {this[key] = params[key]})


//         let color = 0
//         if (game.config.physics.debug) {
//             const colorObj = Phaser.Display.Color.HSVToRGB(Math.random(), 1, 1)
//             color = Phaser.Display.Color.GetColor(colorObj.r, colorObj.g, colorObj.b);
//         }
           
//         this.box = this.scene.add.rectangle(this.x, this.y, 
//             this.unitScale[0] * UIRect.unit, this.unitScale[1] * UIRect.unit, color)
//             .setInteractive()  // Make it interactive
    
//         // Add a pointerdown event for when the box is clicked
//         box.on('pointerover', () => {
//             console.log('Box clicked!');
//             box.setFillStyle(0x2ecc71);  // Change color to green on click
//         });
//         // this.hovering = params.hovering
//         // this.selected = params.selected
//         // this.on('pointerover', this.pointerover, this)
//         // this.on('pointerout', this.pointerout, this)
//         // this.scene.input.on('pointerdown', this.pointerdown, this)     // toggles when clicked, deselectes when background clicked
//     }

//     pointerover() { 
//         this.hovering = true 
//         console.log("Hovering")
//         console.log(this)
//     }

//     pointerout() { this.hovering = false }

//     pointerdown() { this.selected = this.hovering && !this.selected }

//     setPosition(x, y) {
//         if (this.parentContainer) super.setPosition(x, y)
//         else super.setPosition(x * UIRect.width - , y * UIRect.height)
//     }

//     updateScaleAndPos() {
//         this.setPosition()
//         this.box.setPosition(this.x, this.y)
//         this.box.setSize(this.unitScale[0] * UIRect.unit, this.unitScale[1] * UIRect.unit)
//     }
// }