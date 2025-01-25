class ManaWell extends Building {
    static params = {
        name: "Mana Well",
        team: 1,
        production: { Mana: 50 },
        buildCost: { Stone: 50, Mana: 2000 }
    }

    constructor(scene, x, y, params) {
        params = {...ManaWell.params, ...params}
        super(scene, x, y, params)
    
    }

    update(time, dt) {
        super.update(time, dt)
    }
}