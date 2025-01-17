class Entity {
    
    static tileSize = 64

    static entities = []    // list of all entity instances

    static debugMode = false

    constructor(scene, x, y, name, scale, zdepth) {
        Entity.entities.push(this)

        console.log(`Creating ${name} at (${x}, ${y})`)

        this.scene = scene;
        this.sprite = this.scene.add.sprite(0, 0, name);
        this.sprite.setOrigin(0.5, 0.5)
        this.sprite.setDepth(zdepth)
        this.sprite.setScale(scale)
        this.name = name
        this.scale = scale
        this.zdepth = zdepth

        this.pos = new Phaser.Math.Vector2(x, y)
        this.vel = new Phaser.Math.Vector2(0, 0)
        this.acc = new Phaser.Math.Vector2(0, 0)

        this.maxAcc = 0
        this.maxSpeed = 0
        this.frictionAlpha = 0

        this.update_sprite()
    }

    move_with_force(force, dt) {
        dt /= 1000
        
        let speed = this.vel.length()
        let frictionMag = this.maxAcc * (speed + this.frictionAlpha) / (this.maxSpeed + this.frictionAlpha)
        let friction = this.vel.clone().setLength(frictionMag).scale(-1)

        if (!(force.x || force.y) && friction.length() * dt >= this.vel.length()) this.vel.setLength(0)
        else this.vel.add(force.add(friction).scale(dt))

        this.pos.add(this.vel.clone().scale(dt))
    }


    update_sprite(min_vel) {
        this.sprite.x = this.pos.x * Entity.tileSize
        this.sprite.y = this.pos.y * Entity.tileSize
        if (this.vel.length() > (min_vel ?? 0)) this.sprite.rotation = this.vel.angle()
    }

    update(time, dt) {
        return; // update function called every frame for every entity
    }

    static update_all(time, dt) {
        for (const entity of Entity.entities) entity.update(time, dt)
    }
}