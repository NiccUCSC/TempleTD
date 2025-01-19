class Enemy extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "enemy", 1, 20)

        this.team = -1
        this.base_dps = 1
        this.maxHealth = 4
        this.health = 4
        this.healthRegenRate = 0.05

        this.maxSpeed = 2      // in tiles / second (determined by friction)
        this.maxAcc = 8        // in tiles / second ^ 2
        this.frictionAlpha = 2  // friction force minimum
        this.tileSize = 64  // in pixels
        this.maxAcc *= 1 + this.frictionAlpha / (this.frictionAlpha + this.maxSpeed)    // fix acceleration due to friction alpha

        this.setCircle(0.8 * Entity.tileSize / 2)

        // super.enablePhysics('circle', 0.9)
    }


    update(time, dt) {
        // Handle movement input from keyboard (Arrow keys or WASD)

        let targets =  Entity.get_all_entites(this.scene).filter(entity => entity.name == 'player')

        let targetPos = targets.length ? targets[0].pos.clone() : new Phaser.Math.Vector2(0, 0)

        let force = targetPos.distance(this.pos) > 0.5 ? targetPos.subtract(this.pos).setLength(this.maxAcc) : new Phaser.Math.Vector2(0, 0)

        super.move_with_force(force, dt)

        super.update_sprite(0.25)
    }
}