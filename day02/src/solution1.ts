import { Solver } from "./solver"

const solution: any = (input: string) => {
    const entries = input.split("\n")
    return entries.reduce((sum, it) => sum + getScore(it), 0)
}

function getScore(game: string): number {
    const result: { [key: string]: number } = {
        "A X": 1 + 3,
        "A Y": 2 + 6,
        "A Z": 3 + 0,
        "B X": 1 + 0,
        "B Y": 2 + 3,
        "B Z": 3 + 6,
        "C X": 1 + 6,
        "C Y": 2 + 0,
        "C Z": 3 + 3,
    }
    return result[game]
}

new Solver(solution, 'input.txt', 1).print() 
