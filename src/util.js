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