class UIShopItem extends UIElement {
    static params = {
        name: "shop item",
        resourceName: "",
        shopName: "SHOP ITEM NAME",
        resourceIcon: null,
        itemText: null,
        costText: null,
        pos: { x: 0.5, y: 0.5 },
        cost: { stone: 5, mana: 2 },
    }

    constructor(scene, params) {
        params = {...UIShopItem.params, ...params}
        super(scene, params)

        // Shop Item Icon
        this.itemIcon = this.scene.add.sprite(0, 0, this.resourceName)
        this.itemIcon.setOrigin(0, 0)

        // Shop Item Name
        this.itemText = new UIText(this.scene, {
            origin: [ 0, 0 ],
            relativePos: { other: this, dx: 8, dy: 0.5 },
            textString: this.shopName,
        })

        // Cost text
        this.costText = new UIText(this.scene, {
            origin: [ 0, 0 ],
            relativePos: { other: this, dx: 8, dy: 3.5 },
            textString: "Cost: ",
        })
    }

    update(time, dt) {
        this.itemText.setText(this.shopName)
        this.itemIcon.x = this.x
        this.itemIcon.y = this.y
        this.itemIcon.setDisplaySize(6 * UIElement.unit, 6 * UIElement.unit)
    }
}