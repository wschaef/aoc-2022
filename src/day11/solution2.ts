import { Solver } from "../common/utils/solver"
import "../common/utils/arrayExtension"

const solution: any = (input: string) => {
    const monkeys = input.split(/\n\n/).map(it => new Monkey(it))
    const magicNumber = monkeys.map(m => m.divisor).reduce((prod, it) => prod * it, 1n)
    for (let i = 0; i < 10000; i++) {
        round(monkeys, magicNumber)
    }
    const result = monkeys.map(m => m.activityCount).sort((a, b) => b - a).slice(0, 2).reduce((prod, it) => prod * it, 1)
    return result
}

function round(monkeys: Monkey[], magicNumber: bigint) {
    monkeys.forEach(monkey => {
        monkey.inspect(magicNumber)
        monkey.items.forEach(item => {
            const next = monkey.next(item)
            monkeys[next].items.push(item)
        })
        monkey.items = []
    })
}

class Monkey {

    public id: number
    public items: bigint[]
    public operation: (item: bigint) => bigint
    public next: (item: bigint) => number
    public activityCount = 0
    public divisor: bigint

    constructor(input: string) {
        const monkeyStr = input.split("\n")
        this.id = parseInt(monkeyStr[0].replaceAll(":", "").split(" ").at(-1)!)
        this.items = monkeyStr[1].split(":")[1].split(",").map(it => BigInt(parseInt(it)))

        //parse operation
        const [left, op, right] = monkeyStr[2].split("=")[1].split(" ").slice(1)
        this.operation = (item: bigint) => {
            const operands = [left == 'old' ? item : BigInt(parseInt(left)), right == 'old' ? item : BigInt(parseInt(right))]
            switch (op) {
                case '+':
                    return operands.reduce((sum, it) => sum + it, 0n)
                    break;
                case '*':
                    return operands.reduce((prod, it) => it * prod, 1n)
            }
            console.warn("this should never happen")
            return item
        }

        //parse next 
        this.divisor = BigInt(parseInt(monkeyStr[3].split(" ").at(-1)!))
        const trueParam = parseInt(monkeyStr[4].split(" ").at(-1)!)
        const falseParam = parseInt(monkeyStr[5].split(" ").at(-1)!)
        this.next = (item: bigint) => item % this.divisor == 0n ? trueParam : falseParam
    }

    public inspect(magicNumber: bigint) {
        this.items = this.items.map(item => this.operation(item) % magicNumber)
        this.activityCount += this.items.length
    }

}

new Solver(solution, 'src/day11/input.txt', 2).print()


