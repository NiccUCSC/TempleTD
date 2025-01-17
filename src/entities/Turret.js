class Turret extends Entity {
    static target_types = ["enemy"]

    constructor(scene, x, y, targetRadius) {
        super(scene, x, y, "turret", 1, 10)

        targetRadius = targetRadius ?? 5

        this.targetRadius = targetRadius



        this.setInteractive();
        this.hoverCircle = scene.add.graphics();
        this.hoverCircle.lineStyle(2, 0x00ff00, 1); // Green outline
        this.hoverCircle.strokeCircle(x, y, Entity.tileSize * targetRadius); // Circle radius 50
        this.hoverCircle.setVisible(false); // Initially hide the circle
        this.on('pointerover', () => this.hoverCircle.setVisible(true), this);
        this.on('pointerout', () => this.hoverCircle.setVisible(false), this);
    }

    update(time, dt) {
        

        super.update_sprite()
    }
}