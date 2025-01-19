class Turret extends Building {
    constructor(scene, x, y, params = {}) {
        super(scene, x, y, params.name ?? "turrettier1", params.scale, 10, params.targetRadius ?? 6, params.logisticsRadius ?? 10)
        this.loadParams(params)
        this.initHealthAndStats(params.maxHealth, params.healthRegenRate, params.base_dps)
        this.setCircle(1.2 * params.scale * Entity.tileSize / 2).setStatic(true)

        this.target = null                      // entity aiming for
        this.timeTillShoot = 0                  // setup time before shooting and time between shots
        this.shootPos = null                    // location of the end of the barrel (bullet spawn location updated every shot)
    }

    loadParams(params) {
        this.fireRate = params.fireRate ?? 1            // shots per second
        this.muzzleVel = params.muzzleVel ?? 10         // speed of the bullet in tiles / second when initially shot

        this.shootOffset = params.shootOffset ??
            [new Phaser.Math.Vector2(0, -0.5)]          // array of offsets to the end of the barrel from center of sprite
        for (let offset of this.shootOffset) offset.scale(this.scale)
        this.projectileType = params.projectileType 
            ?? BulletTier1                              // projectile class

        console.log(params.shootOffset, params.shootOffset.length)
        this.barrelCount = params.shootOffset.length
        this.barrelIndex = 0
        super.loadParams(params)
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
            console.log(`shooting from ${this.barrelIndex} of ${this.barrelCount}`)
            new this.projectileType(this.scene, this.shootPos.x, this.shootPos.y, this.muzzleVel, this.rotation - Math.PI / 2)
        }
    }
}