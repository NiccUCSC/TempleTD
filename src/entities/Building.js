class Building extends Entity {
    static params = {
        zdepth: 10,
        interactive: true,
        maxHealth: 10,
        healthRegenRate: 0.01,
        targetRadius: 6,
        logisticRadius: 10,
    }

    constructor(scene, x, y, params) {
        params = {...Building.params, ...params}
        super(scene, x, y, params)
        Building.loadParams(this, params)
    }

    static loadParams(entity, params) {
        entity.hoverCircle = entity.scene.add.graphics();
        entity.hoverCircle.lineStyle(2, 0x00ff00, 1); // Green outline
        entity.hoverCircle.strokeCircle(entity.x, entity.y, params.targetRadius * Entity.tileSize); // Circle radius 50
        entity.hoverCircle.setVisible(false); // Initially hide the circle
    }

    update(time, dt) {
        this.hoverCircle.setVisible(this.hovering || this.selected)     // show targeting range if hovering or selected
    }
}