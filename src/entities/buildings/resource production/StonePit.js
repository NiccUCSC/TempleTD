class StonePit extends Building {
    static params = {
        name: "Stone Pit",
        team: 1,
        production: { Stone: 2 },
        buildCost: { Stone: 80 }
    }

    constructor(scene, x, y, params) {
        params = {...StonePit.params, ...params}
        super(scene, x, y, params)
    
    }

    update(time, dt) {
        super.update(time, dt)
    }
}