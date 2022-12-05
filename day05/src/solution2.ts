import { unzip } from 'lodash';
import { Solver } from "./solver.js"
import "./arrayExtension.js"

const solution: any = (input: string) => {
    const [first, second] = input.split("\n\n")
    let stacks = first.replaceAll("[", " ").replaceAll("]", " ").split("\n")
        .map(it => it.replaceAll("    ", "   .")) //fix bug by multiple empty elements in a row
        .map(it => it.split("   "))
        .slice(0, -1) // remove the stacknumbers
        .map(line => line.map(elem => elem.trim())) // make sure no empty spaces in elements
    stacks = unzip(stacks).map(it => it.reverse()) // rotate the matrix by 90 degree
        .map(line => line.filter(elem => elem != ".")) // cut empty elements of the matrix

    const commands = second.replaceAll("move ", "").replaceAll(" from ", ",").replaceAll(" to ", ",")
        .split("\n").map(it => it.split(",").map(it => parseInt(it)))

    commands.forEach(command => move(stacks, command))
    print(stacks)
    return stacks.map(it => it.slice(-1)).join("")
}
function move(stacks: string[][], command: number[]): void {
    let [n, from, to] = command
    from = from - 1
    to = to - 1
    const moving = stacks[from].slice(-n)
    stacks[from] = stacks[from].slice(0, -n)
    stacks[to] = [...stacks[to], ...moving]
}

function print(stacks: string[][]) {
    unzip(stacks).reverse().map(line => line.map(elem => elem ? elem : ".")).forEach(it => console.log(it.join(" ")))
    console.log("-----------------")
}

new Solver(solution, 'input.txt', 2).print()
