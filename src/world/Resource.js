class Resource {

    static resourceTypes = 0

    static parentHTMLElement = null;

    static {
        const getParentElement = () => {this.parentHTMLElement = document.querySelector(".resource-box")}
        if (document.readyState === "complete") {
            getParentElement()
        } else {
            window.addEventListener("load", getParentElement);
        }
    }

    static params = {
        name: "unnamed resource",
        spriteIcon: "",
        tier: 0,
        quantity: 0,
        income: 0,
        dependencies: {},   // any building that produces or removes resources
        uiHTMLElements: {
            resource: null,
            quantity: null,
            income: null,
        },
    }

    constructor(scene, name, spriteIcon, params) {
        params = {...Resource.params, ...params, ...{name: name, spriteIcon: spriteIcon}}
        Object.keys(params).forEach(key => {this[key] = params[key]})

        this.uiHTMLElements = {
            resource: null,
            quantity: null,
            income: null,
        };

        console.log(`New resource created: ${this.name}`)

        const resourceHTMLElement = document.createElement("div")
        resourceHTMLElement.classList.add("resource")
        resourceHTMLElement.innerHTML = `
        <div class="image">
            <img src="">
        </div>
        <div class="text">
            <div>0</div>
            <div>+0/s</div>
        </div>
    `

        Resource.parentHTMLElement.append(resourceHTMLElement);

        this.uiHTMLElements.resource = resourceHTMLElement


        const imgHTMLElement = this.uiHTMLElements.resource.querySelector("img")
        imgHTMLElement.src = spriteIcon;

        const textHTMLElement = this.uiHTMLElements.resource.querySelector(".text")
        this.uiHTMLElements.quantity = textHTMLElement.querySelector("div:first-of-type")
        this.uiHTMLElements.income = textHTMLElement.querySelector("div:last-of-type")

        Resource.resourceTypes++
    }

    update(time, dt) {
        this.uiHTMLElements.quantity.innerText = UIText.numberToStringFormatted(this.quantity, 4) // TODO 4 and 3 should be variables as defined in UIResource
        this.uiHTMLElements.income.innerText = UIText.numberToStringFormatted(this.income, 3) + "/s"
    }
}