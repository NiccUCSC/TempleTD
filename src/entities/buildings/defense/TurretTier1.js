class TurretTier1 extends Turret {
    static params = {
        name: "turrettier1",
        targetRadius: 6,
        scale: 1,
        fireRate: 1,
        muzzleVel: 6,
        shootOffset: [new Phaser.Math.Vector2(0, -0.5)],
        projectileType: BulletTier1,
        maxHealth: 10,
        healthRegenRate: 0.01,
        base_dps: 1,
        manaDrain: 10,
        collisionShape: { type: "Circle", size: 1.2 },
        buildCost: { Stone: 20 },
    }

    constructor(scene, x, y, params) {
        params = {...TurretTier1.params, ...params}
        super(scene, x, y, params)
    }
}