class Enemy extends Entity {
    constructor(scene, x, y, target) {
        super(scene, x, y, "enemy", 1, 20)


        this.maxSpeed = 4      // in tiles / second (determined by friction)
        this.maxAcc = 8        // in tiles / second ^ 2
        this.frictionAlpha = 2  // friction force minimum
        this.tileSize = 64  // in pixels

    }


    update(time, dt, target) {
        // Handle movement input from keyboard (Arrow keys or WASD)
        time /= 1000
        dt /= 1000

        let force = target.pos.clone().subtract(this.pos)
        let friction = this.vel.clone()
                
        force.setLength(this.maxAcc)

        let anyMovmentKey = force.x || force.y

        let speed = this.vel.length()

        friction.setLength((speed + this.frictionAlpha) * this.maxAcc / (this.maxSpeed + this.frictionAlpha)).scale(-1)

        if (!anyMovmentKey && friction.length() * dt >= this.vel.length()) this.vel.setLength(0)
        else this.vel.add(force.add(friction).scale(dt))


        this.pos.add(this.vel.clone().scale(dt))

        this.sprite.x = this.pos.x * this.tileSize
        this.sprite.y = this.pos.y * this.tileSize

        if (this.vel.length() > 0.25) this.sprite.rotation = this.vel.angle()
        
    }
}