class Bullet extends Entity {
    static target_types = ["enemy"]

    constructor(scene, x, y, muzzleSpeed, angle, lifetime) {
        super(scene, x, y, "bullet", 1, 15, false)

        this.team = 1

        this.maxSpeed = 40
        this.maxAcc = 10
        this.frictionAlpha = 0
        this.lifetime = lifetime ?? 3
        this.vel.x = muzzleSpeed 
        this.vel.rotate(angle)
        this.setVelocity(this.vel.x, this.vel.y)
        this.setPosition(this.x, this.y)

        this.displaysHealth = false
        this.maxHealth = 0.2
        this.health = this.maxHealth
        this.base_dps = 10
        this.setCircle(0.25 * Entity.tileSize / 2)
        this.setSensor(true);

        // this.body.debugShowSensor = true;
    }


    update(time, dt) {
        this.lifetime -= dt

        if (this.lifetime <= 0) this.alive = false

        super.move_with_force(new Phaser.Math.Vector2(0, 0), dt)
        super.update_sprite()
    }
}