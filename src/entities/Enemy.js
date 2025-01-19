class Enemy extends Entity {
    constructor(scene, x, y, name, scale) {
        super(scene, x, y, name, scale, 5)
        this.targetRadius = 15
    }



    update(time, dt) {
        if (this.target && this.pos.distance(this.target.pos) > this.targetRadius) this.target = null

        if (!this.target || !this.is_alive(this.target)) this.target = this.find_closest_target(this.targetRadius, 1)

        let targetPos = this.target ? this.target.pos.clone() : new Phaser.Math.Vector2(0, 0)

        super.move_with_force(targetPos.subtract(this.pos).setLength(this.maxAcc), dt)

        super.update_sprite(0.25)
    }
}