import * as _ from "lodash";
import { Solver } from "./solver"

const solution: any = (input: string) => {
    const entries = input.split("\n\n")
        .map(it => it.split("\n").map(it => parseInt(it)))
        .map(it => it.reduce((sum, it) => sum + it, 0))
    const result = entries.sort((a, b) => a - b).slice(-3)
        .reduce((sum, it) => sum + it, 0)
    return result
}
new Solver(solution, 'input.txt', 2).print()
