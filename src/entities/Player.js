class Player extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "player", 1, 10)

        this.initHealthAndStats(10, 0.01, 1, 5)
        this.initMovementConstants(8, 50, 10)
        this.setCircle(0.4 * Entity.tileSize / 2)

        this.cursors = this.scene.input.keyboard.createCursorKeys();  // Arrow keys for movement

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