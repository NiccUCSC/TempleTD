class Bullet extends Entity {
    static target_types = ["enemy"]

    constructor(scene, x, y, name, scale, muzzleSpeed, angle, lifetime) {
        super(scene, x, y, name, scale, 15, false)

        this.lifetime = lifetime
        this.vel.x = muzzleSpeed 
        this.vel.rotate(angle)
        this.setVelocity(this.vel.x, this.vel.y)
        this.setPosition(this.x, this.y)
    }


    update(time, dt) {
        this.lifetime -= dt

        if (this.lifetime <= 0) this.alive = false

        super.move_with_force(new Phaser.Math.Vector2(0, 0), dt)
        super.update_sprite()

        let speed = this.vel.length()
        this.dps_multiplier = speed * (1 + speed / 10)
    }
}