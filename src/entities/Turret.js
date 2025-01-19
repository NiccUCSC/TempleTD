class Turret extends Building {
    static target_types = ["enemy"]

    constructor(scene, x, y, targetRadius) {
        super(scene, x, y, "turret", 1, 10)

        targetRadius = targetRadius ?? 6
    
        this.team = 1

        this.targetRadius = targetRadius    
        this.target = null                  // entity aiming for
        this.fireRate = 10                   // shots per second
        this.timeTillShoot = 1              // setup time before shooting and time between shots
        this.muzzleVel = 8                 // speed of the bullet in tiles / second when initially shot
        this.shootOffset = new Phaser.Math.Vector2(0, -0.4)
        this.shootPos = this.pos.clone().add(this.shootOffset)  // location of the end of the barrel

        this.setInteractive();
        this.hoverCircle = scene.add.graphics();
        this.hoverCircle.lineStyle(2, 0x00ff00, 1); // Green outline
        this.hoverCircle.strokeCircle(x * Entity.tileSize, y * Entity.tileSize, targetRadius * Entity.tileSize); // Circle radius 50
        this.hoverCircle.setVisible(false); // Initially hide the circle

        this.setCircle(Entity.tileSize / 2).setStatic(true)
    }

    findTarget() {
        let gameObjects = this.scene.children.getChildren();
        let targets = gameObjects.filter(entity => entity.name == 'enemy' && this.pos.distance(entity.pos) <= this.targetRadius)
        return targets.length ? targets[0] : null
    }

    targetInterceptPos() {  // approximate location for intercept between bullet and target
        let targetDistance = this.shootPos.distance(this.target.pos)
        let bulletInterceptTime = targetDistance / this.muzzleVel
        return this.target.pos.clone().add(this.target.vel.clone().scale(bulletInterceptTime))
    }

    update(time, dt) {

        this.hoverCircle.setVisible(this.hovering || this.selected)     // show targeting range if hovering or selected

        if (this.target && this.pos.distance(this.target.pos) > this.targetRadius) this.target = null   // unfollow targets out of range

        if (!this.target || !this.is_alive(this.target)) this.target = this.findTarget()              // find new target if current is not present

        if (this.target) {                                                                              // rotate towards target
            this.shootPos = this.shootOffset.clone().rotate(this.rotation).add(this.pos)                // update shoot pos based on current pos and rotation
            let targetOffset = this.targetInterceptPos().subtract(this.shootPos)
            this.rotation = targetOffset.angle() + Math.PI / 2
        }

        if (this.timeTillShoot > 0) this.timeTillShoot -= dt    // always prepare next shot
        if (this.timeTillShoot <= 0 && this.target) {           // shoot when target present
            this.timeTillShoot += 1 / this.fireRate
            new Bullet(this.scene, this.shootPos.x, this.shootPos.y, this.muzzleVel, this.rotation - Math.PI / 2)
        }
    }
}