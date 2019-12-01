let modules = require('./modules.json')

const getFuleFromMass = (mass) => {
    return Math.floor(mass/3)-2
}

const getFuleFromModules = (modules) =>  {
    let totalFule = 0
    modules.forEach(modul => totalFule += getFuleFromMass(modul))
    return totalFule
}

const getTotalFuleFromMass = (mass) => {
    const fule = getFuleFromMass(mass)
    if (fule > 0) {
        return fule + getTotalFuleFromMass(fule)
    } else {
        return 0
    }
}

const getFuleFromModulesExtra = (modules) =>  {
    let totalFule = 0
    modules.forEach(modul => totalFule += getTotalFuleFromMass(modul))
    return totalFule
}

console.log('Step1: Should all be true')
console.log(getFuleFromMass(12) === 2)
console.log(getFuleFromMass(14) === 2)
console.log(getFuleFromMass(1969) === 654)
console.log(getFuleFromMass(100756) === 33583)

console.log('Step1: Fule needed')
console.log(getFuleFromModules(modules))

console.log('Step2: Should all be true')
console.log(getTotalFuleFromMass(14) === 2)
console.log(getTotalFuleFromMass(1969) === 966)
console.log(getTotalFuleFromMass(100756) === 50346)


console.log(getFuleFromModulesExtra([14]) === 2)
console.log(getFuleFromModulesExtra([1969]) === 966)
console.log(getFuleFromModulesExtra([100756]) === 50346)

console.log('Step2: Fule needed')
console.log(getFuleFromModulesExtra(modules))