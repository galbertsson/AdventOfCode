//Comparator for step1
const isValidPassword = (password) => {
    let adjacentFound = false

    //No need to check last position
    for (let i = 0; i < password.length - 1; i++) {
        const current = password[i]
        const next = password[i + 1]

        if (current === next) {
            adjacentFound = true
        } else if (next < current) {
            return false
        }
    }

    return adjacentFound
}

//Comparator for step2
const isMoreValidPassword = (password) => {
    let adjacentFound = false
    const noDigitsOfEach = {}
    for (let char of password) {
        const noEqual = noDigitsOfEach[char]
        noDigitsOfEach[char] = noEqual === undefined ? 1 : noEqual + 1
    }

    //No need to check last position
    for (let i = 0; i < password.length - 1; i++) {
        const current = password[i]
        const next = password[i + 1]

        if (current === next && noDigitsOfEach[current] == 2) {
            adjacentFound = true
        } else if (next < current) {
            return false
        }
    }

    return adjacentFound
}

const noValidPasswords = (startRange, endRange, passwordLength, isValid) => {
    let noValidPasswords = 0

    for (let i = startRange; i <= endRange; i++) {
        const nonPaddedPassword = `${i}`
        const paddedPassword = '0'.repeat(passwordLength - nonPaddedPassword.length) + nonPaddedPassword
        if (isValid(paddedPassword)) {
            noValidPasswords++
        }
    }

    return noValidPasswords
}

console.log('Should all be true')
console.log(isValidPassword('111111'))
console.log(!isValidPassword('223450'))
console.log(!isValidPassword('123789'))

console.log('Step 1:')
console.log(noValidPasswords(246515, 739105, 6, isValidPassword))

console.log('Step 2:')
console.log(isMoreValidPassword('112233'))
console.log(!isMoreValidPassword('123444'))
console.log(isMoreValidPassword('111122'))

console.log('Step 2 solution: ')
console.log(noValidPasswords(246515, 739105, 6, isMoreValidPassword))
