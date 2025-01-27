class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
        World.PlayInit(this)
    }

    init() {
        World.onGameStart()
    }

    create() {
        World.PlayCreate(this)

        this.matter.world.disableGravity()

        this.matter.world.on('collisionstart', (event) => {
            event.pairs.forEach(pair => {
                pair.bodyA.gameObject.onCollide(pair.bodyB.gameObject)
                pair.bodyB.gameObject.onCollide(pair.bodyA.gameObject)
            })
        })

        this.matter.world.on('collisionend', (event) => {
            event.pairs.forEach(pair => {
                if (pair.bodyA.gameObject && pair.bodyB.gameObject) {
                    pair.bodyA.gameObject.onSeperate(pair.bodyB.gameObject)
                    pair.bodyB.gameObject.onSeperate(pair.bodyA.gameObject)
                }
            })
        })

        // Entities
        this.player = new Player(this, 0, -3)  // Position at (100, 100)
        this.hub = new Hub(this, 0, 0)
    }

    update(time, dt) {
        time /= 1000
        dt /= 1000

        Entity.update_all(this, time, dt)
        World.update(time, dt) 


    }
}