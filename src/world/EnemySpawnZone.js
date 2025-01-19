class EnemySpawnZone extends Entity {

    // Add enemy spawning with variance (some enemies have more health and move slower)
    constructor(scene, x, y, spawnRate = 1, enemyType = EnemyTier1, spawnRadius = 1) {
        super(scene, x, y, "spawnzone", spawnRadius * 2, 10)

        this.hoverCircle = scene.add.graphics();
        this.hoverCircle.lineStyle(2, 0xff0000, 1); // Green outline
        this.hoverCircle.strokeCircle(x * Entity.tileSize, y * Entity.tileSize, spawnRadius * Entity.tileSize); // Circle radius 50

        this.maxHealth = 1e70
        this.health = this.maxHealth

        this.spawnRate = spawnRate          // number of enemy spawns per second
        this.spawnType = enemyType          // class of enemies spawning
        this.spawnRadius = spawnRadius
        this.timeTillSpawn = 0      // time till next spawn

        this.setCircle(spawnRadius * Entity.tileSize)
        this.setSensor(true);

    }

    update(time, dt) {
        this.timeTillSpawn -= dt
        if (this.timeTillSpawn < 0) {
            this.timeTillSpawn += 1 / this.spawnRate

            const angle = Math.random() * 2 * Math.PI;
            // const r = this.spawnRadius * Math.sqrt(Math.random());
            const r = this.spawnRadius * Math.random();

            new this.spawnType(this.scene, this.pos.x + r * Math.cos(angle), this.pos.y + r * Math.sin(angle))
        }

    }

}