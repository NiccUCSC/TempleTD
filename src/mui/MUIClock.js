class MUIClock {

    constructor() {
        const parentHTMLElement = document.querySelector(".clock-box")
        this.clockHTMLElement = document.createElement("h1")
        this.clockHTMLElement.innerText = "--:--:--"
        parentHTMLElement.append(this.clockHTMLElement)
    }

    update(time, dt) {
        let seconds = Math.floor(time) % 60
        let minutes = Math.floor(time / 60) % 60
        let hours = Math.floor(time / 3600)
        let formatTime = time => time < 10 ? '0' + time : time
    
        this.clockHTMLElement.innerText = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`
    }
}