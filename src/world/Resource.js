class Resource {
    static resourceTypes = 0

    static params = {
        name: "unnamed resource",
        spriteIcon: "",
        uiElement: null,
        tier: 0,
        quantity: 0,
        income: 0,
        dependencies: {},   // any building that produces or removes resources
    }

    constructor(scene, name, spriteIcon, params) {
        params = {...Resource.params, ...params, ...{name: name, spriteIcon: spriteIcon}}
        Object.keys(params).forEach(key => {this[key] = params[key]})

        if (!this.uiElement) this.uiElement = new UIResource(scene, {
            resourceName: this.spriteIcon, 
            relativePos: [ 1, 0 ],                              // in porportions of the screen
            unitOffset: [-1, 1 + 4 * Resource.resourceTypes],   // offset from relative position in units
            anchorPoint: [1, 0],                                // in units of unitScale
        })
        
        Resource.resourceTypes++
    }

    update(time, dt) {
        // console.log(this.quantity, this.income)
        this.uiElement.setQuantity(this.quantity, this.income)
    }
}