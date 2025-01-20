class UIResource extends UIElement {
    static params = {
        name: "resource container",
        resourceName: "stone_icon",
        resourceIcon: null,
        resourceInStorage: null,
        resoureIncome: null,
        resourcePerSecond: null,
        pos: { x: 0.99, y: 0.01 },
    }

    constructor(scene, params) {
        params = {...UIResource.params, ...params}
        super(scene, params)

        this.resourceInStorage = new UIText(this.scene, {
            textString: "123,456 M", 
            origin: [ 1, 0 ],
            relativePos: { other: this, dx: 0, dy: 0 },
        })

        this.resourcePerSecond = new UIText(this.scene, {
            textString: "123 k", 
            origin: [ 1, 0 ],
            relativePos: { other: this, dx: 0, dy: 3 },
        })

        this.resourceIcon = this.scene.add.sprite(0, 0, this.resourceName)
        this.resourceIcon.setOrigin(1, 0.25)

        this.resoureIncome = this.scene.add.sprite(0, 0, "up_arrow")
        this.resoureIncome.setOrigin(1, 0.25)

        console.log(this.resourceIcon)
    }

    update(time, dt) {
        this.resourceIcon.x = this.x - 10 * UIElement.unit
        this.resourceIcon.y = this.y
        this.resourceIcon.setDisplaySize(10 * UIElement.unit, 10 * UIElement.unit)

        this.resoureIncome.x = this.x - 7 * UIElement.unit
        this.resoureIncome.y = this.y + 3 * UIElement.unit
        this.resoureIncome.setDisplaySize(4 * UIElement.unit, 4 * UIElement.unit)

    }
}