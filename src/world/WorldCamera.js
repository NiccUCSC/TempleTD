class WorldCamera {
    static MinZoom = 5
    static MaxZoom = 500

    static init(playScene) {
        console.log(playScene)
        WorldCamera.cam = playScene.cameras.main
        WorldCamera.cam.centerOn(0, 0)

        playScene.input.on('wheel', (pointer, dx, dy, dz, event) => {
            WorldCamera.vertTiles *= (pointer.deltaY > 0) ? 1.05 : 1 / 1.05
            WorldCamera.vertTiles = clamp(WorldCamera.vertTiles, WorldCamera.MinZoom, WorldCamera.MaxZoom)
        })

        WorldCamera.vertTiles = 25
        WorldCamera.zoom = tiles => 2 * game.config.height / 64 / tiles

    }

    static update(time, dt) {
        WorldCamera.cam.startFollow(World.PlayScene.player)
        WorldCamera.cam.setZoom(WorldCamera.zoom(WorldCamera.vertTiles))
    }
}