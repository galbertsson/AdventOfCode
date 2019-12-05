const program = require('./program.json')

const opCodes = {
    1: {
        parameters: 3, applyOp: (parameters, parameterModes, memory, pc) => {

            //if 1 immediate if 0 position
            const firstValue = parameterModes[0] ? parameters[0] : memory[parameters[0]]
            const secondValue = parameterModes[1] ? parameters[1] : memory[parameters[1]]
            const writeAddress = parameters[2]

            memory[writeAddress] = firstValue + secondValue
            return { memory, newPc: pc }
        }
    },
    2: {
        parameters: 3, applyOp: (parameters, parameterModes, memory, pc) => {
            const firstValue = parameterModes[0] ? parameters[0] : memory[parameters[0]]
            const secondValue = parameterModes[1] ? parameters[1] : memory[parameters[1]]
            const writeAddress = parameters[2]

            memory[writeAddress] = firstValue * secondValue
            return { memory, newPc: pc }
        }
    },
    3: {
        parameters: 1, applyOp: (parameters, parameterModes, memory, pc) => {
            const firstValue = parameters[0]
            console.log('<< 5') //Input Value
            memory[firstValue] = 5
            return { memory, newPc: pc }
        }
    },
    4: {
        parameters: 1, applyOp: (parameters, parameterModes, memory, pc) => {
            const firstValue = parameterModes[0] ? parameters[0] : memory[parameters[0]]
            console.log(`>> ${firstValue}`)
            return { memory, newPc: pc }
        }
    },
    5: {
        parameters: 2, applyOp: (parameters, parameterModes, memory, pc) => {
            const firstValue = parameterModes[0] ? parameters[0] : memory[parameters[0]]
            const secondValue = parameterModes[1] ? parameters[1] : memory[parameters[1]]

            if (firstValue !== 0) {
                pc = secondValue
            }

            return { memory, newPc: pc }
        }
    },
    6: {
        parameters: 2, applyOp: (parameters, parameterModes, memory, pc) => {
            const firstValue = parameterModes[0] ? parameters[0] : memory[parameters[0]]
            const secondValue = parameterModes[1] ? parameters[1] : memory[parameters[1]]

            if (firstValue === 0) {
                pc = secondValue
            }

            return { memory, newPc: pc }
        }
    },
    7: {
        parameters: 3, applyOp: (parameters, parameterModes, memory, pc) => {
            const firstValue = parameterModes[0] ? parameters[0] : memory[parameters[0]]
            const secondValue = parameterModes[1] ? parameters[1] : memory[parameters[1]]
            const writeAddress = parameters[2]


            memory[writeAddress] = firstValue < secondValue ? 1 : 0

            return { memory, newPc: pc }
        }
    },
    8: {
        parameters: 3, applyOp: (parameters, parameterModes, memory, pc) => {
            const firstValue = parameterModes[0] ? parameters[0] : memory[parameters[0]]
            const secondValue = parameterModes[1] ? parameters[1] : memory[parameters[1]]
            const writeAddress = parameters[2]


            memory[writeAddress] = firstValue === secondValue ? 1 : 0

            return { memory, newPc: pc }
        }
    },
    99: { parameters: 0, applyOp: (parameters, memory) => false },
}

const parseOpCode = (instruction) => {
    const opCode = instruction % 100 //Get last two digits
    const parameterModes = `${Math.trunc(instruction / 100)}`.split('').reverse().map(mode => parseInt(mode)) //Ugly solution to get array of parameterModes

    console.log('opCode', opCode)
    console.log('modes', parameterModes)
    return { opCode, parameterModes }
}

const getFullParameterMode = (parameterModes, parameters) => {
    const allParameters = new Array(parameters - parameterModes.length).fill(0)
    return parameterModes.concat(allParameters)
}

const run = (program, opCodes) => {
    let programCopy = Object.assign([], program)

    let pc = 0
    while (pc < programCopy.length) {
        const { opCode, parameterModes } = parseOpCode(programCopy[pc])
        pc++

        const { parameters, applyOp } = opCodes[opCode]
        const fullParameterMode = getFullParameterMode(parameterModes, parameters)

        const { memory, newPc } = applyOp(programCopy.slice(pc, pc + parameters), fullParameterMode, programCopy, pc)

        if (memory) {
            programCopy = memory
        } else {
            return programCopy
        }

        if (newPc === pc) {
            pc = pc + parameters
        } else {
            pc = newPc
        }
    }

    return programCopy
}

run(program, opCodes)