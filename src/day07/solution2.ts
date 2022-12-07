import { Solver } from "../common/utils/solver"
import "../common/utils/arrayExtension"

class Node {
    public children = new Array<Node>()
    constructor(
        public name: string,
        public isDirectory: boolean,
        public parent?: Node,
        public size: number = 0) {
    }
}

const IS_DIR = true
const IS_FILE = false

const solution: any = (input: string) => {
    const lines = input.split("\n").map(line => line.split(" "))
    const filesystem = new Node("/", true)
    let currentNode = filesystem
    lines.forEach(c => currentNode = exec(c, currentNode, filesystem))
    updateSize(filesystem) // recalculate size of the directories as sum of its content size
    const spaceToFree = filesystem.size - (70000000 - 30000000)
    const bigDirs = new Array<Node>()
    filterDirs(spaceToFree, filesystem, bigDirs)//filter all directories bigger enough to free space
    const sortedSize = bigDirs.map(dir => dir.size).sort()
    // print(filesystem)
    return sortedSize[0]
}

function exec(line: string[], currentNode: Node, filesystem: Node): Node {
    if (line[0] == "$") { // line is a command
        const [cmd, param] = line.slice(1)
        switch (cmd) {
            case "cd":
                switch (param) {
                    case "/":
                        currentNode = filesystem
                        break;
                    case "..":
                        currentNode = currentNode.parent!
                        break;
                    default:
                        currentNode = currentNode.children.find(node => node.name == param)!
                }
                break;
            case "ls":
                break;
            default:
                break;
        }
    } else { // line is output of a command
        const [first, second] = line
        if (first == "dir") {
            currentNode.children.push(new Node(second, IS_DIR, currentNode))
        } else {
            currentNode.children.push(new Node(second, IS_FILE, currentNode, parseInt(first)))
        }
    }

    return currentNode
}

function updateSize(node: Node): number {
    if (node.children.length > 0) {
        node.size = node.children.sum((child) => updateSize(child))
    }
    return node.size
}
function filterDirs(size: number, node: Node, dirs = new Array<Node>) {
    if (node.name != "/") {
        if (node.isDirectory) {
            if (node.size > size) {
                dirs.push(node);
            }
            node.children.forEach(child => filterDirs(size, child, dirs))
        }
    } else {
        node.children.forEach(child => filterDirs(size, child, dirs))
    }
}

function print(node: Node, offset = "") {
    console.log(offset, node.name, node.isDirectory ? "(dir)" : "", node.size)
    if (node.isDirectory) {
        node.children.forEach(child => print(child, offset + "|..."))
    }
}

new Solver(solution, 'src/day07/input.txt', 2).print()  
