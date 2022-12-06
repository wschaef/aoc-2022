import * as _ from "lodash";
import { Solver } from "./solver"

const solution: any = (input: string) => {
    const board = partseInput(input)
    const valueRange = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    const model = board.map(line =>
        line.map(it => it == "." ? valueRange : [it])
    )
    let numberSolvedFields = 0
    tryToSolve(model, numberSolvedFields)
    // printModel(model)
    return ""
}

function tryToSolve(model: string[][][], numberSolvedFieldsPrev: number): number {

    let numberSolvedFields = iterate(model)
    if (numberSolvedFields < 81 && numberSolvedFields > numberSolvedFieldsPrev) {
        const models = split(model)
        for (let m of models) {
            const nsf = tryToSolve(m, numberSolvedFields)
            if (nsf == 81) { // the solution was found!!
                model.forEach((_, i) => model[i] = m[i]) //update model
                return nsf
            }
        }
    }
    return numberSolvedFields
}

/**
 * split model to multiple verions of model by 
 * taking a single value for a field with two values
 * @param model 
 * @param minSize number of possible values for a field. Starting with 2 and increase when no fields have the min size
 * @returns 
 */
function split(model: string[][][], minSize = 2): string[][][][] {
    for (let i = 0; i < model.length; i++) {
        for (let j = 0; j < model[i].length; j++) {
            const v = model[i][j]
            if (v.length == minSize) {
                let m1 = model
                let m2 = deepCopy(model)
                m1[i][j] = v.slice(0, 1)
                m2[i][j] = v.slice(1, minSize)
                return [m1, m2]
            }
        }
    }
    split(model, ++minSize)// if no fields of min size are there try next minSize
    return [model]
}



/**
 * iterate ruduction of model until it solved or model
 * does not change
 * @param model
 * @returns number of solved fields
 */
function iterate(model: string[][][]): number {
    let countSolvedFields = 0
    let countSolvedFieldsPrevious = 0

    do {
        countSolvedFieldsPrevious = countSolvedFields
        countSolvedFields = reduce(model)
        if (countSolvedFields < 0) { //try was not successful
            return countSolvedFields
        }
        // console.log(countSolvedFields)
    } while (countSolvedFields < 81 && countSolvedFields > countSolvedFieldsPrevious);
    return countSolvedFields
}

/**
 * reduce model by
 * iterating through all fields and remove values based on sudoku conditions
 * @param model 
 * @returns number of fields with single value (=final)
 */
function reduce(model: string[][][]): number {
    let countSolvedFields = 0
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const fieldValue = calcField(model, i, j);
            if (fieldValue.length == 0) { //try was not successful
                return -1
            }
            countSolvedFields = fieldValue.length == 1 ? countSolvedFields + 1 : countSolvedFields
        }
    }
    return countSolvedFields
}

/**
 * remove values based on sudoku conditions for a single field
 * @param model 
 * @param i line number
 * @param j column number
 * @returns new field value
 */
function calcField(model: string[][][], i: number, j: number): string[] {
    let v = model[i][j]
    if (v.length == 1) return v
    const line = model[i]
    const column = model.map(line => line[j])
    const i1 = Math.floor(i / 3) * 3
    const j1 = Math.floor(j / 3) * 3
    const quader = [
        model[i1][j1], model[i1][j1 + 1], model[i1][j1 + 2],
        model[i1 + 1][j1], model[i1 + 1][j1 + 1], model[i1 + 1][j1 + 2],
        model[i1 + 2][j1], model[i1 + 2][j1 + 1], model[i1 + 2][j1 + 2],
    ]
    const existingSet = [...line, ...column, ...quader].filter(f => f.length == 1).map(f => f[0])
    v = v.filter(it => existingSet.indexOf(it) < 0)
    model[i][j] = v
    // if (v.length == 1) console.log(v)
    return v
}

function deepCopy(model: string[][][]): string[][][] {
    return model.map(line => line.slice(0).map(f => f.slice(0).map(v => v.slice(0))))
}

function printModel(model: string[][][]) {
    print(model.map(line => line.map(it => it.length > 1 ? "." : it[0])))
}
function print(input: string[][]) {
    const separator = "|-----------------------|"
    let lines = input.map(it => ["|", ...it.slice(0, 3), "|", ...it.slice(3, 6), "|", ...it.slice(6, 9), "|"])
        .map(line => line.join(" "))
    const result = [separator, ...lines.slice(0, 3), separator, ...lines.slice(3, 6), separator, ...lines.slice(6, 9), separator].join("\n")
    console.log(result)
}

function partseInput(input: string): string[][] {
    const entries = input.replaceAll("\"", "").split("],[")
        .map(it => it.replaceAll("[", "").replaceAll("]", ""))
        .map(it => it.split(","))
    return entries
}

new Solver(solution, 'input.txt', 1).print()
