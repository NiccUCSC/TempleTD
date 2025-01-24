class TerrainGeneration {

    static {
        this.tiles = {
            rock: 135,
            bigRock: 136,
        };
    }

    static generateOre(layer) {
        const oreSparcity = 30;
        for (let i = 0; i < layer.tilemap.width / oreSparcity - 1; i++) {
            for (let j = 0; j < layer.tilemap.height / oreSparcity - 1; j++) {
                this.generateOrePatch(layer, i*oreSparcity+this.randomInt(0, oreSparcity), j*oreSparcity+this.randomInt(0, oreSparcity));
            }
        }
    }

    static randomInt(min, max) {
        return Math.floor(Math.random()*(max-min)+min);
    }

    static random(min, max) {
        return Math.random()*(max-min)+min;
    }

    static generateOrePatch(layer, x, y) {
        const s = this.random(0.83, 1.5);
        const p = 4;
        const sampleSize = Math.floor(s*Math.sqrt(-2*Math.log(1-Math.pow(1-0.001, 1/p)))) + 1
        for (let i = -sampleSize; i <=sampleSize; i++) {
            for (let j = -sampleSize; j <=sampleSize; j++) {
                if (x + i < 0 || y + j < 0) continue;
                let dist = Math.sqrt(i*i+j*j);
                let f = Math.pow(Math.E, -1/2*Math.pow(dist/s, 2));
                let g = 1 - Math.pow(1 - f, p);
                if (Math.random() < g) {
                    this.setTile(layer, x + i, y + j, this.tiles.rock);
                }
            }
        }
        this.setTile(layer, x, y, this.tiles.bigRock);
    }

    static setTile(layer, x, y, tile) {
        layer.fill(tile, x, y, 1, 1);
    }
}