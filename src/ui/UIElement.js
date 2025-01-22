class UIElement extends Phaser.GameObjects.Container {

    // sizes are done in units of screen height / 100
    static width = 640
    static height = 480
    static unit = 6.4

    static params = {
        name: "",
        relativePos: [0, 0],        // in screen width and height porporitons
        unitOffset: [0, 0],
        unitScale: [8, 8],          // in units
        anchorPoint: [0.5, 0.5],    // in units of unitScale
        interactive: false,
        hovering: false,
        selected: false,
    }

    static getScreenPosition(relativeX, relativeY, offsetX, offsetY) {
        return [relativeX*UIElement.width + offsetX*UIElement.unit, relativeY*UIElement.height + offsetY*UIElement.unit]
    }

    getRelativePosition() {
        let parentWidth = UIElement.width
        let parentHeight = UIElement.height
        if (this.parentContainer) {
            parentWidth = this.parentContainer.unitScale[0]
            parentHeight = this.parentContainer.unitScale[1]
        }
        return [this.relativePos[0] * parentWidth  + this.unitOffset[0],
                this.relativePos[1] * parentHeight + this.unitOffset[1]]
    }

    constructor(scene, params) {
        params = {...UIElement.params, ...params}
        super(scene, ...UIElement.getScreenPosition(...params.relativePos, ...params.unitOffset))
        scene.add.existing(this)
        this.scene = scene
        
        Object.keys(params).forEach(key => {this[key] = params[key]})

        if (params.interactive) {
            this.rect = this.scene.add.rectangle(0, 0, this.unitScale[0], this.unitScale[1], 0x000000).setAlpha(0.5)
            this.rect.setOrigin(...this.anchorPoint)
            this.add(this.rect)
            // this.setInteractive(rect)            

            this.hovering = params.hovering
            this.selected = params.selected
            this.on('pointerover', this.pointerover, this)
            this.on('pointerout', this.pointerout, this)
            this.scene.input.on('pointerdown', this.pointerdown, this)     // toggles when clicked, deselectes when background clicked
        }
    }

    setUnitScale(sx, sy) {
        console.log("here")
        this.unitScale[0] = sx
        this.unitScale[1] = sy
        this.setPosition(this.getRelativePosition())
    }

    // event functions
    pointerover() { this.hovering = true }

    pointerout() { this.hovering = false }

    pointerdown() { this.selected = this.hovering && !this.selected }

    update(time, dt) { return }

    static update_all(scene, time, dt) {
        UIElement.width = scene.cameras.main.width
        UIElement.height = scene.cameras.main.height
        UIElement.unit = scene.cameras.main.height / 100

        let elements = scene.children.getChildren().filter(obj => obj instanceof UIElement)
        for (const element of elements) {
            element.setScale(UIElement.unit)
            element.setPosition(...UIElement.getScreenPosition(...element.relativePos, ...element.unitOffset))
            element.update(time, dt)
            element.update_all_children(time, dt)
        }
    }

    update_all_children(time, dt) {
        for (const element of this.list.filter(element => element instanceof UIElement)) {
            element.setPosition(...element.getRelativePosition())
            element.update(time, dt)
            element.update_all_children(time, dt)
        }  
    }
}