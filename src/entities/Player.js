class Player extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "player", 1, 10)
        this.cursors = null;   // The input keys for movement

        this.maxSpeed = 8      // in tiles / second (determined by friction)
        this.maxAcc = 110        // in tiles / second ^ 2
        this.frictionAlpha = 10  // friction force minimum
        this.tileSize = 64  // in pixels

        this.cursors = this.scene.input.keyboard.createCursorKeys();  // Arrow keys for movement
    }

    update(time, dt) {
        // Handle movement input from keyboard (Arrow keys or WASD)
        time /= 1000
        dt /= 1000

        let force = new Phaser.Math.Vector2(0, 0)
        let friction = this.vel.clone()

        force.x = this.cursors.right.isDown - this.cursors.left.isDown
        force.y = this.cursors.down.isDown - this.cursors.up.isDown
        force.setLength(this.maxAcc)

        let anyMovmentKey = force.x || force.y

        let speed = this.vel.length()

        friction.setLength((speed + this.frictionAlpha) * this.maxAcc / (this.maxSpeed + this.frictionAlpha)).scale(-1)

        if (!anyMovmentKey && friction.length() * dt >= this.vel.length()) this.vel.setLength(0)
        else this.vel.add(force.add(friction).scale(dt))


        this.pos.add(this.vel.clone().scale(dt))

        this.sprite.x = this.pos.x * this.tileSize
        this.sprite.y = this.pos.y * this.tileSize

        if (this.vel.length()) this.sprite.rotation = this.vel.angle()
        
    }
}