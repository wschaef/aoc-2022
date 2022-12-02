import { Solver } from "./solver"

const solution: any = (input: string) => {
    const entries = input.split("\n")
    return entries.reduce((sum, it) => sum + getScore(it), 0)
}

function getScore(game: string): number {
    const result: { [key: string]: number } = {
        "A X": 3 + 0,
        "A Y": 1 + 3,
        "A Z": 2 + 6,
        "B X": 1 + 0,
        "B Y": 2 + 3,
        "B Z": 3 + 6,
        "C X": 2 + 0,
        "C Y": 3 + 3,
        "C Z": 1 + 6,
    }
    return result[game]
}

new Solver(solution, 'input.txt', 2).print() 
