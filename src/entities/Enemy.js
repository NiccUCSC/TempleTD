class Enemy extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "enemy", 1, 20)

        this.maxSpeed = 2      // in tiles / second (determined by friction)
        this.maxAcc = 8        // in tiles / second ^ 2
        this.frictionAlpha = 2  // friction force minimum
        this.tileSize = 64  // in pixels
        this.maxAcc *= 1 + this.frictionAlpha / (this.frictionAlpha + this.maxSpeed)    // fix acceleration due to friction alpha

        super.enablePhysics('circle', 1.5)
    }


    update(time, dt) {
        // Handle movement input from keyboard (Arrow keys or WASD)

        let targets = Entity.entities.filter(entity => entity.name == 'player')

        let targetPos = targets.length ? targets[0].pos.clone() : new Phaser.Math.Vector2(0, 0)

        let force = targetPos.distance(this.pos) > 0.5 ? targetPos.subtract(this.pos).setLength(this.maxAcc) : new Phaser.Math.Vector2(0, 0)

        super.move_with_force(force, dt)

        super.update_sprite(0.25)
    }
}