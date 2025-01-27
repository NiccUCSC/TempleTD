class EnemyBaseGeneration {
    static rings = []

    static generateRings() {
        this.rings = [
            new EnemySpawnRing(30, { enemyTypes: EnemyTier1, baseSize: 1 }),
            new EnemySpawnRing(60, { enemyTypes: EnemyTier2, baseSize: 1.5 }),
            new EnemySpawnRing(90, { enemyTypes: EnemyTier3, baseSize: 2 }),
            new EnemySpawnRing(120, { enemyTypes: EnemyTier4, baseSize: 4 }),
            new EnemySpawnRing(150, { enemyTypes: EnemyTier5, baseSize: 6 }),
        ]

    }
}