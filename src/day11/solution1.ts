import { Solver } from "../common/utils/solver"
import "../common/utils/arrayExtension"

const solution: any = (input: string) => {
    const monkeys = input.split(/\n\n/).map(it => new Monkey(it))
    for (let i = 0; i < 20; i++) {
        round(monkeys)
    }
    const result = monkeys.map(m => m.activityCount).sort((a, b) => b - a).slice(0, 2).reduce((prod, it) => prod * it, 1)
    return result
}

function round(monkeys: Monkey[]) {
    // const newItems = monkeys.map(_ => new Array<number>())
    monkeys.forEach(monkey => {
        monkey.inspect()
        monkey.items.forEach(item => {
            const next = monkey.next(item)
            monkeys[next].items.push(item)
        })
        monkey.items = []
    })
}

class Monkey {

    public id: number
    public items: number[]
    public operation: (item: number) => number
    public next: (item: number) => number
    public activityCount = 0

    constructor(input: string) {
        const monkeyStr = input.split("\n")
        this.id = parseInt(monkeyStr[0].replaceAll(":", "").split(" ").at(-1)!)
        this.items = monkeyStr[1].split(":")[1].split(",").map(it => parseInt(it))

        //parse operation
        const [left, op, right] = monkeyStr[2].split("=")[1].split(" ").slice(1)
        this.operation = (item: number) => {
            const operands = [left == 'old' ? item : parseInt(left), right == 'old' ? item : parseInt(right)]
            switch (op) {
                case '+':
                    return operands.sum()
                    break;
                case '*':
                    return operands.reduce((prod, it) => it * + prod, 1)
            }
            console.warn("this should never happen")
            return item
        }

        //parse next 
        const divisor = parseInt(monkeyStr[3].split(" ").at(-1)!)
        const trueParam = parseInt(monkeyStr[4].split(" ").at(-1)!)
        const falseParam = parseInt(monkeyStr[5].split(" ").at(-1)!)
        this.next = (item: number) => item % divisor == 0 ? trueParam : falseParam
    }

    public inspect() {
        this.items = this.items.map(item => Math.floor(this.operation(item) / 3))
        this.activityCount += this.items.length
    }

}

new Solver(solution, 'src/day11/input.txt', 1).print()


