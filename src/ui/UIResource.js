class UIResource extends UIElement {
    static params = {
        name: "resource container",
        unitScale: [10.5, 4],     // in units
        interactive: true,
        resourceName: "",
        quantityDigits: 4,
        incomeDigits: 3,
        quantity: 0,
        income: 0, 
    }

    constructor(scene, params) {
        params = {...UIResource.params, ...params}
        super(scene, params)

        this.resourceIcon = this.scene.add.sprite(0, 0, this.resourceName)
        this.resourceIcon.setOrigin(0, 0)
        this.resourceIcon.setDisplaySize(3, 3)
        this.resourceIcon.setPosition(-10, 0.5)
        this.add(this.resourceIcon)

        this.quantityText = new UIText(this.scene, {
            textString: "quantity text",
            interactive: true,
            relativePos: [0, 0],        // in screen width and height porporitons
            unitOffset: [-0.5, 0.5],
            unitScale: [6, 1.5],          // in units
            anchorPoint: [1, 0],
        })
        this.add(this.quantityText)

        this.incomeText = new UIText(this.scene, {
            textString: "income text",
            interactive: true,
            relativePos: [0, 0],        // in screen width and height porporitons
            unitOffset: [-0.5, 2],
            unitScale: [6, 1.5],          // in units
            anchorPoint: [1, 0],
        })
        this.add(this.incomeText)



        // this.resoureIncome = this.scene.add.sprite(0, 0, "up_arrow")
        // this.resoureIncome.setOrigin(1, 0.25)
    }

    setQuantity(quantity, income) {
        this.quantity = quantity
        this.income = income
        this.quantityText.setNumber(this.quantity, this.quantityDigits)
        this.incomeText.setNumber(this.income, this.incomeDigits, true)

        // this.resourceInStorage.setNumber(quantity, this.quantityDigits)
        // this.resourcePerSecond.setNumber(income, this.incomeDigits)
        // this.resourcePerSecond.textString += '/s'
    }

    update(time, dt) {
        // console.log(this.quantity, this.quantityDigits)
    }

}