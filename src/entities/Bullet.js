class Bullet extends Entity {
    static target_types = ["enemy"]

    constructor(scene, x, y, muzzleSpeed, angle, lifetime) {
        super(scene, x, y, "bullet", 1, 15)

        this.maxSpeed = 40
        this.maxAcc = 10
        this.frictionAlpha = 0
        this.lifetime = lifetime ?? 3
        this.vel.x = muzzleSpeed
        this.vel.rotate(angle)

        this.displaysHealth = true
    }


    update(time, dt) {
        this.lifetime -= dt

        if (this.lifetime <= 0) Entity.kill(this)

        super.move_with_force(new Phaser.Math.Vector2(0, 0), dt)
        super.update_sprite()
    }
}