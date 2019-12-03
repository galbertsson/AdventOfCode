const path1 = require('./input1.json')
const path2 = require('./input2.json')

const parseInput = (cablePath) => {
    return cablePath.map(point => {
        const direction = point[0]
        const length = parseInt(point.slice(1))

        if (direction === 'R') {
            return {x: length, y: 0}
        } else if (direction === 'L') {
            return {x: -length, y: 0}
        } else if (direction === 'U') {
            return {x: 0, y: length}
        } else if (direction === 'D') {
            return {x: 0, y: -length}
        }
    })
}

const buildCompletePath = (pathIn) => {
    const path = [{x: 0, y: 0}]

    for (let dirr of pathIn) {
        if (dirr.x < 0) {
            for(let i = -1;i>=dirr.x;i--) {
                const prev = path[path.length-1]
                path.push({x: prev.x-1, y: prev.y})
            }
        } else if(dirr.x > 0) {
            for(let i = 1;i<=dirr.x;i++) {
                const prev = path[path.length-1]
                path.push({x: prev.x+1, y: prev.y})
            }
        } else if (dirr.y < 0) {
            for(let i = -1;i>=dirr.y;i--) {
                const prev = path[path.length-1]
                path.push({x: prev.x, y: prev.y-1})
            }
        } else if(dirr.y > 0) {
            for(let i = 1;i<=dirr.y;i++) {
                const prev = path[path.length-1]
                path.push({x: prev.x, y: prev.y+1})
            }
        } 
    }

    return path
}

const findIntersections = (firstCablePath, secondCablePath) => {
    const intersections = []
    const secondPathSet = new Set(secondCablePath.map(point => `${point.x},${point.y}`))

    for (let firstPoint of firstCablePath) {
        if(!(firstPoint.x === 0 && firstPoint.y === 0) && secondPathSet.has(`${firstPoint.x},${firstPoint.y}`)) {
            intersections.push({x: firstPoint.x, y: firstPoint.y})
        }
    }
    
    return intersections
}

const distanceToCentralPort = (point) => {
    return Math.abs(point.x) + Math.abs(point.y)
}

const computeClosestPoint = (firstCablePath, secondCablePath) => {
    const firstParsedInput = buildCompletePath(parseInput(firstCablePath))
    const secondParsedInput = buildCompletePath(parseInput(secondCablePath))

    const intersections = findIntersections(firstParsedInput, secondParsedInput)

    let distance
    let closestPoint
    for (let intersection of intersections) {
        const tmpDistance = distanceToCentralPort(intersection)
        if (distance === undefined || tmpDistance < distance) {
            distance = tmpDistance
            closestPoint = intersection
        }
    }

    return distanceToCentralPort(closestPoint)
}

const totalWireLength = (firstPath, secondPath, intersection) => {
    const firstPathLength = firstPath.findIndex(point => point.x === intersection.x && point.y === intersection.y)
    const secondPathLength = secondPath.findIndex(point => point.x === intersection.x && point.y === intersection.y)

    return firstPathLength+secondPathLength
}

const computeBestPoint = (firstCablePath, secondCablePath) => {
    const firstParsedInput = buildCompletePath(parseInput(firstCablePath))
    const secondParsedInput = buildCompletePath(parseInput(secondCablePath))

    const intersections = findIntersections(firstParsedInput, secondParsedInput)

    let distance
    for (let intersection of intersections) {
        const tmpDistance = totalWireLength(firstParsedInput, secondParsedInput, intersection)
        if (distance === undefined || tmpDistance < distance) {
            distance = tmpDistance
        }
    }

    return distance
}

console.log('Should be true')
console.log(computeClosestPoint(["R75","D30","R83","U83","L12","D49","R71","U7","L72"], ["U62","R66","U55","R34","D71","R55","D58","R83"]) === 159)
console.log(computeClosestPoint(["R98","U47","R26","D63","R33","U87","L62","D20","R33","U53","R51"], ["U98","R91","D20","R16","D67","R40","U7","R15","U6","R7"]) === 135)

console.log('Step1: ')
console.log(computeClosestPoint(path1, path2))

console.log('Step2: ')
console.log('should be true')
console.log(computeBestPoint(["R75","D30","R83","U83","L12","D49","R71","U7","L72"], ["U62","R66","U55","R34","D71","R55","D58","R83"]) === 610)
console.log(computeBestPoint(["R98","U47","R26","D63","R33","U87","L62","D20","R33","U53","R51"], ["U98","R91","D20","R16","D67","R40","U7","R15","U6","R7"]) === 410)
console.log(computeBestPoint(path1, path2))