import { Solver } from "../common/utils/solver"
import "../common/utils/arrayExtension"

const solution: any = (input: string) => {
    const entries = input.split("\n").map(line => line.split("").map(it => parseInt(it)))
    const visibleTrees = entries.map((line, x) => line.map((it, y) => isVisible(x, y, entries)))
    return visibleTrees.map(line => line.sum(it => it ? 1 : 0)).sum()
}

function isVisible(x: number, y: number, area: number[][]): boolean {
    const maxX = area.length - 1
    const maxY = area[0].length - 1
    const line = area[x]
    const column = area.map(line => line[y])
    const value = area[x][y]
    if (x == 0 || x == maxX || y == 0 || y == maxY) {
        return true
    }
    const result =
        Math.max(...column.slice(0, x)) < value
        || Math.max(...column.slice(x + 1, maxX + 1)) < value
        || Math.max(...line.slice(0, y)) < value
        || Math.max(...line.slice(y + 1, maxY + 1)) < value
    return result
}

new Solver(solution, 'src/day08/input.txt', 1).print()
