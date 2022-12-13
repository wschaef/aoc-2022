import { Solver } from "../common/utils/solver"
import "../common/utils/arrayExtension"
import _ from 'lodash'

type Entry = number | []

const solution: any = (input: string) => {
    const entries = input.split("\n\n").map(it => it.split("\n").map(it => JSON.parse(it))).flat()
    const sortedEntries = [...entries, [[2]], [[6]]].sort((a, b) => -1 * compare(a, b))
    const result = [[[2]], [[6]]].map(v => 1 + sortedEntries.findIndex(it => it.toString() == v.toString()))
    return result.reduce((prod, e) => prod * e, 1)
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

new Solver(solution, 'src/day13/input.txt', 2).print()
