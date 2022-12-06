import { Solver } from "../common/utils/solver"
import "../common/utils/arrayExtension"
import _ from 'lodash'
import dijkstraAlgorithm from "../common/algorithms/dijkstra"

const solution: any = (input: string) => {
    const entries = input.split("\n")
    console.log(_(entries).sumBy(it => it.length))
    console.log([1, 2, 3].sum())
    return entries
}
new Solver(solution, 'src/day00/input1.txt', 1).print()
