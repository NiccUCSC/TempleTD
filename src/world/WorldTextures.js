class WorldTextures {

    static scene = null;

    static loadTextures(scene) {

        this.scene = scene;

        this.scene.load.path = "./assets/kenny/PNG/Retina/"
        this.loadTexture("ground", "towerDefense_tile236.png")
        this.loadTexture("sand", "towerDefense_tile098.png")
        this.loadTexture("spawnzone", "towerDefense_tile130.png")

        this.loadTexture("player", "towerDefense_tile245.png")
        this.loadTexture("turrettier1", "towerDefense_tile249.png")
        this.loadTexture("turrettier2", "towerDefense_tile250.png")
        this.loadTexture("rocket", "towerDefense_tile251.png")
        this.loadTexture("bullettier1", "towerDefense_tile275.png")
        this.loadTexture("bullettier2", "towerDefense_tile272.png")



        this.scene.load.path = "./assets/kenny/Tilesheet/"
        this.loadTexture("tileset", "towerDefense_tilesheet.png")

        // Preload UI assets
        this.scene.load.path = "./assets/kenny/PNG/Retina/"
        this.loadTexture("stone_icon", "towerDefense_tile137.png")
        this.loadTexture("bullettier1_icon", "towerDefense_tile275.png")
        this.loadTexture("bullettier2_icon", "towerDefense_tile272.png")
        
        this.scene.load.path = "./assets/images/"
        this.loadTexture("mana_icon", "Mana.png")
        this.loadTexture("hub", "TempleTier1.png")
        this.loadTexture("enemytier1", "EnemyTier1.png")
        this.loadTexture("enemytier2", "EnemyTier2.png")
        this.loadTexture("enemytier3", "EnemyTier3.png")

        this.loadTexture("manawell", "Elixir_Collector16.webp")
        this.loadTexture("stonepit", "Gold_Mine16.webp")
    }

    static loadTexture(key, filepath) {
        this.scene.load.image(key, filepath)
        WorldTextures[key] = this.scene.load.path + filepath;
    }
}