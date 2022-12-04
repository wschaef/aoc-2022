import { Solver } from "./solver.js"

const solution: any = (input: string) => {
    const entries = input.split("\n")
        .map(it => it.split(",").map(it => it.split("-").map(it => parseInt(it))))
    const result = entries.reduce((count, line) => isOverlap(line) ? ++count : count, 0)
    return result
}

function isOverlap(line: number[][]) {
    const [l1, r1] = line[0]
    const [l2, r2] = line[1]
    const result = (l1 <= r2 && r1 >= l2) || (l2 <= r1 && r2 >= l1)
    return result
}

new Solver(solution, 'input.txt', 2).print()
