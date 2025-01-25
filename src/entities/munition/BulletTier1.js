class BulletTier1 extends Bullet {
    static params = {
        name: "bullettier1",
        scale: 1,
        maxHealth: 0.2,
        base_dps: 1.1,
        maxSpeed: 40,
        maxAcc: 10,
        shootCost: {"Bullet Tier 1": 1},  // ammo required to shoot
    }

    constructor(scene, x, y, params) {
        params = {...BulletTier1.params, ...params}
        super(scene, x, y, params)

        this.setCircle(0.25 * this.scale * Entity.tileSize / 2)
        this.setSensor(true);
    }
}