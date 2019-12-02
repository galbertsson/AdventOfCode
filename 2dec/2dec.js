const program = require('./program.json')

const opCodes = {
    1: {
        parameters: 3, applyOp: (parameters, memory) => {
            memory[parameters[2]] = memory[parameters[0]] + memory[parameters[1]];
            return memory
        }
    },
    2: {
        parameters: 3, applyOp: (parameters, memory) => {
            memory[parameters[2]] = memory[parameters[0]] * memory[parameters[1]]
            return memory
        }
    },
    99: { parameters: 0, applyOp: (parameters, memory) => false },
}

const run = (program, opCodes) => {
    let programCopy = Object.assign([], program)

    let pc = 0
    while (pc < programCopy.length) {
        const opCode = programCopy[pc]
        pc++

        const { parameters, applyOp } = opCodes[opCode]

        const mem = applyOp(programCopy.slice(pc, pc + parameters), programCopy)

        if (mem) {
            programCopy = mem
        } else {
            return programCopy
        }

        pc = pc + parameters
    }

    return programCopy
}

const permuteProgram = (program, opCodes) => {
    for (let i = 0; i <= 99; i++) {
        for (let j = 0; j <= 99; j++) {
            const programCopy = Object.assign([], program)
            programCopy[2] = j
            programCopy[1] = i
            const result = run(programCopy, opCodes)
            if (result[0] === 19690720) {
                return programCopy
            }
        }
    }
}

console.log('Should all be true')
console.log(JSON.stringify(run([1, 0, 0, 0, 99], opCodes)) === JSON.stringify([2, 0, 0, 0, 99]))
console.log(JSON.stringify(run([2, 3, 0, 3, 99], opCodes)) === JSON.stringify([2, 3, 0, 6, 99]))
console.log(JSON.stringify(run([2, 4, 4, 5, 99, 0], opCodes)) === JSON.stringify([2, 4, 4, 5, 99, 9801]))
console.log(JSON.stringify(run([1, 1, 1, 4, 99, 5, 6, 0, 99], opCodes)) === JSON.stringify([30, 1, 1, 4, 2, 5, 6, 0, 99]))

console.log('Part 1:')
console.log(run(program, opCodes)[0])

console.log('Part 2:')
const resultProgram = permuteProgram(program, opCodes)
console.log('Noun', resultProgram[1])
console.log('Verb', resultProgram[2])