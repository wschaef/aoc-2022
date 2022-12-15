import { Solver } from "../common/utils/solver"
import "../common/utils/arrayExtension"
import _ from "lodash"

class Point {
    constructor(public x: number, public y: number) { }

    public distance(other: Point): number {
        return Math.abs(this.x - other.x) + Math.abs(this.y - other.y)
    }
}

const solution: any = (input: string) => {
    const RE = /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/

    const entries = input.split("\n").map(line => RE.exec(line))
        .map((it) => it?.slice(1, 5).map(Number))
        .map(l => [
            new Point(l![0], l![1]), new Point(l![2], l![3])
        ]).map(l => ({ s: l[0], b: l[1], d: l[0].distance(l[1]) }))

    const leftBoudary = 0
    const rightBoundary = 4000000
    // const rightBoundary = 20

    const yBoundary = entries.map(e => [e.s.y - e.d, e.s.y + e.d]).flat()
    const yMin = Math.max(leftBoudary, Math.min(...yBoundary))
    const yMax = Math.min(rightBoundary, Math.max(...yBoundary))

    let resultY = Number.MAX_VALUE
    let resultX = Number.MAX_VALUE

    for (let y = yMin; y <= yMax; y++) {
        const yPairsOnLine = entries.map(entry => {
            const distanceToLine = Math.abs(entry.s.y - y)
            const distanceOnLine = entry.d - distanceToLine
            return entry.d >= distanceToLine ? [Math.max(entry.s.x - distanceOnLine, leftBoudary), Math.min(entry.s.x + distanceOnLine, rightBoundary)] : []
        }).filter(it => it.length > 0)

        const joinedRanges = yPairsOnLine.sort((a, b) => a[0] - b[0] || a[1] - b[1]).reduce((res, elem) => {
            const last = res.at(-1) || new Array<number>()
            const [lFrom, lTo] = last
            const [rFrom, rTo] = elem
            if (res.length > 0 && lTo >= rFrom - 1) {
                last[1] = Math.max(lTo, rTo)
            } else {
                res.push(elem)
            }
            return res
        }, new Array<Array<number>>())

        if (joinedRanges.length > 1) {
            resultX = joinedRanges[0][1] + 1
            resultY = y
            break;
        }
    }
    const result = 4000000 * resultX + resultY

    return result

}
new Solver(solution, 'src/day15/input.txt', 2).print()
