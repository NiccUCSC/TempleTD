// class Entity extends Phaser.GameObjects.Sprite {
class Entity extends Phaser.Physics.Matter.Sprite {
    
    static tileSize = 64

    constructor(scene, x, y, name, scale, zdepth, interactive) {
        super(scene.matter.world, x, y, name);
        this.x = x * Entity.tileSize
        this.y = y * Entity.tileSize

        interactive = interactive ?? true // entities are interactive by default

        // console.log(`Creating ${name} at (${x}, ${y}) in scene {${scene}}`)
        scene.add.existing(this);

        this.scene = scene;
        this.setOrigin(0.5, 0.5)
        this.setDepth(zdepth)
        this.setScale(scale)
        this.name = name
        this.scale = scale
        this.zdepth = zdepth

        // physics
        this.pos = new Phaser.Math.Vector2(x, y)
        this.vel = new Phaser.Math.Vector2(0, 0)
        this.acc = new Phaser.Math.Vector2(0, 0)

        this.maxAcc = 0
        this.maxSpeed = 0
        this.frictionAlpha = 0
        this.collidingWith = new Set()   // set of overlapping entities

        // Health and stats
        this.displaysHealth = true
        this.maxHealth = 1
        this.health = this.maxHealth
        this.team = 0               // 0 is neutral, 1 is friendly, -1 is enemy
        this.base_dps = 0           // damage per second when colliding with other team
        this.dps_multiplier = 1     // scales the damage

        this.healthRegenRate = 0         // percent of max health gained per second
        this.healthbarOffset = new Phaser.Math.Vector2(-0.5, 0.6).scale(scale)
        this.healthbarSize = new Phaser.Math.Vector2(scale, 0.1)
        this.healthBar = this.scene.add.graphics().setDepth(100);
        this.alive = true

        // events
        if (interactive) {
            this.on('pointerover', this.pointerover, this)
            this.on('pointerout', this.pointerout, this)
            this.scene.input.on('pointerdown', this.pointerdown, this)     // toggles when clicked, deselectes when background clicked
        }

        this.hovering = false
        this.selected = false

        this.update_sprite()
    }

    // used to pass an object containing many paramaters
    loadParams(params) {
        this.name = params.name ?? ""
        this.scale = params.scale ?? 1
        this.zdepth = params.zdepth ?? 1
        this.interactive = params.interactive ?? false
        if (this.interactive) {
            this.hovering = params.hovering ?? false
            this.selected = params.selected ?? false
            this.on('pointerover', this.pointerover, this)
            this.on('pointerout', this.pointerout, this)
            this.scene.input.on('pointerdown', this.pointerdown, this)     // toggles when clicked, deselectes when background clicked
        }
        this.health = params.maxHealth ?? 1e99
        this.maxHealth = params.maxHealth ?? 1e99
        this.healthRegenRate = params.healthRegenRate ?? 0
        this.displaysHealth = params.displaysHealth ?? true
        this.alive = params.alive ?? true
        if (this.displaysHealth) {
            this.healthbarOffset = params.healthbarOffset ?? new Phaser.Math.Vector2(-0.5, 0.6).scale(this.scale)
            this.healthbarSize = params.healthbarSize ?? new Phaser.Math.Vector2(this.scale, 0.1)
            this.healthBar = this.scene.add.graphics().setDepth(100);
        }
        this.team = params.team ?? 0
        this.base_dps = params.base_dps ?? 0
        this.dps_multiplier = params.dps_multiplier ?? 1
        this.maxSpeed = params.maxSpeed ?? 0
        this.maxAcc = params.maxAcc ?? 0
        this.frictionAlpha = params.frictionAlpha ?? 0
        this.maxAcc *= 1 + this.frictionAlpha / (this.frictionAlpha + this.maxSpeed)
    }

    // untested code to update (a subset) of the paramaters of an entity
    updateParams(params) {
        Object.keys(params).forEach(key => {if (key in this) this[key] = params[key]})
    }

    // set functions
    initHealthAndStats(maxHealth, healthRegenRate, team, base_dps) {
        this.health = maxHealth
        this.maxHealth = maxHealth
        this.healthRegenRate = healthRegenRate
        this.team = team
        this.base_dps = base_dps ?? 0
    }

    initMovementConstants(maxSpeed, maxAcc, frictionAlpha) {
        this.maxSpeed = maxSpeed                                        // in tiles / second (determined by friction)
        this.maxAcc = maxAcc                                            // in tiles / second ^ 2
        this.frictionAlpha = frictionAlpha                              // friction force minimum
        this.maxAcc *= 1 + frictionAlpha / (frictionAlpha + maxSpeed)   // fix acceleration due to friction alpha
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

        this.setVelocity(this.vel.x * dt * Entity.tileSize, this.vel.y * dt * Entity.tileSize)
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

    update_health(dt) {
        for (let other of this.collidingWith) {
            if (other.team * this.team < 0) this.health -= other.base_dps * other.dps_multiplier * dt
        }
        this.health += this.maxHealth * this.healthRegenRate * dt
        this.health = Math.min(Math.max(this.health, 0), this.maxHealth)
        if (!this.health) this.alive = false
        if (!this.alive) {
            this.onDeath()  // respawning and game over occurs here
            if (!this.alive) this.destroy()
        }
        else if (this.displaysHealth) this.show_healthbar()
    }

    onDeath() { return }

    onCollide(other) {  // called whenever 2 physics bodies are overlapping
        // console.log(`Entity ${this.name} colliding with ${other.name}`)
        this.collidingWith.add(other)
    }

    onSeperate(other) {
        // console.log(`Entity ${this.name} seperating with ${other.name}`)
        this.collidingWith.delete(other)
    }

    update(time, dt) {
        return; // update function called every frame for every entity
    }

    static get_all_entites(scene) {
        return scene.children.getChildren().filter(obj => obj instanceof Entity)
    }

    static update_all(scene, time, dt) {
        let entites = Entity.get_all_entites(scene)

        for (const entity of entites) {                 // update positions and physics bodies
            entity.update(time, dt)
        }

        for (const entity of entites) {                 // update health
            entity.update_health(dt)                    // entities die here
        }
    }

    is_alive(entity) {
        return this.scene.children.getChildren().includes(entity)
    }

    // loops through all entities and returns the closest target in range
    find_closest_target(range, team, location) {
        location ??= this.pos

        let entities = Entity.get_all_entites(this.scene).filter(entity => entity.team == team)
        if (!entities.length) return null

        let dist2 = (a, b) => (a.x - b.x) ** 2 + (a.y - b.y) ** 2

        const closest = entities.reduce((curr, next) => { 
            return dist2(location, next.pos) < dist2(location, curr.pos) ? next : curr; 
        });

        return dist2(location, closest.pos) <= range ** 2 ? closest : null
    }

    destroy() {
        // console.log('destroy')
        for (let entity of Entity.get_all_entites(this.scene)) entity.collidingWith.delete(this)
        if (this.healthBar) this.healthBar.destroy()
        super.destroy()
    }
}