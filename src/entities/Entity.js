// class Entity extends Phaser.GameObjects.Sprite {
class Entity extends Phaser.Physics.Matter.Sprite {
    
    static tileSize = 64

    // static entities = []    // list of all entity instances

    static debugMode = false

    constructor(scene, x, y, name, scale, zdepth, interactive) {
        super(scene.matter.world, x, y, name);
        this.x = x * Entity.tileSize
        this.y = y * Entity.tileSize

        interactive = interactive ?? true // entities are interactive by default

        // console.log(`Creating ${name} at (${x}, ${y}) in scene {${scene}}`)
        // Entity.entities.push(this)
        scene.add.existing(this);

        this.team = 0               // 0 is neutral, 1 is friendly, -1 is enemy
        this.base_dps = 0           // damage per second when colliding with other team
        this.collidingWith = null   // set of overlapping entities

        this.scene = scene;
        this.setOrigin(0.5, 0.5)
        this.setDepth(zdepth)
        this.setScale(scale)
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

        // Health and stats
        this.displaysHealth = true
        this.maxHealth = 10
        this.health = this.maxHealth * 0.8
        this.healthRegenRate = 0.01         // 1% per second
        this.healthbarOffset = new Phaser.Math.Vector2(-0.5, 0.6).scale(scale)
        this.healthbarSize = new Phaser.Math.Vector2(scale, 0.1)
        this.healthBar = this.scene.add.graphics().setDepth(zdepth);
        this.alive = true

        // events
        if (interactive) {
            this.on('pointerover', this.pointerover, this);
            this.on('pointerout', this.pointerout, this);
            this.scene.input.on('pointerdown', this.pointerdown, this); // toggles when clicked, deselectes when background clicked
        }

        this.hovering = false
        this.selected = false
    }

    enablePhysics(shape, size) {
        switch (shape) {
        case 'circle':
            this.body = this.scene.matter.add.circle(this.x, this.y, size * Entity.tileSize / 2, {
                isStatic: false, // Make the body immovable
                restitution: 0.8, // Add bounciness
            });
            break
        case 'rect':
            break

        }
        this.body.entity = this
        // this.body.onCollideCallback = (event) => { 
        //     this.onCollide((event.bodyA.entity == this) ? event.bodyB.entity : event.bodyA.entity)
        // }
        this.collidingWith = new Set()
    }

    // event functions
    pointerover() { this.hovering = true }

    pointerout() { this.hovering = false }

    pointerdown() { this.selected = this.hovering && !this.selected }


    move_with_force(force, dt) {        
        let speed = this.vel.length()
        let frictionMag = this.maxAcc * (speed + this.frictionAlpha) / (this.maxSpeed + this.frictionAlpha)
        let friction = this.vel.clone().setLength(frictionMag).scale(-1)

        if (!(force.x || force.y) && friction.length() * dt >= this.vel.length()) this.vel.setLength(0)
        else this.vel.add(force.add(friction).scale(dt))

        this.setVelocity(this.vel.x, this.vel.y)

        // this.pos.add(this.vel.clone().scale(dt))
    }

    show_healthbar() {
        this.healthBar.clear();

        if (this.health == this.maxHealth) return

        let screenPos = new Phaser.Math.Vector2(this.x, this.y).add(this.healthbarOffset.clone().scale(Entity.tileSize))
        this.healthBar.fillStyle(0x555555, this.zdepth); // Gray background color
        this.healthBar.fillRect(screenPos.x, screenPos.y, this.healthbarSize.x * Entity.tileSize, this.healthbarSize.y * Entity.tileSize);

        this.healthBar.fillStyle(0x00FF00, this.zdepth); // Green health
        this.healthBar.fillRect(screenPos.x, screenPos.y, this.healthbarSize.x * (this.health / this.maxHealth) * Entity.tileSize, this.healthbarSize.y * Entity.tileSize);
    }

    update_sprite(min_vel) {
        this.pos.x = this.x / Entity.tileSize
        this.pos.y = this.y / Entity.tileSize
        if (this.vel.length() > (min_vel ?? 0)) this.rotation = this.vel.angle()


    }

    update_physics() {
        this.body.position.x = this.x
        this.body.position.y = this.y
    }

    update_health(dt) {
        if (this.collidingWith) for (let other of this.collidingWith) {
            if (other.team != this.team) this.health -= other.base_dps * dt
        }
        this.health = Math.min(Math.max(this.health, 0), this.maxHealth)
        if (!this.health) this.alive = false
        if (!this.alive) this.destroy()
    }

    // onCollide(other) {  // called whenever 2 physics bodies are overlapping
    //     console.log(`Entity ${this.name} colliding with ${other.name}`)
    //     this.collidingWith.add(other)
    // }

    // onSeperate(other) {
    //     console.log(`Entity ${this.name} seperating with ${other.name}`)
    //     this.collidingWith.delete(other)
    // }

    update(time, dt) {
        return; // update function called every frame for every entity
    }

    static get_all_entites(scene) {
        return scene.children.getChildren().filter(obj => obj instanceof Phaser.Physics.Matter.Sprite)
    }

    static update_all(scene, time, dt) {
        let entites = Entity.get_all_entites(scene)

        for (const entity of entites) {                 // update positions and physics bodies
            entity.update(time, dt)
            if (entity.body) entity.update_physics(time, dt)
        }

        for (const entity of entites) {                 // update health and status effects
            entity.update_health(dt)
            if (entity.displaysHealth) entity.show_healthbar()
        }
    }

    is_alive(entity) {
        return this.scene.children.getChildren().includes(entity)
    }

    destroy() {
        // console.log('destroy')


        let scene = this.scene

        // console.log(Entity.get_all_entites(scene))
        if (this.healthBar) {
            this.healthBar.destroy()
            this.healthBar = null
        }
        this.scene.children.remove(this)

        // console.log("here")
        super.destroy()

        // console.log(Entity.get_all_entites(scene))

    }
}