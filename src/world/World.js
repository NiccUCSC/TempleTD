class World {
    static PlayScene = null
    static UIScene = null

    static interactKey = null

    static PlayInit(PlayScene) {
        console.log("play")
        World.PlayScene = PlayScene
    }

    static UIInit(UIScene) {
        console.log("ui")
        World.UIScene = UIScene
    }

    static onInteractKey() {
        WorldShop.onInteractKey()
    }

    static onGameStart() {
        World.interactKey = World.PlayScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
        console.log(World.interactKey)
        World.interactKey.on("down", World.onInteractKey)
        WorldResources.onGameStart()
        WorldShop.onGameStart()
    }

    static update(time, dt) {
        WorldResources.update(time, dt)
        WorldShop.update(time, dt)
    }
}