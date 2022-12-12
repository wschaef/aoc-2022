import { Solver } from "../common/utils/solver"
import "../common/utils/arrayExtension"
import _ from 'lodash'

class Point {
    public neighbours: Point[] = new Array<Point>()
    constructor(public value: number, public i: number, public j: number) { }
}

class State {
    constructor(
        public board: Point[][],
        public pos: Point,
        public end: Point,
        public steps: number = 0,
        public prev?: Point
    ) { }
}

const solution: any = (input: string) => {
    const entries = input.split("\n").map(line => line.split("").map(it => getElevation(it)))
    const board = toBoard(entries)
    const boardWidth = board[0].length
    const start = getPosition("S", input, boardWidth, board)
    const end = getPosition("E", input, boardWidth, board)
    const state = new State(board, start, end)
    const lookup = new Map<string, State>()
    lookup.set(lookupkey(state.pos), state)
    solve(state, lookup, end)

    const endState = lookup.get(lookupkey(end))
    // print(endState!)

    return endState?.steps
}

function solve(state: State, lookup: Map<string, State>, end: Point): void {
    const isEnd = isEquals(state.pos, end)
    if (!isEnd) {
        const nextStates = step(state, lookup)
        nextStates.forEach(s => solve(s, lookup, end))
    }
}

function step(state: State, lookup: Map<string, State>): State[] {
    let neighbours = state.prev ? state.pos.neighbours.filter(it => !isEquals(it, state.prev!)) : state.pos.neighbours
    neighbours = neighbours.filter((n: Point) => n.value <= state.pos.value + 1)
    const states = neighbours.map((p: Point) => {
        const newState = _.clone(state)
        newState.pos = p
        newState.prev = state.pos
        newState.steps++
        return newState
    })

    const result = states.reduce((res, s) => {
        const existingState = lookup.get(lookupkey(s.pos))
        if (!existingState || s.steps < existingState.steps) {
            lookup.set(lookupkey(s.pos), s)
            res.push(s)
        }
        return res
    }, new Array<State>())

    return result
}

function clone(state: State): State {
    const newState = _.clone(state)
    newState.board = _.cloneDeep(state.board)
    newState.pos = _.clone(state.pos)
    newState.prev = _.clone(state.prev)
    return newState
}

function toBoard(lines: number[][]) {
    const board = lines.map((line, i) => line.map((field, j) => new Point(field, i, j))); // used for lookup the points
    board.flat().forEach(p => p.neighbours = getNeighbours(lines, p.i, p.j, board));
    return board;
}

// return 3,5 or 8 neighbour points
function getNeighbours(lines: number[][], i: number, j: number, dict: Point[][]): Point[] {
    const coordinates = [[i - 1, j], [i, j + 1], [i + 1, j], [i, j - 1]]
        .filter(([I, J]) => I >= 0 && I < lines.length && J >= 0 && J < lines[0].length)
    const result = coordinates.map(([I, J]) => dict[I][J])
    return result
}

function getPosition(value: string, input: string, width: number, board: Point[][]): Point {
    const pos = input.replaceAll("\n", "").indexOf(value)
    return board[Math.floor(pos / width)][pos % width]
}

function getElevation(elevStr: string): number {
    switch (elevStr) {
        case 'S':
            return getElevation('a')
        case 'E':
            return getElevation('z')
        default:
            return "0abcdefghijklmnopqrstuvwxyz".indexOf(elevStr)
    }
}

function isEquals(p: Point, q: Point): boolean { return p.i == q.i && p.j == q.j }

function lookupkey(pos: Point) { return [pos.i, pos.j].join(",") }

function print(state: State) {
    console.table(state.board.map(line => line.map(it => isEquals(state.pos, it) ? `[${it.value}]` : it.value)))
    console.log(state.steps)
}

new Solver(solution, 'src/day12/input.txt', 1).print() 