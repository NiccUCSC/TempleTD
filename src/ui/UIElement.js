class UIElement extends Phaser.GameObjects.Container {

    // sizes are done in units of screen height / 100
    static width = 640
    static height = 480
    static unit = 6.4


    static params = {
        name: "",
        zlayer: 0,
        pos: {x: 0.5, y: 0.5},          // in porportions of the screen
        size: {width: 1, height: 1}     // in units (height / 100)
    }

    constructor(scene, params) {
        params = {...UIElement.params, ...params}
        super(scene, params.pos.x * UIElement.width, params.pos.y * UIElement.height)
        scene.add.existing(this)
        this.scene = scene
        
        Object.keys(params).forEach(key => {this[key] = params[key]})

        this.screenPos = {x: params.pos.x * UIElement.width, y: params.pos.y * UIElement.height}
    }

    update(time, dt) { return }

    static update_all(scene, time, dt) {
        UIElement.width = scene.cameras.main.width
        UIElement.height = scene.cameras.main.height
        UIElement.unit = scene.cameras.main.height / 100

        let elements = scene.children.getChildren().filter(obj => obj instanceof UIElement)
        for (const element of elements) {
            element.screenPos = {x: element.pos.x * UIElement.width, y: element.pos.y * UIElement.height}
            element.update(time, dt)
        }
    }
}