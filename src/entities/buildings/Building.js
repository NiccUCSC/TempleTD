class Building extends Entity {
    static params = {
        zdepth: 10,
        interactive: true,
        maxHealth: 10,
        healthRegenRate: 0.01,
        targetRadius: undefined,
        logisticRadius: undefined,
        production: null,     // { typs: rate }
        manaDrain: 0,       // cost to operate per second
        working: true,      // stops working without mana
        // collisionShape: { type: "Rect", size: [1, 1] }
        buildCost: {},
        isStatic: true,
    }

    constructor(scene, x, y, params) {
        params = {...Building.params, ...params}
        super(scene, x, y, params)
        Building.loadParams(this, params)
    }

    static loadParams(entity, params) {
        if (entity.targetRadius > 0) {
            entity.rangeCircle = entity.scene.add.graphics()
            entity.rangeCircle.fillStyle(0x00ff00, 0.1) // Green outline
            entity.rangeCircle.fillCircle(entity.x, entity.y, params.targetRadius * Entity.tileSize) // Circle radius 50
            entity.rangeCircle.setVisible(false) // Initially hide the circle
        }

        if (entity.logisticRadius > 0) {
            entity.logisticCircle = entity.scene.add.graphics()
            entity.logisticCircle.fillStyle(0x0000ff, 0.1) // Green outline
            entity.logisticCircle.fillCircle(entity.x, entity.y, params.logisticRadius * Entity.tileSize) // Circle radius 50
            entity.logisticCircle.setVisible(false) // Initially hide the circle
        }
        
        if (entity.production) entity.setSource()

        entity.setStatic(entity.isStatic)
    }

    getResources(request) {
        return WorldResources.getResources(request)
    }

    setSource() {
        Object.keys(this.production).forEach(key => {
            WorldResources.addSource(this, key, this.production[key])
        })
    }

    update(time, dt) {
        const showRanges = this.hovering || this.selected || World.altKey.isDown

        if (this.rangeCircle) this.rangeCircle.setVisible(showRanges)     // show targeting range if hovering or selected
        if (this.logisticCircle) this.logisticCircle.setVisible(showRanges)

        this.working = this.getResources({Mana: this.manaDrain * dt})
    }

    destroy() {
        if (this.production) WorldResources.removeSource(this)
        if (this.rangeCircle) this.rangeCircle.destroy()
        if (this.logisticCircle) this.logisticCircle.destroy()
        super.destroy()
    }
}