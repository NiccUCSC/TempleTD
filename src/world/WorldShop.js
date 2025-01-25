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
        this.addShopItem("Turret Tier 1", "./assets/kenny/PNG/Retina/towerDefense_tile249.png", TurretTier1)
        this.addShopItem("Turret Tier 2", "./assets/kenny/PNG/Retina/towerDefense_tile250.png", TurretTier2)
        this.addShopItem("Mana Well", "./assets/images/Elixir_Collector16.webp", ManaWell)
        this.addShopItem("Stone Pit", "./assets/images/Gold_Mine16.webp", StonePit)
    }

    static onInteractKey() {
        if (WorldShop.selected) {
            // Check valid placment
            if (!Entity.checkPreviewPlacmentValid()) return

            // Drain resources
            if (!WorldResources.getResources(Entity.previewClass.params.buildCost)) return
    
            // Place entity
            Entity.placePreview(World.PlayScene)
        }
    }

    static update(time, dt) {
        // console.log("Shop update")
        if (!WorldShop.selected) Entity.clearPreview()
    }
}