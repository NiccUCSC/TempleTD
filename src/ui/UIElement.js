class UIElement extends Phaser.GameObjects.Container {

    // sizes are done in units of screen height / 100
    static width = 640
    static height = 480
    static unit = 6.4

    static params = {
        name: "",
        zlayer: 0,
        pos: {x: 0.5, y: 0.5},          // in porportions of the screen
        size: {width: 1, height: 1},    // in units (height / 100)
        relativePos: null,              // position relative to other UIElement in units
    }

    constructor(scene, params) {
        params = {...UIElement.params, ...params}
        super(scene, params.pos.x * UIElement.width, params.pos.y * UIElement.height)
        scene.add.existing(this)
        this.scene = scene
        
        Object.keys(params).forEach(key => {this[key] = params[key]})

        this.x = params.pos.x * UIElement.width
        this.y = params.pos.y * UIElement.height
    }

    update(time, dt) { return }

    setRelativePos(other, dx, dy) {
        this.relativePos = { other: other, dx: dx, dy: dy }
    }

    updatePos() {
        if (this.relativePos) {
            this.x = this.relativePos.other.x + this.relativePos.dx * UIElement.unit
            this.y = this.relativePos.other.y + this.relativePos.dy * UIElement.unit
        } else {
            this.x = this.pos.x * UIElement.width
            this.y = this.pos.y * UIElement.height
        }
    }

    static update_all(scene, time, dt) {
        UIElement.width = scene.cameras.main.width
        UIElement.height = scene.cameras.main.height
        UIElement.unit = scene.cameras.main.height / 100

        let elements = scene.children.getChildren().filter(obj => obj instanceof UIElement)
        for (const element of elements) {
            element.updatePos()
            element.update(time, dt)
        }
    }
}