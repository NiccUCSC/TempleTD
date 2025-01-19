class EnemyTier1 extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, "enemytier1", gaussianRandom(1, 0.15)) // 

        this.initHealthAndStats(4 * this.scale ** 2, 0.05, -1, 1)
        this.initMovementConstants(2 / this.scale, 8, 2)
        this.setCircle(0.8 * this.scale * Entity.tileSize / 2)

        this.target = null
        this.targetRadius = 15
    }
}