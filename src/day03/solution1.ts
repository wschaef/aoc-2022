import { Solver } from "../common/utils/solver"
import "../common/utils/arrayExtension"

const solution: any = (input: string) => {
    const entries = input.split("\n")
        .map(line => [line.slice(0, line.length / 2), line.slice(-line.length / 2)])
        .map(it => findError(it))
        .map(it => getPriority(it))
    return entries.sum()
}

function findError(entry: string[]): string {
    const [left, right] = entry
    for (const elem of left.split("")) {
        if (right.includes(elem)) return elem
    }
    return left
}

function getPriority(element: string): number {
    return "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(element) + 1
}

new Solver(solution, 'src/day03/input1.txt', 1).print()