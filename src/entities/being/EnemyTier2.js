class EnemyTier2 extends Enemy {
    static params = {
        name: "enemytier2",
        base_dps: 4,
        maxAcc: 8,
        frictionAlpha: 2,
        targetRadius: 25,
    }

    constructor(scene, x, y, params) {
        params = {...EnemyTier2.params, ...EnemyTier2.generateParams(), ...params}
        super(scene, x, y, params) // 
        this.setCircle(0.8 * this.tileScale * Entity.tileSize / 2)
    }

    static generateParams(scale = gaussianRandom(1.6, 0.15)) {
        return {
            scale: scale,
            maxHealth: 10 * scale ** 2,
            maxSpeed: 2 / scale
        }
    }
}