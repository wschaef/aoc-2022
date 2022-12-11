import { Solver } from "../common/utils/solver"
import "../common/utils/arrayExtension"

const solution = (input: string) => {
    const entries = input.split(",")
    return entries
}

new Solver(solution, 'src/day00/input1.txt', 2).print()
