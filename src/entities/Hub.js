class Hub extends Building {
    constructor(scene, x, y) {
        super(scene, x, y, "hub", 4, 10, 6, 10)
    
        this.initHealthAndStats(100, 0.01, 1)

        this.setRectangle(0.8 * this.scale * Entity.tileSize, 0.8 * this.scale * Entity.tileSize).setStatic(true)
    }

    update(time, dt) {
        super.update(time, dt)
    }
}