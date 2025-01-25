class StonePit extends Building {
    static params = {
        name: "stonepit",
        team: 1,
        logisticRadius: 10,
        scale: 2,
        maxHealth: 200,
        healthRegenRate: 0.01,
        manaDrain: 10,
        production: { Stone: 2 },
        buildCost: { Stone: 80, Mana: 1000 },
        collisionShape: { type: "Rect", size: [2, 2] },
    }

    constructor(scene, x, y, params) {
        params = {...StonePit.params, ...params}
        super(scene, x, y, params)

    }

    update(time, dt) {
        super.update(time, dt)
    }
}