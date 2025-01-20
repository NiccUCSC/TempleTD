class EnemyTier1 extends Enemy {
    static params = {
        name: "enemytier1",
        base_dps: 1,
        maxAcc: 8,
        frictionAlpha: 2,
        targetRadius: 15,
    }

    constructor(scene, x, y, params) {
        params = {...EnemyTier1.params, ...EnemyTier1.generateParams(), ...params}
        super(scene, x, y, params)
        this.setCircle(0.8 * this.tileScale * Entity.tileSize / 2)
    }

    static generateParams(scale = gaussianRandom(.8, 0.15)) {
        return {
            scale: scale,
            maxHealth: 4 * scale ** 2,
            maxSpeed: 2 / scale
        }
    }
}