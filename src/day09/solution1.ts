import { Solver } from "../common/utils/solver"


const solution: any = (input: string) => {
    const moves = input.split("\n").map(line => line.split(" ")).map(line => [line[0], parseInt(line[1])])
    const points = new Map<string, Point>()
    const start = new Point(0, 0)
    const tail = start.clone()
    points.set(tail.toString(), tail)
    const state = new State(Pos.M, start, tail)
    moves.forEach(move => {
        const [dir, times] = move
        for (let i = 0; i < times; i++) {
            state.next(dir as Dir)
            const nextTail = state.tail.clone()
            points.set(nextTail.toString(), nextTail)
        }
    })
    // print(points)
    return points.size
}


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
}

enum Pos { 'LU' = 'LU', 'U' = 'U', 'RU' = 'RU', 'L' = 'L', 'M' = 'M', 'R' = 'R', 'LD' = 'LD', 'D' = 'D', 'RD' = 'RD' }
enum Dir { 'U' = 'U', 'L' = 'L', 'R' = 'R', 'D' = 'D' }

class State {
    private stateMachine: Map<string, Pos>
    private headMove: Map<Dir, (p: Point) => void>
    private tailMove: Map<Pos, (p: Point) => void>

    constructor(public pos: Pos, public head: Point, public tail: Point) {
        this.stateMachine = new Map<string, Pos>([
            ['LU,U', Pos.L],
            ['LU,R', Pos.L],
            ['LU,D', Pos.U],
            ['LU,L', Pos.U],
            ['U,U', Pos.M],
            ['U,R', Pos.LU],
            ['U,D', Pos.U],
            ['U,L', Pos.RU],
            ['RU,U', Pos.R],
            ['RU,R', Pos.U],
            ['RU,D', Pos.U],
            ['RU,L', Pos.R],

            ['LD,U', Pos.D],
            ['LD,R', Pos.L],
            ['LD,D', Pos.L],
            ['LD,L', Pos.D],
            ['D,U', Pos.D],
            ['D,R', Pos.LD],
            ['D,D', Pos.M],
            ['D,L', Pos.RD],
            ['RD,U', Pos.D],
            ['RD,R', Pos.D],
            ['RD,D', Pos.R],
            ['RD,L', Pos.R],

            ['L,U', Pos.LD],
            ['L,R', Pos.L],
            ['L,D', Pos.LU],
            ['L,L', Pos.M],
            ['M,U', Pos.D],
            ['M,R', Pos.L],
            ['M,D', Pos.U],
            ['M,L', Pos.R],
            ['R,U', Pos.RD],
            ['R,R', Pos.M],
            ['R,D', Pos.RU],
            ['R,L', Pos.R]
        ])
        this.headMove = new Map<Dir, (p: Point) => void>([
            [Dir.U, (head) => head.x = head.x - 1],
            [Dir.R, (head) => ++head.y],
            [Dir.D, (head) => ++head.x],
            [Dir.L, (head) => --head.y],
        ])
        this.tailMove = new Map<Pos, (p: Point) => void>([
            [Pos.LU, (p) => [p.x, p.y] = [this.head.x - 1, this.head.y - 1]],
            [Pos.U, (p) => [p.x, p.y] = [this.head.x - 1, this.head.y]],
            [Pos.RU, (p) => [p.x, p.y] = [this.head.x - 1, this.head.y + 1]],
            [Pos.L, (p) => [p.x, p.y] = [this.head.x, this.head.y - 1]],
            [Pos.M, (p) => [p.x, p.y] = [this.head.x, this.head.y]],
            [Pos.R, (p) => [p.x, p.y] = [this.head.x, this.head.y + 1]],
            [Pos.LD, (p) => [p.x, p.y] = [this.head.x + 1, this.head.y - 1]],
            [Pos.D, (p) => [p.x, p.y] = [this.head.x + 1, this.head.y]],
            [Pos.RD, (p) => [p.x, p.y] = [this.head.x + 1, this.head.y + 1]],
        ])


    }

    public next(dir: Dir): void {
        this.pos = this.stateMachine.get(this.key(this.pos, dir))!
        this.headMove.get(dir)!(this.head)!
        this.tailMove.get(this.pos)!(this.tail)!
    }

    private key(pos: Pos, dir: Dir): string {
        return [Pos[pos], Dir[dir]].join(",")
    }
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

new Solver(solution, 'src/day09/input.txt', 1).print() 
