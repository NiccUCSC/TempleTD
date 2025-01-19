class EnemyTier2 extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, "enemytier2", gaussianRandom(2, 0.15)) // 

        this.initHealthAndStats(10 * this.scale ** 2, 0.05, -1, 4)
        this.initMovementConstants(2 / this.scale, 40, 2)
        this.setCircle(0.8 * this.scale * Entity.tileSize / 2)

        this.target = null
        this.targetRadius = 15
    }
}