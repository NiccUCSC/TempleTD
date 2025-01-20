class Hub extends Building {
    static params = {
        name: "hub",
        scale: 4,
        maxHealth: 100,
        team: 1,
        base_dps: 1,
    }

    constructor(scene, x, y, params) {
        params = {...Hub.params, ...params}
        super(scene, x, y, params)
    
        this.setRectangle(0.8 * this.scale * Entity.tileSize, 0.8 * this.scale * Entity.tileSize).setStatic(true)
    }

    update(time, dt) {
        super.update(time, dt)
    }
}