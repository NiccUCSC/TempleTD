class EnemyTier4 extends Enemy {
    static params = {
        name: "enemytier4",
        base_dps: 256,
        maxAcc: 8,
        frictionAlpha: 2,
        targetRadius: 30,
    }

    constructor(scene, x, y, params) {
        params = {...EnemyTier4.params, ...EnemyTier4.generateParams(), ...params}
        super(scene, x, y, params) //
        this.setRectangle(0.8 * params.scale[0] * Entity.tileSize, 0.8 * params.scale[1] * Entity.tileSize)
    }

    static generateParams(scale = gaussianRandom(4, 0.3)) {
        return {
            scale: [ 2*scale, scale ],
            maxHealth: 40 * scale ** 2,
            maxSpeed: 2.5 / scale
        }
    }
}