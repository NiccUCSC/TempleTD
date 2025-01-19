class Building extends Entity {
    constructor(scene, x, y, name, scale, zdepth, targetRadius, logisticRadius) {
        super(scene, x, y, name, scale, zdepth)

        this.targetRadius = targetRadius
        this.logisticRadius = logisticRadius

        this.setInteractive();
        this.hoverCircle = scene.add.graphics();
        this.hoverCircle.lineStyle(2, 0x00ff00, 1); // Green outline
        this.hoverCircle.strokeCircle(x * Entity.tileSize, y * Entity.tileSize, targetRadius * Entity.tileSize); // Circle radius 50
        this.hoverCircle.setVisible(false); // Initially hide the circle

    }

    update(time, dt) {

        this.hoverCircle.setVisible(this.hovering || this.selected)     // show targeting range if hovering or selected

    }
}