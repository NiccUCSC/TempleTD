class UIResource extends UIElement {
    static params = {
        name: "resource container",
        unitScale: [24, 8],     // in units
        interactive: true,
        resourceName: "stone_icon",
        quantityDigits: 4,
        incomeDigits: 3,
        quantity: 0,
        income: 0, 
    }

    constructor(scene, params) {
        params = {...UIResource.params, ...params}
        super(scene, params)



        // this.resourcePerSecond = new UIText(this.scene, {
        //     origin: [ 1, 0 ],
        //     relativePos: { other: this, dx: 0, dy: 3 },
        // })

        this.resourceIcon = this.scene.add.sprite(0, 0, this.resourceName)
        this.resourceIcon.setOrigin(0, 0)
        this.resourceIcon.setDisplaySize(8, 8)
        this.resourceIcon.setPosition(-24, 0)
        this.add(this.resourceIcon)

        this.quantityText = new UIText(this.scene, {
            textString: "test",
            interactive: true,
            relativePos: [0, 0],        // in screen width and height porporitons
            unitOffset: [0, 0],
            unitScale: [16, 4],          // in units
            anchorPoint: [1, 0],
        })
        this.add(this.quantityText)

        console.log(this.quantityText)




        // this.resoureIncome = this.scene.add.sprite(0, 0, "up_arrow")
        // this.resoureIncome.setOrigin(1, 0.25)
    }

    setQuantity(quantity, income) {
        this.quantity = quantity
        this.income = income
        // this.resourceInStorage.setNumber(quantity, this.quantityDigits)
        // this.resourcePerSecond.setNumber(income, this.incomeDigits)
        // this.resourcePerSecond.textString += '/s'
    }

}