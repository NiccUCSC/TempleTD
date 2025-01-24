class ShopItem {

    static shopItemTypes = 0

    static parentHTMLElement = null;

    static {
        const getParentElement = () => {this.parentHTMLElement = document.querySelector(".shop-box")}
        if (document.readyState === "complete") {
            getParentElement()
        } else {
            window.addEventListener("load", getParentElement);
        }
    }

    static params = {
        name: "unnamed shop item",
        spriteIcon: "",
        entityClass: null,
        uiElement: null,
        tier: 0,
    }

    constructor(scene, name, spriteIcon, entityClass, params) {
        params = {...ShopItem.params, ...params, ...{name: name, spriteIcon: spriteIcon, entityClass: entityClass, cost: entityClass.params.buildCost}}
        Object.keys(params).forEach(key => {this[key] = params[key]})

        if (!this.cost) console.warn(`Entity Class ${entityClass} missing buildCost paramater`)


        this.uiHTMLElements = {
            shop: null,
        };

        console.log(`New shop created: ${this.name}`)

        const shopHTMLElement = document.createElement("div")
        shopHTMLElement.classList.add("shop")
        const [[key, value]] = Object.entries(this.cost);
        console.log(`there are ${value} in ${key}`);
        shopHTMLElement.innerHTML = `
        <div class="image">
            <img src="">
        </div>
        <div class="text">
            <div>` + this.name + `</div>
            <div>` + value + " " + key + `</div>
        </div>
    `

        ShopItem.parentHTMLElement.append(shopHTMLElement);

        this.uiHTMLElements.shop = shopHTMLElement


        const imgHTMLElement = this.uiHTMLElements.shop.querySelector("img")
        imgHTMLElement.src = spriteIcon;

        // const textHTMLElement = this.uiHTMLElements.shop.querySelector(".text")
        // this.uiHTMLElements.quantity = textHTMLElement.querySelector("div:first-of-type")
        // this.uiHTMLElements.income = textHTMLElement.querySelector("div:last-of-type")

        shopHTMLElement.addEventListener("click", () => {
            WorldShop.setSelected(this)
        })


        // if (!this.uiElement) this.uiElement = new UIShopItem(scene, {
        //     shopName: this.spriteIcon,
        //     cost: this.cost,
        //     shopName: this.name,
        //     parent: this,
        //     relativePos: [ 0, 0 ],                              // in porportions of the screen
        //     unitOffset: [1, 1 + 6 * ShopItem.shopItemTypes],   // offset from relative position in units
        //     anchorPoint: [0, 0],                                // in units of unitScale
        // })

        ShopItem.shopItemTypes++
    }

    select() {
        this.uiHTMLElements.shop.classList.add("selected")
    }

    deselect() {
        this.uiHTMLElements.shop.classList.remove("selected")
    }

    update(time, dt) {}

}