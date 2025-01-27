class Player extends Being {
    static params = {
        name: "player",
        scale: 2,
        zdepth: 5,
        interactive: true,
        maxHealth: 10,
        healthRegenRate: 0.01,
        team: 1,
        targetRadius: 15,
        base_dps: 5,
        maxSpeed: 8,
        maxAcc: 50,
        frictionAlpha: 10,
    }
    
    constructor(scene, x, y, params) {
        params = {...Player.params, ...params}
        super(scene, x, y, params)

        this.setCircle(0.8 * Entity.tileSize / 2)
        this.spawnPos = {x: this.x, y: this.y}
    }

    onDeath() {
        this.alive = true
        this.setPosition(this.spawnPos.x, this.spawnPos.y)
        this.health = this.maxHealth
    }

    update(time, dt) {

        let force = new Phaser.Math.Vector2(0, 0)
        force.x = World.rightKey.isDown - World.leftKey.isDown
        force.y = World.downKey.isDown - World.upKey.isDown
        force.setLength(this.maxAcc)

        super.move_with_force(force, dt)
        super.update_sprite()
        super.update()
    }
}