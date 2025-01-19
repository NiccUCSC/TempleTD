class Player extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "player", 1, 10)

        this.team = 1
        this.base_dps = 5
        this.maxHealth = 10
        this.health = this.maxHealth
        this.healthRegenRate = 0.01

        this.cursors = null;   // The input keys for movement

        this.maxSpeed = 8               // in tiles / second (determined by friction)
        this.maxAcc = 50                // in tiles / second ^ 2
        this.frictionAlpha = 10         // friction force minimum
        this.maxAcc *= 1 + this.frictionAlpha / (this.frictionAlpha + this.maxSpeed)    // fix acceleration due to friction alpha

        this.cursors = this.scene.input.keyboard.createCursorKeys();  // Arrow keys for movement

        this.setCircle(0.4 * Entity.tileSize / 2)

        // super.enablePhysics('circle', 0.5)
    }

    update(time, dt) {

        let force = new Phaser.Math.Vector2(0, 0)
        force.x = this.cursors.right.isDown - this.cursors.left.isDown
        force.y = this.cursors.down.isDown - this.cursors.up.isDown
        force.setLength(this.maxAcc)

        super.move_with_force(force, dt)

        super.update_sprite()
    }
}