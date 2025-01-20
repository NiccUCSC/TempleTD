class UIClock extends UIText {
    static params = {
        name: "clock",
        pos: { x: 0.5, y: 0.01 },
        origin: [0.5, 0],
        text: null,
        textString: "--:--:--",
    }

    constructor(scene, params) {
        params = {...UIClock.params, ...params}
        super(scene, params)
    }

    update(time, dt) {
        let seconds = Math.floor(time) % 60
        let minutes = Math.floor(time / 60) % 60
        let hours = Math.floor(time / 3600)
        let formatTime = time => time < 10 ? '0' + time : time
    
        this.textString = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`
        this.textParams.fontSize = this.fontSize * UIElement.unit + 'px'
    
        super.update(time, dt)
    }

}