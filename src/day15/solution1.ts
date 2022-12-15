import { Solver } from "../common/utils/solver"
import "../common/utils/arrayExtension"
import _ from "lodash"

class Point {
    constructor(
        public x: number,
        public y: number,
    ) { }

    public distance(other: Point): number {
        return Math.abs(this.x - other.x) + Math.abs(this.y - other.y)
    }
}

const solution: any = (input: string) => {
    const entries = input.replaceAll(":", "").split("\n").map(l => l.split(" "))
        .map(l => l.map(it => parseInt(it.split("=")[1])))
        .map(l => [
            new Point(l[2], l[3]), new Point(l[8], l[9])
        ]).map(l => ({ s: l[0], b: l[1], d: l[0].distance(l[1]) }))

    const lineToCheck = 2000000

    const yPairsOnLine = entries.map(entry => {
        const distanceToLine = Math.abs(entry.s.y - lineToCheck)
        const distanceOnLine = entry.d - distanceToLine
        return entry.d >= distanceToLine ? [entry.s.x - distanceOnLine, entry.s.x + distanceOnLine] : []
    })

    const bacons = entries.filter(e => e.b.y == lineToCheck).map(e => e.b.x)
    const baconsOnLine = Array.from(new Set(yPairsOnLine.map(pair => _.range(pair[0], pair[1] + 1)).flat()))
        .filter(it => !bacons.includes(it))
    const result = baconsOnLine

    return result.length

}
new Solver(solution, 'src/day15/input.txt', 1).print()
