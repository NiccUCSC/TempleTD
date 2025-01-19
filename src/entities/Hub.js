class Hub extends Building {

    constructor(scene, x, y) {
        super(scene, x, y, "hub", 4, 10)    
        this.team = 1

        this.logisticsRadius = 1

        this.setInteractive();
        this.hoverCircle = scene.add.graphics();
        this.hoverCircle.lineStyle(2, 0xff0000, 1);     // red outline for logistics radius
        this.hoverCircle.strokeCircle(x * Entity.tileSize, y * Entity.tileSize, this.logisticsRadius * Entity.tileSize); // Circle radius 50
        this.hoverCircle.setVisible(false); // Initially hide the circle

        this.healthRegenRate = 0.01

        this.setRectangle(0.8 * this.scale * Entity.tileSize, 0.8 * this.scale * Entity.tileSize).setStatic(true)
    }

    findTarget() {
        let gameObjects = this.scene.children.getChildren();
        let targets = gameObjects.filter(entity => entity.name == 'enemy' && this.pos.distance(entity.pos) <= this.targetRadius)
        return targets.length ? targets[0] : null
    }
}