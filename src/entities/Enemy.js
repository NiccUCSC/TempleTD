class Enemy extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "enemy", 1, 20)

        this.initHealthAndStats(4, 0.05, -1)
        this.initMovementConstants(2, 8, 2)
        this.setCircle(0.8 * Entity.tileSize / 2)

        this.base_dps = 1
        this.target = null
    }

    update(time, dt) {
        if (!this.target) this.target = this.find_closest_target(10, 1)

        let targetPos = this.target ? this.target.pos.clone() : new Phaser.Math.Vector2(0, 0)

        super.move_with_force(targetPos.subtract(this.pos).setLength(this.maxAcc), dt)

        super.update_sprite(0.25)
    }
}