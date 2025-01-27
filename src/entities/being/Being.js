class Being extends Entity {
    static params = {
        zdepth: 6,
        interactive: false,
        targetRadius: undefined,
    }
    
    constructor(scene, x, y, params) {        
        params = {...Being.params, ...params}
        super(scene, x, y, params)
        Being.loadParams(this, params)
    }

    static loadParams(entity, params) {
        if (entity.targetRadius > 0) {
            entity.rangeCircle = entity.scene.add.graphics()
            entity.rangeCircle.fillStyle(0xff0000, 0.1) // Green outline
            entity.rangeCircle.fillCircle(0, 0, params.targetRadius * Entity.tileSize) // Circle radius 50
            entity.rangeCircle.lineStyle(2, 0xff0000, 0.5) // Green outline
            entity.rangeCircle.strokeCircle(0, 0, params.targetRadius * Entity.tileSize) // Circle radius 50
            entity.rangeCircle.setVisible(false) // Initially hide the circle
            entity.rangeCircle.setDepth(1)
        }
    }

    update(time, dt) {
        const showRanges = this.hovering || this.selected || World.altKey.isDown
        if (this.rangeCircle) {
            this.rangeCircle.setPosition(this.x, this.y)
            // if (this.name == "player") console.log(this.x, this.y)
            this.rangeCircle.setVisible(showRanges)     // show targeting range if hovering or selected
        }
    }

    destroy() {
        if (this.rangeCircle) this.rangeCircle.destroy()
        super.destroy()
    }
}