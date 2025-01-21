class UIText extends UIElement {

    static params = {
        name: "UI Text",
        fontSize: 20,
        text: null,
        textString: "",
        textParams: {
            fontSize: 128 + 'px',
            color: '#ffffff',
            fontStyle: 'bold',
            align: 'right'
        },
    }

    constructor(scene, params) {
        params = {...UIText.params, ...params}
        super(scene, params)

        this.text = this.scene.add.text(0, 0, this.textString, this.textParams)
        this.text.setOrigin(...this.anchorPoint)
        this.text.setStyle(this.textParams)
        this.text.setDisplaySize(...this.unitScale)
        this.text.setPosition(0, 0)
        this.add(this.text)

    }

    setOrigin(x, y) {
        this.anchorPoint.x = x
        this.anchorPoint.y = y
    }

    setDisplaySize(sx, sy) {
        this.text.setDisplaySize(sx, sy)
    }

    static numberToStringFormatted(number, digits, signed) {
        let postFixIndex = 0
        while (Math.abs(number) >= 1000) {
                number /= 1000
            postFixIndex++
        }

        let signChar = signed ? '+' : ''
        if (signed && number) signChar = number > 0 ? '+' : '-'

        if (postFixIndex > 5) return "OVERLOAD"
        else {
            return signChar + parseFloat(number.toPrecision(digits)) + ' ' + [' ', 'K', 'M', 'B', 'T', 'Q'][postFixIndex]
        }
    }

    setNumber(number, digits, signed=false) {
        this.textString = UIText.numberToStringFormatted(number, digits, signed)
    }

    setText(text) {
        this.textString = text
    }

    update(time, dt) {
        this.text.setText(this.textString)
        this.text.setDisplaySize(...this.unitScale)
    }
}