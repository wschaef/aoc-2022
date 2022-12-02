import { Solver } from "./solver.js"
import "./arrayExtension.js"

const solution: any = (input: string) => {
    const entries = input.split("\n")
    const r1 = [1, 2, 3, 4, 5].sum(it => it * 2)
    const r2 = [1, 2, 3, 4, 5].sum((it, i) => i * it)
    console.log(r1, r2)
    return entries
}
new Solver(solution, 'input.txt', 1).print()
