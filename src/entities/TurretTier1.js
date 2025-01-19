class TurretTier1 extends Turret {
    constructor(scene, x, y) {
        let params = {
            name: "turrettier1",
            targetRadius: 6,
            logisticRadius: 10,
            scale: 1,
            fireRate: 1,
            muzzleVel: 10,
            shootOffset: [new Phaser.Math.Vector2(0, -0.5)],
            projectileType: BulletTier1,
            maxHealth: 10,
            healthRegenRate: 0.01,
            base_dps: 1
        }
        super(scene, x, y, params)
    }
}