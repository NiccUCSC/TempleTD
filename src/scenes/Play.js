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
        this.load.image("enemy", "towerDefense_tile134.png")
        this.load.image("player", "towerDefense_tile245.png")

        this.load.path = "./assets/kenny/Tilesheet/"
        this.load.image("tileset", "towerDefense_tilesheet.png")


    }

    create() {
        console.log('Play: create')
        this.cam = this.cameras.main
        this.cam.centerOn(0, 0)

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




        this.player = new Player(this, 0, 0);  // Position at (100, 100)
        this.hub = new Building(this, 0, 0, "hub", 3, 5)

        this.enemy = new Enemy(this, 2, 3)
    }

    update(time, dt) {
        Entity.update_all(time, dt)

        this.cam.setZoom(this.zoom(this.vertTiles))
        this.cam.startFollow(this.player.sprite)
        // Called every frame

    }
}