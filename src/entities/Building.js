class Building {
    constructor(scene, x, y, name, scale) {
        this.scale = scale ?? 1
        this.name = name
        this.scene = scene;   // The scene this player is part of
        this.sprite = null;    // Player's sprite


        this.pos = new Phaser.Math.Vector2(0, 0)
        this.create(x, y);
    }

    create(x, y) {
        this.sprite = this.scene.add.sprite(x, y, this.name);  // 'player' is the key to the preloaded image
        this.sprite.setOrigin(0.5, 0.5).setDepth(5).setScale(this.scale);
    }
}