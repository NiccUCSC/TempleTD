class Entity extends Phaser.GameObjects.Sprite {
    
    static tileSize = 64

    static entities = []    // list of all entity instances

    static debugMode = false

    constructor(scene, x, y, name, scale, zdepth) {
        super(scene, x, y, name);

        console.log(`Creating ${name} at (${x}, ${y})`)
        Entity.entities.push(this)
        scene.add.existing(this);

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

        // events
        this.on('pointerover', this.pointerover, this);
        this.on('pointerout', this.pointerout, this);
        this.scene.input.on('pointerdown', this.pointerdown, this); // toggles when clicked, deselectes when background clicked

        this.hovering = false
        this.selected = false
    }

    enablePhysics(shape, size) {
        // this.collider = this.scene.matter.world.add(this)



        // switch (shape) {
        // case 'rect':
        //     this.body.setSize(size.x * Entity.tileSize, size.y * Entity.tileSize)
        //     break
        // case 'circ':
        //     this.collider.setBody({
        //         type: 'circle',
        //         radius: size * Entity.tileSize
        //     });            
        //     break
        // }

        // console.log(`Collider = ${this.collider}`)
        // console.log(this.collider)
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

        this.pos.add(this.vel.clone().scale(dt))
    }

    show_healthbar() {
        this.healthBar.clear();

        // if (self.health == self.maxHealth) return

        let screenPos = this.pos.clone().add(this.healthbarOffset).scale(Entity.tileSize)
        this.healthBar.fillStyle(0x555555, this.zdepth); // Gray background color
        this.healthBar.fillRect(screenPos.x, screenPos.y, this.healthbarSize.x * Entity.tileSize, this.healthbarSize.y * Entity.tileSize);

        this.healthBar.fillStyle(0x00FF00, this.zdepth); // Green health
        this.healthBar.fillRect(screenPos.x, screenPos.y, this.healthbarSize.x * (this.health / this.maxHealth) * Entity.tileSize, this.healthbarSize.y * Entity.tileSize);
    }

    update_sprite(min_vel) {
        this.x = this.pos.x * Entity.tileSize
        this.y = this.pos.y * Entity.tileSize
        if (this.vel.length() > (min_vel ?? 0)) this.rotation = this.vel.angle()
    }

    update(time, dt) {
        return; // update function called every frame for every entity
    }

    static update_all(time, dt) {
        for (const entity of Entity.entities) {
            entity.update(time, dt)
            if (entity.displaysHealth) entity.show_healthbar()
        }
    }

    static is_alive(entity) {
        return Entity.entities.includes(entity)
    }

    static kill(entity) {
        // console.log(`Killing ${entity.name} at (${entity.pos.x}, ${entity.pos.y})`)

        Entity.entities = Entity.entities.filter(item => item !== entity);

        entity.destroy()
        entity = null

        // console.log(Entity.entities.includes(entity))
    }

    destroy() {
        super.destroy()
        
    }
}