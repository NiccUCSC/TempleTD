class Entity {
    constructor(scene, x, y, name, scale, zdepth) {
        this.scale = scale
        this.name = name
        this.zdepth = zdepth
        this.scene = scene;   // The scene this player is part of
        this.sprite = null;    // Player's sprite


        this.pos = new Phaser.Math.Vector2(x, y)
        this.vel = new Phaser.Math.Vector2(0, 0)
        this.acc = new Phaser.Math.Vector2(0, 0)

        this.sprite = this.scene.add.sprite(x, y, this.name);  // 'player' is the key to the preloaded image
        this.sprite.setOrigin(0.5, 0.5)
        this.sprite.setDepth(this.zdepth)
        this.sprite.setScale(this.scale)
    }


    update(time, dt) {
        return
    }
}