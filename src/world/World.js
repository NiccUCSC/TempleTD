class World {
    static PlayScene = null
    static UIScene = null

    static interactKey = null

    static PlayInit(PlayScene) {
        World.PlayScene = PlayScene
    }

    static UIInit(UIScene) {
        World.UIScene = UIScene
    }

    static onInteractKey() {
        WorldShop.onInteractKey()
    }

    static onGameStart() {
        World.interactKey = World.PlayScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
        World.debugKey = World.PlayScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z)
        
        World.upKey = World.PlayScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        World.downKey = World.PlayScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        World.leftKey = World.PlayScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        World.rightKey = World.PlayScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)


        console.log(World.interactKey)
        World.interactKey.on("down", World.onInteractKey)
        // World.debugKey.on("down", () => {
        //     game.config.physics.matter.debug = !game.config.physics.matter.debug

        //     console.log(`Debug = ${game.config.physics.matter.debug}`)
        // })
        WorldResources.onGameStart()
        WorldShop.onGameStart()
    }

    static update(time, dt) {
        WorldResources.update(time, dt)
        WorldShop.update(time, dt)
    }
}