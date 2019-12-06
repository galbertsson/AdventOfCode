const karta = require('./karta.json')

const parseInput = (input) => {
    const data = input.split(')')
    return {around: data[0], orbiter: data[1]}
}

const getOrbitsForOrbiter = (pair, map) => {
    let orbiterPair

    for(p of map) {
        if ( pair.around === p.orbiter ){
            orbiterPair = p
        }
    }

    if (orbiterPair) {
        return 1 + getOrbitsForOrbiter(orbiterPair, map)
    }

    return 1
}

const getTotalOrbits = (input) => {
    const map = input.map(inp => parseInput(inp))

    let ans = 0

    map.forEach(pair => {
        ans += getOrbitsForOrbiter(pair, map)
    });

    return ans
}

const reccFind= (map, currentNode, distance) => {
    let orbiterPair

    for(let p of map) {
        if ( currentNode.around === p.orbiter ){
            orbiterPair = p
        }
    }

    let newPath = []

    if (orbiterPair) {
        newPath.push({distance: distance+1, node: orbiterPair})
        newPath = newPath.concat(reccFind(map, orbiterPair, distance+1))
    }

    return newPath
}

const getOrbitMapForOrbiter = (orbiter, map) => {
    const orbiterPair = map.find(elem => elem.orbiter === orbiter)
    
    return reccFind(map, orbiterPair, 0)
}

const getTotalOrbitsToSanta = (input) => {
    const map = input.map(inp => parseInput(inp))

    const youMap = getOrbitMapForOrbiter('YOU', map)
    const sanMap = getOrbitMapForOrbiter('SAN', map)

    let bestDistance

    for (let you of youMap) {
        for (let santa of sanMap) {
            if (you.node.around === santa.node.around) {
                const distance = you.distance + santa.distance

                if (!bestDistance || distance < bestDistance) {
                    bestDistance = distance
                }
            }
        }
    }

    return bestDistance
}

console.log(getTotalOrbits(karta))
console.log(getTotalOrbitsToSanta(karta))