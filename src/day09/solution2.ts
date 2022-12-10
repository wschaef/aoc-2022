import { Solver } from "../common/utils/solver"
import "../common/utils/arrayExtension"

const solution: any = (input: string) => {
    const moves = input.split("\n").map(line => line.split(" ")).map(line => [line[0], parseInt(line[1])])
    const points = new Map<string, Point>()
    const start = new Point(0, 0)
    const tail = start.clone()
    points.set(tail.toString(), tail)
    const ropeSize = 10
    const state = new State(start, ropeSize)
    moves.forEach(move => {
        const [dir, times] = move
        for (let i = 0; i < times; i++) {
            state.next(dir as DIR)
            const nextTail = state.tail.clone()
            points.set(nextTail.toString(), nextTail)
        }
    })
    //print(points)
    return points.size
}

enum DIR { 'U' = 'U', 'L' = 'L', 'R' = 'R', 'D' = 'D' }

class Point {
    constructor(
        public x: number,
        public y: number
    ) { }

    public clone() {
        return new Point(this.x, this.y)
    }
    public toString(): string {
        return [this.x, this.y].toString()
    }

    public distance(other: Point): number {
        const xLength = Math.abs(this.x - other.x)
        const yLength = Math.abs(this.y - other.y)
        return Math.sqrt(xLength * xLength + yLength * yLength)
    }
}

class State {

    public tail: Point
    private partMove: Map<DIR, (p: Point) => void>
    public parts: Array<Point>

    constructor(public head: Point, ropeSize: number) {

        this.parts = new Array<Point>(head)
        for (let i = 1; i < ropeSize; i++) { //without head 
            this.parts.push(head.clone())
        }
        this.tail = this.parts.at(-1)!

        this.partMove = new Map<DIR, (p: Point) => void>([
            [DIR.U, (prev) => --prev.x],
            [DIR.R, (prev) => ++prev.y],
            [DIR.D, (prev) => ++prev.x],
            [DIR.L, (prev) => --prev.y],
        ])

    }

    public movePart(point: Point, prev: Point): void {
        if (point.distance(prev) >= 2) {
            let xVector = prev.x - point.x
            let yVector = prev.y - point.y
            xVector = xVector > 0 ? Math.min(1, xVector) : Math.max(-1, xVector)
            yVector = yVector > 0 ? Math.min(1, yVector) : Math.max(-1, yVector)
            point.x += xVector
            point.y += yVector
        }
    }

    public next(dir: DIR): void {
        const head = this.parts[0]
        this.partMove.get(dir)!(head)
        this.move(1, head)
    }

    private move(partNr: number, prev: Point): void {
        const part = this.parts[partNr]
        this.movePart(part, prev)
        const nextPartNr = partNr + 1
        if (nextPartNr < this.parts.length) {
            this.move(nextPartNr, part)
        }
    }

}

function printRope(points: Point[]): void {
    const newMap = new Map<string, Point>()
    points.forEach(p => newMap.set(p.toString(), p))
    print(newMap)
}

function print(points: Map<string, Point>): void {
    const pointsList = Array.from(points.values());
    if (pointsList.length == 0) {
        console.log("empty field")
        return
    }
    const xRange = pointsList.map(p => p.x)
    const yRange = pointsList.map(p => p.y)
    const xMin = Math.min(...xRange)
    const xMax = Math.max(...xRange)
    const yMin = Math.min(...yRange)
    const yMax = Math.max(...yRange)

    const xOffset = 0 - xMin
    const yOffset = 0 - yMin
    const field = new Array<string>(xMax - xMin + 1).fill("").map(row => new Array<string>(yMax - yMin + 1).fill('.'))
    const output = field.map((row, x) => row.map((it, y) => points.get(new Point(x - xOffset, y - yOffset).toString()) ? "#" : ".").join(" ")).join('\n')
    console.log(output)
}

new Solver(solution, 'src/day09/input.txt', 2).print() 
