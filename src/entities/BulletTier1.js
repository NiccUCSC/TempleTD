class BulletTier1 extends Bullet {
    static target_types = ["enemy"]

    constructor(scene, x, y, muzzleSpeed, angle, lifetime = 3) {
        super(scene, x, y, "bullettier1", 1, muzzleSpeed, angle, lifetime)

        this.initHealthAndStats(0.2, 0, 2, 0.7)
        this.initMovementConstants(40, 10, 0)
        this.setCircle(0.25 * this.scale * Entity.tileSize / 2)
        this.setSensor(true);
        this.displaysHealth = false

        
        console.log(x, y, this.x, this.y)

    }

}