function gaussianRandom(mean = 0, stdDev = 1) {
    let u = 1 - Math.random(); // Subtract from 1 to avoid log(0)
    let v = Math.random();
    let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return z * stdDev + mean; // Scale and shift to match the desired mean and standard deviation
}

function mergeParams(classParams, childParams) {
    // Object.keys(classParams).forEach(classKey => {
    //     if (!(classKey in childParams)) childParams[classKey] = classParams[classKey]
    // })
    return { ...classParams, ...childParams }
}

function clamp(x, a, b) {
    return a < x ? x < b ? x : b : a
}

// uses distances [0 - 2] lookup table (1 is 50% chance)
// tile = {x, y}
// clusters = [{x, y, scale}]
function oreChance(tile, clusters) {
    if (oreChance.gValues === undefined) { // x = index / 10
        let power = 8
        let p = x => Math.sqrt(-2*Math.log(1 - (1 - x) ** (1 / power)))
        let f = x => Math.exp(-1/2 * x * x)
        let g = x => 1 - (1 - f(x * p(0.5))) ** power     // scaled so that radius is 50% chance
        oreChance.gValues = Array.from({length: 201}, (_, i) => g(i/100))
        oreChance.gValues[200] = 0
        
        oreChance.gLookup = x => {
            let i0 = clamp(Math.floor(x * 100), 0, 200)
            let i1 = i0 + 1
            let t = clamp(x * 100 - i0, 0, 1)
            return (1 - t) * oreChance.gValues[i0] + t * gValues[i1]
        }
    }

    let scaledDist = (tile, cluster) => {
        let dx = tile.x - cluster.x
        let dy = tile.y - cluster.y
        return Math.sqrt(dx * dx + dy * dy) / cluster.scale
    }

    let chance = 1
    for (let cluster of clusters) chance *= 1 - oreChance.gLookup(scaledDist(tile, cluster))
    chance = 1 - chance
    return chance
}