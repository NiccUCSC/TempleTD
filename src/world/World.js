class World {
    static PlayScene = null
    static UIScene = null

    static PlayInit(PlayScene) {
        console.log("play")
        World.PlayScene = PlayScene
    }

    static UIInit(UIScene) {
        console.log("ui")
        World.UIScene = UIScene
    }

    static onGameStart() {
        WorldResources.onGameStart()
        WorldShop.onGameStart()
    }
}