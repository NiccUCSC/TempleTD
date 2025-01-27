class WorldTerrain {
    static GenerateTerrain(scene) {
        // Tilemap ground
        this.map = scene.make.tilemap({
            width: 500,  // Map width in tiles
            height: 500, // Map height in tiles
            tileWidth: 64,  // Tile width in pixels
            tileHeight: 64, // Tile height in pixels
        })

        this.mapPixelWidth = this.map.width * this.map.tileWidth
        this.mapPixelHeight = this.map.height * this.map.tileHeight

        const tiles = this.map.addTilesetImage('tileset')

        this.groundLayer = this.map.createBlankLayer(0, tiles, 
                        -this.mapPixelWidth/2, -this.mapPixelHeight/2)
        this.groundLayer.fill(236, 0, 0, this.map.width, this.map.height)
        // groundLayer.fill(137, 0, 0, this.map.width, this.map.height)

        // Ore generation
        this.oreLayer = this.map.createBlankLayer(
            1, tiles, -this.mapPixelWidth/2, -this.mapPixelHeight/2)

        TerrainGeneration.generateOre(this.oreLayer)
        TerrainGeneration.generateTerrainBarrier(this.oreLayer)

        // Generate enemy bases
        EnemyBaseGeneration.generateRings()
    }

    
}