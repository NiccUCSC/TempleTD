class Bullet extends Entity {
    static params = {

    }

    constructor(scene, x, y, name, scale, muzzleSpeed, angle, lifetime, params) {
        super(scene, x, y, name, scale, 15)
        // super(scene, x, y, params.name, params.scale, Bullet.params.zdepth)
        // this.loadParams(params)

        this.lifetime = lifetime
        this.vel.x = muzzleSpeed 
        this.vel.rotate(angle)
        this.setVelocity(this.vel.x, this.vel.y)
        this.setPosition(this.x, this.y)
    }

    loadParams(params) {
        this.lifetime = params.lifetime ?? 3
        this.vel.x = muzzleSpeed ?? 1
        this.vel.rotate(params.angle ?? 0)
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