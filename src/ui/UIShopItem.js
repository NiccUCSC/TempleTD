class UIShopItem extends UIElement {
    static params = {
        name: "shop item",
        resourceName: "",
        shopName: "SHOP ITEM NAME",
        cost: {},
        parent: null,       // ShopItem instance 
        unitScale: [20, 6],     // in units
        interactive: true,
        resourceIcon: null,
        itemText: null,
        costText: null,
        pos: { x: 0.5, y: 0.5 },
        cost: { stone: 15 },
    }

    constructor(scene, params) {
        params = {...UIShopItem.params, ...params}
        super(scene, params)
        this.name += ": " + this.shopName

        this.resourceIcon = this.scene.add.sprite(0, 0, this.resourceName)
        this.resourceIcon.setOrigin(0, 0)
        this.resourceIcon.setDisplaySize(5, 5)
        this.resourceIcon.setPosition(0.5, 0.5)
        this.add(this.resourceIcon)

        this.itemText = new UIText(this.scene, {
            textString: "item text",
            relativePos: [0, 0],        // in screen width and height porporitons
            unitOffset: [6, 0.5],
            unitScale: [13.5, 3],          // in units
            anchorPoint: [0, 0],
        })
        this.add(this.itemText)

        this.costText = new UIText(this.scene, {
            textString: "cost text",
            relativePos: [0, 0],        // in screen width and height porporitons
            unitOffset: [6, 3.5],
            unitScale: [13.5, 2],          // in units
            anchorPoint: [0, 0],
        })
        this.add(this.costText)

        this.itemText.setText(this.shopName)
        this.costText.setShopCostText(this.cost)
    }

    onSelect() {
        WorldShop.setSelected(this.parent)
    }

    onDeselect() {
        WorldShop.setDeselected(this.parent)
    }

    update(time, dt) {
        if (this.selected) this.rect.setFillStyle(0x2ecc71)
        else this.rect.setFillStyle(0x3498db)
    }
}