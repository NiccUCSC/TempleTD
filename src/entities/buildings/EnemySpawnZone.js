class EnemySpawnZone extends Building {
    static params = {
        name: "spawnzone",
        maxHealth: 100,
        healthRegenRate: 0.05,
        team: -1,
        base_dps: 10,
        spawnRate: 1,
        spawnRadius: 1,
        spawnType: EnemyTier1,
        timeTillSpawn: 0,
    }

    // Add enemy spawning with variance (some enemies have more health and move slower)
    constructor(scene, x, y, params) {
        params = {...EnemySpawnZone.params, ...params}
        params.scale = 2.5 * params.spawnRadius
        super(scene, x, y, params)
        EnemySpawnZone.loadParams(this, params)
    }

    static loadParams(entity, params) {
        entity.hoverCircle = entity.scene.add.graphics();
        entity.hoverCircle.lineStyle(2, 0xff0000, 1); // Green outline
        entity.hoverCircle.strokeCircle(entity.x, entity.y, params.spawnRadius * Entity.tileSize); // Circle radius 50

        entity.setCircle(params.spawnRadius * Entity.tileSize)
        entity.setSensor(true)
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