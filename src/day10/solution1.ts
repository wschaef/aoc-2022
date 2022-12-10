import { Solver } from "../common/utils/solver"
import "../common/utils/arrayExtension"

const solution: any = (input: string) => {
    const entries = input.split("\n")
    let register = [1]
    entries.forEach(line => exec(line, register))
    const relevantCycles = register.map((it, i) => it * (i + 1)).filter((it, i) => i % 20 == 19)
    return relevantCycles.filter((it, i) => i % 2 == 0).sum()
}

function exec(cmd: string, register: number[]) {
    const parts = cmd.split(" ")
    const instruction = parts[0]
    switch (instruction) {
        case "noop":
            register.push(register.at(-1)!)
            break;
        case "addx":
            const param = parseInt(parts[1])
            register.push(register.at(-1)!)
            // register.push(register.at(-1)!)
            register.push(register.at(-1)! + param)
            break;
    }
}
new Solver(solution, 'src/day10/input.txt', 1).print()
