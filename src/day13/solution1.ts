import { Solver } from "../common/utils/solver"
import "../common/utils/arrayExtension"

const solution: any = (input: string) => {
    const entries = input.split("\n\n").map(it => it.split("\n").map(it => JSON.parse(it)))
    const result = entries.map(it => compare(it[0], it[1])).map((it, i) => it == 1 ? i + 1 : 0).sum()
    return result
}

function compare(left: any, right: any): number {
    if (left == undefined) {
        return 1
    } else if (right == undefined) {
        return -1
    }
    const leftIsN = Number.isInteger(left)
    const rightIsN = Number.isInteger(right)
    if (leftIsN && rightIsN) {
        return left < right ? 1 : left > right ? -1 : 0
    } else if (!leftIsN && !rightIsN) {
        for (let i = 0; i < left.length; i++) {
            const l = left[i]
            const r = right[i]
            const comp = compare(l, r)
            if (comp != 0) {
                return comp
            }
        }
        if (left.length < right.length) {
            return 1
        }
    } else {
        return leftIsN ? compare([left], right) : compare(left, [right])
    }
    return 0
}

new Solver(solution, 'src/day13/input.txt', 1).print()
