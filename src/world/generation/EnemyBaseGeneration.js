class EnemyBaseGeneration {
    static rings = []

    static generateRings() {
        this.rings = [
            new EnemySpawnRing(50, { enemyTypes: EnemyTier1, baseSize: 1 }),
            new EnemySpawnRing(100, { enemyTypes: EnemyTier2, baseSize: 1.5 }),
            new EnemySpawnRing(150, { enemyTypes: EnemyTier3, baseSize: 2 }),
        ]

    }
}