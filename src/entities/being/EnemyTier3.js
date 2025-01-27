class EnemyTier3 extends Enemy {
    static params = {
        name: "enemytier3",
        base_dps: 16,
        maxAcc: 8,
        frictionAlpha: 2,
        targetRadius: 30,
    }

    constructor(scene, x, y, params) {
        params = {...EnemyTier3.params, ...EnemyTier3.generateParams(), ...params}
        super(scene, x, y, params) // 
        this.setCircle(0.9 * this.tileScale * Entity.tileSize / 2)
    }

    static generateParams(scale = gaussianRandom(3, 0.3)) {
        return {
            scale: scale,
            maxHealth: 20 * scale ** 2,
            maxSpeed: 2.5 / scale
        }
    }
}