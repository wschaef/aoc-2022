import { Solver } from "../common/utils/solver"
import "../common/utils/arrayExtension"

const solution: any = (input: string) => {
    const entries = input.split("\n")
    console.log([1, 2, 3].sum())
    return entries
}
new Solver(solution, 'src/day00/input1.txt', 1).print()
