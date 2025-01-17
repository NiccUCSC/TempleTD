class Turret extends Entity {
    static target_types = ["enemy"]

    constructor(scene, x, y, targetRadius) {
        super(scene, x, y, "turret", 1, 10)

        targetRadius = targetRadius ?? 4

        this.targetRadius = targetRadius
        this.target = null


        this.setInteractive();
        this.hoverCircle = scene.add.graphics();
        this.hoverCircle.lineStyle(2, 0x00ff00, 1); // Green outline
        this.hoverCircle.strokeCircle(x * Entity.tileSize, y * Entity.tileSize, targetRadius * Entity.tileSize); // Circle radius 50
        this.hoverCircle.setVisible(false); // Initially hide the circle


    }

    findTarget() {
        let targets = Entity.entities.filter(entity => entity.name == 'player' && this.pos.distance(entity.pos) <= this.targetRadius)
        return targets.length ? targets[0] : null
    }

    update(time, dt) {
        this.hoverCircle.setVisible(this.hovering || this.selected)

        if (this.target && this.pos.distance(this.target.pos) > this.targetRadius) this.target = null

        if (!this.target || !Entity.is_alive(this.target)) this.target = this.findTarget()

        if (this.target) {
            let targetOffset = this.target.pos.clone().subtract(this.pos)
            this.rotation = targetOffset.angle() + Math.PI / 2
        }
    }
}