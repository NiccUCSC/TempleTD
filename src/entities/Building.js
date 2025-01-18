class Building extends Entity {
    constructor(scene, x, y, name, scale, zdepth) {
        super(scene, x, y, name, scale, zdepth)

        this.setStatic(true)
    }

    update(time, dt) {
        return; // update function called every frame for every entity
    }
}