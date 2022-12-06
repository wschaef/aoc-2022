import { Solver } from "./solver.js"

const solution: any = (input: string) => {
    const entries = input.split("")

    for (let i = 14; i < entries.length; i++) {
        const [a, b, c, d, e, f, g, h, x, j, k, l, m, n] = entries.slice(i - 14, i)
        if (new Set([a, b, c, d, e, f, g, h, x, j, k, l, m, n]).size == 14) {
            return i
        }
    }
    return entries
}

new Solver(solution, 'input.txt', 2).print()
