class WorldShop {
    static shopItems = []
    static selected = null

    static addShopItem(name, spriteIcon, entityClass, params) {
        WorldShop[name] = new ShopItem(World.UIScene, name, spriteIcon, entityClass, params)
    }

    static setSelected(shopItem) {
        if (shopItem == WorldShop.selected) shopItem = null;
        if (WorldShop.selected != null) WorldShop.selected.deselect()
        WorldShop.selected = shopItem
        if (WorldShop.selected != null) {
            WorldShop.selected.select()
            Entity.showPreview(World.PlayScene, shopItem.entityClass)
        }
    }

    static setDeselected(shopItem) { // TODO is this function nececary?
        if (WorldShop.selected == shopItem) WorldShop.selected = null
    }

    static onGameStart() {
        this.addShopItem("Turret Tier 1", "./assets/kenny/PNG/Retina/towerDefense_tile249.png", TurretTier1, { // turrettier1
            cost: { Stone: 20 }
        })
        this.addShopItem("Turret Tier 2", "./assets/kenny/PNG/Retina/towerDefense_tile250.png", TurretTier2, { // turrettier2
            cost: { Stone: 400 } 
        })
    }

    static onInteractKey() {
        if (WorldShop.selected) {
            console.log("Placing")

            console.log("Check if entity can be placed (not colliding with existing entitites)")

            console.log("Drain resources")
    
            console.log("Place entity")
            Entity.placePreview(World.PlayScene)
        }
    }


    static update(time, dt) {
        // console.log("Shop update")
        if (!WorldShop.selected) Entity.clearPreview()
    }
}