class WorldResources {
    static resources = []
    static sources = new Set()  // list of entitiy sources

    static addResource(name, spriteIcon, params) {
        WorldResources[name] = new Resource(World.UIScene, name, spriteIcon, params)
        WorldResources.resources.push(WorldResources[name])
    }

    // use to simulate draingin a resource from the global supply
    static getResources(request) {


        for (const key of Object.keys(request)) {    // key is item type, value is quantity
            if (request[key] > WorldResources[key].quantity) return false
        }

        for (const key of Object.keys(request)) {    // key is item type, value is quantity
            WorldResources[key].quantity -= request[key]
        }
        // for (const item of request) {
        //     let resource = WorldResources[item.type]
        //     if (item.quantity > resource.quantity) return false
        // }
        // for (const item of request) {
        //     let resource = WorldResources[item.type]
        //     resource.quantity -= item.quantity
        // }
        return true
    }

    static addSource(entity, type, rate) {
        console.log(`Adding new source: ${entity}, type: ${type}, rate: ${rate}`)
        if (rate < 0) console.log(`Source rate must be positive. Rate = ${rate}`)
        WorldResources.sources.add({
            entity: entity,
            type: type,
            rate: rate,
        })
    }

    static removeSource(entity) {
        console.log("Removing source:", entity)
        for (const source of WorldResources.sources) {
            if (source.entity === entity) {
                WorldResources.sources.delete(source);
                break; // Exit loop once the matching source is found and removed
            }
        }

    }

    ////////// GAME START //////////
    static onGameStart() {
        WorldResources.addResource("Stone", "stone_icon", {quantity: 200})
        WorldResources.addResource("Mana", "mana_icon", {quantity: 5000})
        WorldResources.addResource("Bullet Tier 1", "bullettier1_icon", {quantity: 5000})
        WorldResources.addResource("Bullet Tier 2", "bullettier2_icon", {quantity: 5000})
    }

    static update(time, dt) {
        WorldResources.resources.forEach(resource => {
            resource.income = 0
        })

        WorldResources.sources.forEach(source => {
            let resource = WorldResources[source.type]
            resource.quantity += source.rate * dt
            resource.income += source.rate

        })

        WorldResources.resources.forEach(resource => {
           resource.update(time, dt)
        })            
    }
}