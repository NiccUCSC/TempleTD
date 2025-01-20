class Clock extends UIElement {
    static params = {
        name: "clock",
        fontSize: 2,
        pos: { x: 0.5, y: 0.01 },
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
        params = {...Clock.params, ...params}
        super(scene, params)

        console.log(this.screenPos)

        this.text = this.scene.add.text(this.screenPos.x, this.screenPos.y, '00:00', params.textParams)
        this.text.setOrigin(0.5, 0) // Center horizontally, align top vertically
    }

    update(time, dt) {
        let seconds = Math.floor(time) % 60
        let minutes = Math.floor(time / 60) % 60
        let hours = Math.floor(time / 3600)
        let formatTime = time => time < 10 ? '0' + time : time
    
        this.textString = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`
        this.textParams.fontSize = 2 * UIElement.unit + 'px'
    
        this.text.setText(this.textString)
        this.text.setPosition(this.screenPos.x, this.screenPos.y)  // Update position
        this.text.setStyle(this.textParams)
    }

}