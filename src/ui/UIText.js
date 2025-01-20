class UIText extends UIElement {
    static params = {
        fontSize: 2,
        origin: [0.5, 0.5],
        text: null,
        textString: "",
        textParams: {
            fontSize: 10 + 'px',
            color: '#ffffff',
            fontStyle: 'bold',
            align: 'center'
        },
    }

    constructor(scene, params) {
        params = {...UIText.params, ...params}
        super(scene, params)

        this.text = this.scene.add.text(this.x, this.y, params.textString, params.textParams)
        this.text.setOrigin(...params.origin) // Center horizontally, align top vertically
    }

    update(time, dt) {
        this.textParams.fontSize = this.fontSize * UIElement.unit + 'px'
    
        this.text.setText(this.textString)
        this.text.setPosition(this.x, this.y)  // Update position
        this.text.setStyle(this.textParams)
    }

}