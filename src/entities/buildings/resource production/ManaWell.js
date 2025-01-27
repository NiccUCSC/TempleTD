class ManaWell extends Building {
    static params = {
        name: "manawell",
        team: 1,
        scale: 2,
        maxHealth: 200,
        healthRegenRate: 0.01,
        manaDrain: 10,
        production: { Mana: 50 },
        buildCost: { Stone: 50, Mana: 2000 },
        collisionShape: { type: "Circle", size: 2 },
    }

    constructor(scene, x, y, params) {
        params = {...ManaWell.params, ...params}
        super(scene, x, y, params)
    }

    update(time, dt) {
        super.update(time, dt)
    }
}