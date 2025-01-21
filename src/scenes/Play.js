class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
        console.log('Play: constructor')
    }

    init() {
        console.log('Play: init')
        this.vertTiles = 25
        this.zoom = tiles => 2 * game.config.height / 64 / tiles

    }

    create() {
        console.log('Play: create')
        // Camera
        this.cam = this.cameras.main
        this.cam.centerOn(0, 0)

        this.input.on('wheel', (pointer, dx, dy, dz, event) => {
            if (pointer.deltaY < 0) {
                this.vertTiles *= 1.02
            } else {
                this.vertTiles /= 1.02
            }
            this.vertTiles = clamp(this.vertTiles, 5, 40)
        })

        // Tilemap ground
        this.map = this.make.tilemap({
            width: 256,  // Map width in tiles
            height: 256, // Map height in tiles
            tileWidth: 64,  // Tile width in pixels
            tileHeight: 64, // Tile height in pixels
        })

        this.mapPixelWidth = this.map.width * this.map.tileWidth
        this.mapPixelHeight = this.map.height * this.map.tileHeight

        const tiles = this.map.addTilesetImage('tileset')

        const groundLayer = this.map.createBlankLayer(0, tiles, 
                        -this.mapPixelWidth/2, -this.mapPixelHeight/2)
        groundLayer.fill(236, 0, 0, this.map.width, this.map.height)
        // groundLayer.fill(137, 0, 0, this.map.width, this.map.height)

        // Ore generation
        const oreLayer = this.map.createBlankLayer(1, tiles, 
                            -this.mapPixelWidth/2, -this.mapPixelHeight/2,
                            )
        TerrainGeneration.generateOre(oreLayer)

        

        // physics
        this.bulletsGroup = this.matter.world.nextGroup(false)
        this.buildingsGroup = this.matter.world.nextGroup(false)
        this.movingGroup = this.matter.world.nextGroup(true)

        this.matter.world.disableGravity()
        // this.matter.world.engine.timing.timeScale = 0.5  // No updates will occur

        // this.matter.world.defaultCollisionFilter.friction = 0


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
        this.turret1 = new TurretTier1(this, -3, -4)
        this.turret2 = new TurretTier2(this, 3, -4)

        this.t1SpawnZone = new EnemySpawnZone(this, -5, -20, {
            spawnRate: 3,
            spawnRadius: 1,
            spawnType: EnemyTier1,
        })

        this.t2SpawnZone = new EnemySpawnZone(this, 5, -20, {
            spawnRate: .5,
            spawnRadius: 2,
            spawnType: EnemyTier2,
        })


        this.t3SpawnZone = new EnemySpawnZone(this, 0, -25, {
            spawnRate: .02,
            spawnRadius: 3,
            spawnType: EnemyTier3,
        })
    }

    update(time, dt) {
        Entity.update_all(this, time / 1000, dt / 1000)

        this.cam.setZoom(this.zoom(this.vertTiles))
        this.cam.startFollow(this.player)
    }
}