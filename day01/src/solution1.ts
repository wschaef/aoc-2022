import * as _ from "lodash";
import { Solver } from "./solver"

const solution: any = (input: string) => {
    const entries = input.split("\n\n")
        .map(it => it.split("\n").map(it => parseInt(it)))
        .map(it => it.reduce((sum, it) => sum + it, 0))
    return Math.max(...entries)
}
new Solver(solution, 'input.txt', 1).print()
