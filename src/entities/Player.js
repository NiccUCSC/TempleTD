class Player extends Entity {
    static params = {
        name: "player",
        scale: 2,
        zdepth: 5,
        interactive: true,
        maxHealth: 10,
        healthRegenRate: 0.01,
        team: 1,
        base_dps: 5,
        maxSpeed: 8,
        maxAcc: 50,
        frictionAlpha: 10,
    }
    
    constructor(scene, x, y, params) {
        params = {...Player.params, ...params}
        super(scene, x, y, params)

        this.setCircle(0.4 * Entity.tileSize / 2)
        this.cursors = this.scene.input.keyboard.createCursorKeys();  // Arrow keys for movement
        this.spawnPos = {x: this.x, y: this.y}
    }

    onDeath() {
        this.alive = true
        this.setPosition(this.spawnPos.x, this.spawnPos.y)
        this.health = this.maxHealth
    }

    update(time, dt) {

        let force = new Phaser.Math.Vector2(0, 0)
        // force.x = this.cursors.right.isDown - this.cursors.left.isDown
        // force.y = this.cursors.down.isDown - this.cursors.up.isDown
        force.x = World.rightKey.isDown - World.leftKey.isDown
        force.y = World.downKey.isDown - World.upKey.isDown
        force.setLength(this.maxAcc)

        super.move_with_force(force, dt)
        super.update_sprite()
    }
}