import { Solver } from "./solver.js"

const solution: any = (input: string) => {
    const entries = input.split("")

    const Z = 14 //group size
    for (let i = Z; i < entries.length; i++) {
        if (new Set(entries.slice(i - Z, i)).size == Z) {
            return i
        }
    }
    return entries
}

new Solver(solution, 'input.txt', 2).print()
