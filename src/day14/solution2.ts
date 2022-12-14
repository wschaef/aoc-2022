import { Solver } from "../common/utils/solver"
import "../common/utils/arrayExtension"
import _ from "lodash"


class Cave {
    private xOffset = 0
    private yOffset = 0
    private xMax = 0
    private yMax = 0
    public points: string[][]
    public start = { x: 500, y: 0 }
    public pos = { x: 500, y: 0 }
    private lastPos = { x: 500, y: -1 }
    private count = 0

    constructor(lines: number[][][]) {
        const points = lines.flat()
        const yList = points.map(it => it[1])
        const yMax = Math.max(...yList)
        this.yMax = yMax + 2 // addind two additional rows at the botton
        this.yOffset = 0
        const xList = points.map(it => it[0])
        const xMax = Math.max(...xList, 500 + this.yMax) // extend to left by the height of the cave
        const xMin = Math.min(...xList, 500 - this.yMax) // extend to righ by the height of the cave
        this.xMax = xMax - xMin
        this.xOffset = xMin
        this.points = new Array<string[]>(this.yMax + 1).fill([]).map(it => new Array<string>(this.xMax + 1).fill("."))
        lines.forEach(line => this.addLines(line))
        this.points[this.points.length - 1] = new Array<string>(this.points[0].length).fill('#')
    }

    public set(x: number, y: number, value: string) {
        x = x - this.xOffset
        y = y - this.yOffset
        if (this.isOutside(x, y)) {
            console.warn(`${x} ${y} outside of range ${this.xMax} ${this.yMax}`)
        } else {
            this.points[y][x] = value
        }
    }
    public get(x: number, y: number): string | undefined {
        x = x - this.xOffset
        y = y - this.yOffset
        if (this.isOutside(x, y)) {
            return undefined
        }
        return this.points[y][x]
    }

    private isOutside(x: number, y: number): boolean {
        return (x < 0 || x > this.xMax || y < 0 || y > this.yMax)
    }

    private addLines(points: number[][]) {
        for (let i = 0; i < points.length - 1; i++) {
            this.addLine(points[i], points[i + 1])
        }
    }

    private addLine(from: number[], to: number[]) {
        const [xFrom, yFrom] = from
        const [xTo, yTo] = to
        if (xFrom > xTo) { //ensure "from" is on the left of to
            this.addLine(to, from)
        } else if (yFrom > yTo) { // ensure "from" is on the top of to
            this.addLine(to, from)
        } else {
            if (xFrom == xTo) { //vertical line
                for (let y = yFrom; y <= yTo; y++) {
                    this.set(xFrom, y, "#")
                }
            } else {
                for (let x = xFrom; x <= xTo; x + x++) {
                    this.set(x, yFrom, "#")
                }
            }
        }
    }

    public step(): boolean {
        let result = false
        this.count++
        if (this.lastPos.x == this.pos.x && this.lastPos.y == this.pos.y) {
            console.warn("no sand can be added")
        }
        const { x, y } = this.pos
        this.lastPos.x = x
        this.lastPos.y = y
        const current = this.get(x, y)
        if (!current) {
            return false
        }
        const down = this.get(x, y + 1)
        // const left = this.get(x - 1, y)
        const leftDown = this.get(x - 1, y + 1)
        // const right = this.get(x + 1, y)
        const rightDown = this.get(x + 1, y + 1)
        if (this.isEmpty(down)) {
            this.pos.y++
            result = this.step()
        } else if (this.isEmpty(leftDown)) {
            this.pos.x--
            this.pos.y++
            result = this.step()
        } else if (this.isEmpty(rightDown)) {
            this.pos.x++
            this.pos.y++
            result = this.step()
        } else if (current) {
            if (current != "o") {
                this.set(x, y, "o")
                return true
            }
        }
        return result
    }

    private isEmpty(value: string | undefined): boolean {
        return value == "." || value == undefined
    }

    public print() {
        let xValues = this.points[0].map((_, x) => (x + this.xOffset).toString().split(""))
        xValues = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' '], ...xValues]
        console.log(_.unzip(xValues).map(it => it.join("")).join("\n"))
        const out = this.points.map((line, y) => y.toString().padStart(3, ' ') + line.join("")).join("\n")
        console.log(out)
    }
}

const solution: any = (input: string) => {
    const lines = input.split("\n").map(it => it.split(" -> ").map(it => it.split(",").map(it => parseInt(it))))
    const cave = new Cave(lines)
    let continiue = true
    while (continiue) {
        continiue = cave.step()
        cave.pos.x = cave.start.x
        cave.pos.y = cave.start.y
    }
    // cave.print()
    const result = cave.points.flat().sum(value => value == 'o' ? 1 : 0)
    return result
}

new Solver(solution, 'src/day14/input.txt', 2).print()
