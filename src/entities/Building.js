class Building extends Entity {
    constructor(scene, x, y, name, scale, zdepth) {
        super(scene, x, y, name, scale, zdepth)

        this.setRectangle(0.8 * scale * Entity.tileSize, 0.8 * scale * Entity.tileSize)
        this.setStatic(true)

    }

    update(time, dt) {
        return; // update function called every frame for every entity
    }
}