class WorldShop {
    static shopItems = []
    static selected = null

    static addShopItem(name, spriteIcon, entityClass, params) {
        WorldShop[name] = new ShopItem(World.UIScene, name, spriteIcon, entityClass, params)
    }

    static setSelected(shopItem) {
        console.log("Setting", shopItem.name)
        WorldShop.selected = shopItem
    }

    static setDeselected(shopItem) {
        console.log("Unsetting", shopItem.name)

        if (WorldShop.selected == shopItem) WorldShop.selected == null
    }

    static onGameStart() {
        console.log("Init game shop")
        this.addShopItem("Turret Tier 1", "turrettier1", TurretTier1, {
            cost: { Stone: 20 }
        })
        this.addShopItem("Turret Tier 2", "turrettier2", TurretTier2, {
            cost: { Stone: 400 }
        })
    }

    static update(time, dt) {
        // console.log("Shop update")
        const selected = WorldShop.selected // type: ShopItem
        if (selected) {
            const entityClass = selected.entityClass
            entityClass.showPreview()
        }
    }
}