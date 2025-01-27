class EnemySpawnRing {
    static params = {
        radii: 50,
        averageDist: 50,
        enemyFrequencies: 0.1, // { EnemyTier1: 3, EnemyTier2: 0.5 }  object of classes and frequencies
        enemyTypes: EnemyTier1,       // ene
        baseSize: 1,
        bases: [],
    }

    constructor(radii, params) {
        params = {...EnemySpawnRing.params, ...params, ...{radii: radii}}
        Object.keys(params).forEach(key => {this[key] = params[key]})

        console.log(this)

        const baseFactor = clamp(gaussianRandom(1, 0.2), 0.5, 2)
        const numOfBases = Math.ceil(this.radii * 2 * Math.PI * baseFactor / this.averageDist)

        for (let i = 0; i < numOfBases; i++) {
            const r = clamp(gaussianRandom(this.radii, 20), this.radii - 10, this.radii + 40)
            const theta = Math.random() * 2 * Math.PI
            const x = r * Math.cos(theta)
            const y = r * Math.sin(theta)

            console.log(r, theta, x, y)

            this.bases.push(new EnemySpawnZone(World.PlayScene, x, y, {
                    spawnRate: this.enemyFrequencies,
                    spawnRadius: this.baseSize,
                    spawnType: this.enemyTypes,
                })
            )

        }
    }
}