class WorldShop {
    static shopItems = []

    static addShopItem(name, spriteIcon, params) {
        WorldShop[name] = new ShopItem(World.UIScene, name, spriteIcon, params)
    }

    static onGameStart() {
        console.log("Init game shop")
        this.addShopItem("Turret Tier 1", "turrettier1", {
            cost: { Stone: 20 }
        })
        this.addShopItem("Turret Tier 2", "turrettier2", {
            cost: { Stone: 400 }
        })
    }


}