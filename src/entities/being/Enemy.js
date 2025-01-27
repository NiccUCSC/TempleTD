class Enemy extends Being {
    static params = {
        zdepth: 6,
        interactive: true,
        healthRegenRate: 0.05,
        team: -1,
        targetRadius: 2.5,
        target: null,
        wanderTarget: null,
    }
    
    constructor(scene, x, y, params) {        
        params = {...Enemy.params, ...params}
        super(scene, x, y, params)
    }

    getWanderTarget() {
        if (!this.wanderTarget || 
            this.wanderTarget.distance(new Phaser.Math.Vector2(this.pos.x, this.pos.y)) < 0.1) {
            let r = Math.random() * this.targetRadius
            let theta = Math.random() * 2 * Math.PI
            let dx = r * Math.cos(theta)
            let dy = r * Math.sin(theta)
            this.wanderTarget = new Phaser.Math.Vector2(this.pos.x + dx, this.pos.y + dy)
        }
        return this.wanderTarget.clone()
    }

    update(time, dt) {

        if (this.target && this.pos.distance(this.target.pos) > this.targetRadius) this.target = null

        if (!this.target || !this.is_alive(this.target)) this.target = this.find_closest_target(this.targetRadius, 1)

        let targetPos = this.target ? this.target.pos.clone() : this.getWanderTarget()
        let moveForce = this.target ? this.maxAcc : 0.7 * this.maxAcc
        super.move_with_force(targetPos.subtract(this.pos).setLength(moveForce), dt)
        
        super.update_sprite(0.25)
        super.update(time, dt)
    }
}