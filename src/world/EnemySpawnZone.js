class EnemySpawnZone extends Entity {

    // Add enemy spawning with variance (some enemies have more health and move slower)
    constructor(scene, x, y, name, scale, zdepth) {
        super(scene, x, y, name, scale, zdepth)

        let spawnRadius = 2

        this.spawnRadius = spawnRadius

        this.hoverCircle = scene.add.graphics();
        this.hoverCircle.lineStyle(2, 0xff0000, 1); // Green outline
        this.hoverCircle.strokeCircle(x * Entity.tileSize, y * Entity.tileSize, spawnRadius * Entity.tileSize); // Circle radius 50

        this.maxHealth = 1e70
        this.health = this.maxHealth

        this.spawnRate = 2  // number of enemy spawns per second
        this.timeTillSpawn = 3

        this.setCircle(spawnRadius * Entity.tileSize)
        this.setSensor(true);

    }

    update(time, dt) {
        this.timeTillSpawn -= dt
        if (this.timeTillSpawn < 0) {
            this.timeTillSpawn += 1 / this.spawnRate

            const angle = Math.random() * 2 * Math.PI;
            // const r = this.spawnRadius * Math.sqrt(Math.random());
            const r = this.spawnRadius *Math.random();
            new Enemy(this.scene, this.pos.x + r * Math.cos(angle), this.pos.y + r * Math.sin(angle))
        }

    }

}