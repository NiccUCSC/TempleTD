class BulletTier2 extends Bullet {
    static params = {
        name: "bullettier2",
        scale: 1.5,
        maxHealth: 0.5,
        base_dps: 4,
        maxSpeed: 80,
        maxAcc: 10,
        shootCost: {"Bullet Tier 2": 1},  // ammo required to shoot
        collisionShape: { type: "Circle", size: 0.4 },
    }

    constructor(scene, x, y, params) {
        params = {...BulletTier2.params, ...params}
        super(scene, x, y, params)

        this.setSensor(true);
    }
}