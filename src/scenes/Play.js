class Play extends Phaser.Scene {

    cam

    vertTiles = 15 // number of tiles visable vertically
    
    zoom = (tiles) => { return 2 * game.config.height / 64 / tiles } 

    maxZoom = this.zoom(10)
    minZoom = this.zoom(80)


    constructor() {
        super('playScene')
        console.log('Play: constructor')
    }

    init() {
        console.log('Play: init')
    }

    preload() {
        this.load.path = "./assets/kenny/PNG/Default size/"
        this.load.image("hub", "towerDefense_tile180.png")
        this.load.image("ground", "towerDefense_tile236.png")
        this.load.image("sand", "towerDefense_tile098.png")
        this.load.image("enemy", "towerDefense_tile134.png")
        this.load.image("player", "towerDefense_tile245.png")
        this.load.image("turret", "towerDefense_tile249.png")
        this.load.image("rocket", "towerDefense_tile251.png")
        this.load.image("bullet", "towerDefense_tile272.png")

        this.load.path = "./assets/kenny/Tilesheet/"
        this.load.image("tileset", "towerDefense_tilesheet.png")
    }

    create() {
        console.log('Play: create')
        // Camera
        this.cam = this.cameras.main
        this.cam.centerOn(0, 0)

        // Tilemap ground
        this.map = this.make.tilemap({
            width: 256,  // Map width in tiles
            height: 256, // Map height in tiles
            tileWidth: 64,  // Tile width in pixels
            tileHeight: 64, // Tile height in pixels
        });

        this.mapPixelWidth = this.map.width * this.map.tileWidth;
        this.mapPixelHeight = this.map.height * this.map.tileHeight;

        const tiles = this.map.addTilesetImage('tileset')
        const layer = this.map.createBlankLayer(0, tiles, 
                        -this.mapPixelWidth/2, -this.mapPixelHeight/2);


        this.map.fill(236, 0, 0, this.map.width, this.map.height);  // Fill the entire map with tile index 0

        // physics
        this.bulletsGroup = this.matter.world.nextGroup(false)
        this.buildingsGroup = this.matter.world.nextGroup(false)
        this.movingGroup = this.matter.world.nextGroup(true)

        this.matter.world.disableGravity()
        // this.matter.world.defaultCollisionFilter.friction = 0;


        // this.matter.world.on('collisionstart', (event) => {
        //     event.pairs.forEach(pair => {
        //         pair.bodyA.gameObject.onCollide(pair.bodyB.gameObject)
        //         pair.bodyB.gameObject.onCollide(pair.bodyA.gameObject)
        //     });
        // });

        // this.matter.world.on('collisionend', (event) => {
        //     event.pairs.forEach(pair => {
        //         pair.bodyA.gameObject.onSeperate(pair.bodyB.gameObject)
        //         pair.bodyB.gameObject.onSeperate(pair.bodyA.gameObject)
        //     });
        // });

        // Entities
        this.player = new Player(this, -5, 0);  // Position at (100, 100)
        this.hub = new Building(this, 0, 0, "hub", 0.5, 5)
        this.enemy = new Enemy(this, 2, 3)
        this.turret = new Turret(this, -5, -1)
        // this.turret = new Turret(this, 5, -1)
    }

    update(time, dt) {
        Entity.update_all(this, time / 1000, dt / 1000)

        this.cam.setZoom(this.zoom(this.vertTiles))
        this.cam.startFollow(this.player)
    }
}