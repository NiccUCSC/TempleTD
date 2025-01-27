class TurretTier2 extends Turret {
    static params = {
        name: "turrettier2",
        targetRadius: 10,
        scale: 1.5,
        fireRate: 8,
        muzzleVel: 15,
        shootOffset: [new Phaser.Math.Vector2(0.1, -0.5), new Phaser.Math.Vector2(-0.1, -0.5)],
        projectileType: BulletTier2,
        maxHealth: 40,
        healthRegenRate: 0.01,
        base_dps: 4,
        manaDrain: 50,
        collisionShape: { type: "Circle", size: 1.8 },
        buildCost: { Stone: 400 },
    }

    constructor(scene, x, y, params) {
        params = {...TurretTier2.params, ...params}
        super(scene, x, y, params)
    }
}