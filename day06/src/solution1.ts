import { Solver } from "./solver.js"

const solution: any = (input: string) => {
    const entries = input.split("")

    for (let i = 4; i < entries.length; i++) {
        const [a, b, c, d] = entries.slice(i - 4, i)
        if (new Set([a, b, c, d]).size == 4) {
            return i
        }
    }
    return entries
}

new Solver(solution, 'input.txt', 1).print()
