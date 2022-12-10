import { Solver } from "../common/utils/solver"
import "../common/utils/arrayExtension"
import _ from 'lodash';


const solution: any = (input: string) => {
    const entries = input.split("\n")
    const state = new State()
    entries.forEach(line => exec(line, state))
    state.print()
    return "screen printed"
}

class State {

    public cycle: number = 0
    public sprite = [0, 1, 2]
    public register = 1
    public screen = new Array<string>()
    private screenWidth = 40
    constructor() { }

    public next(): void {
        this.sprite = [this.register, this.register + 1, this.register - 1]
        const column = this.cycle % this.screenWidth
        const nextPixel = this.sprite.includes(column) ? "#" : ' '
        this.screen.push(nextPixel)
        this.cycle++
    }

    public print() {
        console.log(_.chunk(this.screen, this.screenWidth).map(line => line.join("")).join("\n"))
    }
}


function exec(cmd: string, state: State) {
    const parts = cmd.split(" ")
    const instruction = parts[0]
    switch (instruction) {
        case "noop":
            state.next()
            break;
        case "addx":
            const param = parseInt(parts[1])
            state.next()
            state.next()
            state.register = state.register + param
    }
}
new Solver(solution, 'src/day10/input.txt', 2).print()