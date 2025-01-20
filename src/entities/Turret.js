class Turret extends Building {
    static params = {
        team: 1,
        base_dps: 1,
        target: null,           // entity target
        timeTillShoot: 0,       // time remaining before next shot
        shootPos: null,         // location of the end of the barrel
        shootOffset: [new Phaser.Math.Vector2(0, 0)],
        fireRate: 1,
        muzzleVel: 10,
        projectileType: BulletTier1,
        barrelCount: 1,
        barrelIndex: 0,
    }

    constructor(scene, x, y, params) {
        params = {...Turret.params, ...params}
        super(scene, x, y, params)
        Turret.loadParams(this, params)
    }

    static loadParams(entity, params) {
        entity.shootOffset = params.shootOffset.map(vec => vec.clone().scale(params.scale))
        entity.barrelCount = params.shootOffset.length
        entity.barrelIndex = params.barrelIndex % params.shootOffset.length

        entity.setCircle(1.2 * params.scale * Entity.tileSize / 2).setStatic(true)
    }

    targetInterceptPos() {  // approximate location for intercept between bullet and target
        let targetDistance = this.shootPos.distance(this.target.pos)
        let bulletInterceptTime = targetDistance / this.muzzleVel
        return this.target.pos.clone().add(this.target.vel.clone().scale(bulletInterceptTime))
    }

    update(time, dt) {
        super.update(time, dt)

        if (this.target && this.pos.distance(this.target.pos) > this.targetRadius) this.target = null   // unfollow targets out of range

        if (!this.target || !this.is_alive(this.target)) 
            this.target = this.find_closest_target(this.targetRadius, -1)                               // find new target if current is not present

        if (this.target) {                                                                              // rotate towards target
            let offset = this.shootOffset[this.barrelIndex].clone()         // gets the offset for the current barrel firing
            this.shootPos = offset.rotate(this.rotation).add(this.pos)      // update shoot pos based on current pos and rotation
            let targetOffset = this.targetInterceptPos().subtract(this.shootPos)
            this.rotation = targetOffset.angle() + Math.PI / 2
        }

        if (this.timeTillShoot > 0) this.timeTillShoot -= dt    // always prepare next shot
        if (this.timeTillShoot <= 0 && this.target) {           // shoot when target present
            this.timeTillShoot += 1 / this.fireRate
            this.barrelIndex = (this.barrelIndex + 1) % this.barrelCount    // cycle to next barrel
            new this.projectileType(this.scene, this.shootPos.x, this.shootPos.y, {
                muzzleSpeed: this.muzzleVel, 
                angle: this.rotation - Math.PI / 2
            })
        }
    }
}