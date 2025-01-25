// class Entity extends Phaser.GameObjects.Sprite {
class Entity extends Phaser.Physics.Matter.Sprite {
    
    static tileSize = 64

    // class based default value of paramaters
    static params = {
        name: "",
        origin: new Phaser.Math.Vector2(0.5, 0.5),
        scale: 1,
        tileScale: 1,
        zdepth: 1,
        interactive: false,
        hovering: false,
        selected: false,
        health: 1e99,
        maxHealth: 1e99,
        healthRegenRate: 0,
        displaysHealth: true,
        healthbarOffset: new Phaser.Math.Vector2(-0.5, 0.6),
        healthbarSize: new Phaser.Math.Vector2(1, 0.1),
        alive: true,
        team: 0,
        base_dps: 0,
        dps_multiplier: 1,
        maxSpeed: 0,
        maxAcc: 0,
        frictionAlpha: 0,
        collisionShape: null,             // collisionShape = { type: "Circle", size: [1] }
    }

    static previewSprite = null
    static previewClass = null
    static previewValidPlacment = false
    static showPreview(scene, entityClass) {  // used to show where entity will go if placed
        this.clearPreview()

        console.log(entityClass)
        let mouseX = game.input.mousePointer.worldX
        let mouseY = game.input.mousePointer.worldY
        Entity.previewSprite = new Phaser.Physics.Matter.Sprite(scene.matter.world, mouseX, mouseY, entityClass.params.name)
        console.log(Entity.previewSprite)
        let scale = entityClass.params.scale
        scale = Array.isArray(scale) ? scale : [scale, scale]
        Entity.previewSprite.setDisplaySize(scale[0] * Entity.tileSize, scale[1] * Entity.tileSize)
        Entity.setShape(Entity.previewSprite, entityClass.params.collisionShape)
        Entity.previewSprite.setAlpha(0.4)
        Entity.previewSprite.collidingWith = new Set()
        Entity.previewSprite.onCollide = other => Entity.previewSprite.collidingWith.add(other)
        Entity.previewSprite.onSeperate = other => Entity.previewSprite.collidingWith.delete(other)
        Entity.previewSprite.setSensor(true)

        scene.add.existing(Entity.previewSprite)
        Entity.previewClass = entityClass
    }

    static clearPreview() {
        if (Entity.previewSprite) Entity.previewSprite.destroy()
        Entity.previewSprite = null
        Entity.previewClass = null
    }

    static checkPreviewPlacmentValid() {
        return Entity.previewSprite.collidingWith.size == 0
    }

    static placePreview(scene) {
        let mouseX = game.input.mousePointer.worldX
        let mouseY = game.input.mousePointer.worldY
        const newEntity = new Entity.previewClass(scene, mouseX / Entity.tileSize, mouseY / Entity.tileSize)
        scene.add.existing(newEntity)
    }

    // constructor(scene, x, y, name, scale, zdepth, interactive) {
    constructor(scene, x, y, params) {
        // console.log(`Creating ${name} at (${x}, ${y}) in scene {${scene}}`)
        params = {...Entity.params, ...params}

        super(scene.matter.world, x, y, params.name)
        this.scene = scene
        this.scene.add.existing(this);
        this.x = x * Entity.tileSize
        this.y = y * Entity.tileSize

        // load dictionary of paramaters and set dependent values
        Entity.loadParams(this, params)

        // physics
        this.pos = new Phaser.Math.Vector2(x, y)
        this.vel = new Phaser.Math.Vector2(0, 0)
        this.acc = new Phaser.Math.Vector2(0, 0)

        this.collidingWith = new Set()   // set of overlapping entities

        this.update_sprite()
    }

    unpackNamedParams(params) {
        Object.keys(params).forEach(key => {this[key] = params[key]})
    }

    static loadParams(entity, params) {
        entity.unpackNamedParams(params)

        entity.setOrigin(params.origin.x, params.origin.y)
        entity.setDepth(params.zdepth)

        if (Array.isArray(params.scale)) {
            entity.setDisplaySize(params.scale[0] * Entity.tileSize, params.scale[1] * Entity.tileSize)
            entity.tileScale = Math.min(...params.scale)
        } else {
            entity.setDisplaySize(params.scale * Entity.tileSize, params.scale * Entity.tileSize)
            entity.tileScale = params.scale
        }

        entity.health = clamp(params.health, 0, entity.maxHealth)
        if (entity.interactive) {
            entity.setInteractive();
            entity.hovering = params.hovering
            entity.selected = params.selected
            entity.on('pointerover', entity.pointerover, entity)
            entity.on('pointerout', entity.pointerout, entity)
            entity.scene.input.on('pointerdown', entity.pointerdown, entity)     // toggles when clicked, deselectes when background clicked
        }
        if (entity.displaysHealth) {
            entity.healthbarOffset = params.healthbarOffset.clone().scale(params.scale)
            entity.healthbarSize = params.healthbarSize.clone()
            entity.healthbarSize.x *= params.scale
            entity.healthBar = entity.scene.add.graphics().setDepth(100)
        }
        entity.maxAcc *= 1 + entity.frictionAlpha / (entity.frictionAlpha + entity.maxSpeed)

        Entity.setShape(entity, entity.collisionShape)
    }

    static setShape(matterSprite, shape) {
        if (shape) {
            switch(shape.type) {
            case "Circle":
                matterSprite.setCircle(shape.size * Entity.tileSize / 2)
                break
            case "Rect":
                break
            }
        }
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

        if (Entity.previewSprite) {
            let mouseX = game.input.mousePointer.worldX
            let mouseY = game.input.mousePointer.worldY
            Entity.previewSprite.setPosition(mouseX, mouseY).setOrigin(0.5, 0.5)
        }

        // if (Entity.previewSprite) console.log(Entity.previewSprite.collidingWith)
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