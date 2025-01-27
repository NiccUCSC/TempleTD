class EnemyTier5 extends Enemy {
    static params = {
        name: "enemytier5",
        base_dps: 2048,
        maxAcc: 8,
        frictionAlpha: 2,
        targetRadius: 30,
    }

    constructor(scene, x, y, params) {
        params = {...EnemyTier5.params, ...EnemyTier5.generateParams(), ...params}
        super(scene, x, y, params) // 
        this.setRectangle(0.8 * params.scale[0] * Entity.tileSize, 0.8 * params.scale[1] * Entity.tileSize)
    }

    static generateParams(scale = gaussianRandom(5, 0.3)) {
        return {
            scale: [ 2.5 * scale, scale ],
            maxHealth: 80 * scale ** 2,
            maxSpeed: 2.5 / scale
        }
    }
}