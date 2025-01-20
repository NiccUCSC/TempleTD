class Bullet extends Entity {
    static params = {
        zdepth: 15,
        displaysHealth: false,
        team: 2,
        lifetime: 3,
        muzzleSpeed: 3,
        angle: 0,
    }

    constructor(scene, x, y, params) {
        params = {...Bullet.params, ...params}
        super(scene, x, y, params)
        Bullet.loadParams(this, params)
    }

    static loadParams(entity, params) {
        entity.vel.x = params.muzzleSpeed
        entity.vel.rotate(params.angle)
        entity.setVelocity(entity.vel.x, entity.vel.y)
        entity.setPosition(entity.x, entity.y)
        entity.setSensor(true);
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