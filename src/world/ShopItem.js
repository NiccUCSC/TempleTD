class ShopItem {

    static shopItemTypes = 0

    static params = {
        name: "unnamed shop item",
        spriteIcon: "",
        entityClass: null,
        uiElement: null,
        tier: 0,
        quantity: 0,
        income: 0,
    }

    constructor(scene, name, spriteIcon, entityClass, params) {
        params = {...ShopItem.params, ...params, ...{name: name, spriteIcon: spriteIcon, entityClass: entityClass}}
        Object.keys(params).forEach(key => {this[key] = params[key]})

        if (!this.uiElement) this.uiElement = new UIShopItem(scene, {
            resourceName: this.spriteIcon,
            cost: this.cost,
            shopName: this.name,
            parent: this,
            relativePos: [ 0, 0 ],                              // in porportions of the screen
            unitOffset: [1, 1 + 6 * ShopItem.shopItemTypes],   // offset from relative position in units
            anchorPoint: [0, 0],                                // in units of unitScale
        })

        ShopItem.shopItemTypes++
    }

    update(time, dt) {
        // console.log(this.quantity, this.income)
        // this.uiElement.setQuantity(this.quantity, this.income)
    }

}