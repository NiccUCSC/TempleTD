class BulletTier2 extends Bullet {
    static target_types = ["enemy"]

    constructor(scene, x, y, muzzleSpeed, angle, lifetime = 3) {
        super(scene, x, y, "bullettier2", 1.5, muzzleSpeed, angle, lifetime)

        this.initHealthAndStats(.5, 0, 2, 4)
        this.initMovementConstants(80, 10, 0)
        this.setCircle(0.25 * this.scale * Entity.tileSize / 2)
        this.setSensor(true);
        this.displaysHealth = false

        console.log(x, y, this.x, this.y)

    }

}