import { Solver } from "../common/utils/solver"
import "../common/utils/arrayExtension"

const solution: any = (input: string) => {
    const entries = input.split("\n").map(line => line.split("").map(it => parseInt(it)))
    const scores = entries.map((line, x) => line.map((it, y) => scenicScore(x, y, entries)))
    let maxScore = 0
    scores.forEach(row => row.forEach(it => maxScore = Math.max(maxScore, it)))
    return maxScore
}

function scenicScore(x: number, y: number, area: number[][]): number {
    const maxX = area.length - 1
    const maxY = area[0].length - 1
    const row = area[x]
    const column = area.map(row => row[y])
    const value = area[x][y]

    const result = calcScenicScore(row, y, value) * calcScenicScore(column, x, value)
    return result
}

function calcScenicScore(line: number[], pos: number, value: number): number {
    let score1 = 0
    let score2 = 0
    if (pos > 0) {
        let i = pos
        while (i > 0) {
            i--
            const v = line[i]
            score1++
            if (v >= value) {
                break;
            }
        }
    }
    if (pos < line.length - 1) {
        let i = pos
        while (i < line.length - 1) {
            i++
            const v = line[i]
            score2++
            if (v >= value) {
                break
            }
        }

    }
    return score1 * score2
}


new Solver(solution, 'src/day08/input.txt', 2).print() 
