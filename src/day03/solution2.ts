import { chunk } from "lodash";
import { Solver } from "../common/utils/solver"
import "../common/utils/arrayExtension"

const solution: any = (input: string) => {
    const entries = input.split("\n")
    const priorities = chunk(entries, 3)
        .map(it => findError(it))
        .map(it => getPriority(it))
    return priorities.sum()
}

function findError(entry: string[]): string {
    const [left, mid, right] = entry
    for (const elem of left.split("")) {
        if (mid.includes(elem) && right.includes(elem)) return elem
    }
    return left
}

function getPriority(element: string): number {
    return "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(element) + 1
}

new Solver(solution, 'src/day03/input1.txt', 2).print()