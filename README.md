# aoc-2022

## My learnings 

### day 01 

Time spent: 15 min.

The challenge was easy. I had still to google for slice. 

## day 02

time spent: 60 min

After spending 45 min searching error in my algorithm I switched to a simple dict solution.
This simple solution was way better in all relevant categories: simplicity, performance, readability.
The change for second part was minimal.

Research on extended array functions like: sum(), group(), count() shows, that some of them are planned in ES 2023, but are not usable today
Most others can't be chaned. 

Lets learn how to extend Array.prototype even if it is not a good idea for production code. Array.sum() seams to be a good candidate to start.
My timebox to implement it centrally was over and I put it into the day with the concequence of coping it every day.

## day 03

Time spent: 40 min

Solution was straigt forward. Used lodash for chunk and my new array extension sum().
Waisted some time on research for getPriority function using ASCII codes, but then took a more simple solution.

## day 04

Time spent 15 min

Challenge was very easy.

## day 05

Time spent 1,5 h

* Lost 5 Minutes to get the setup up and running -> prepare upfront
* Parsing the input 10 minutes
* Rotate the array by 90 degree 10 min -> 8 of them to implement proper print()
* Implement algorithm 5 min
* Fixing a bug which occurs in my input but not in example 20 min
* Fixing another bug in parsing because of use split("    ") 18 min
* Solving second part 2 min

The effort today was mainly the parsing of the input. 
Regex would solve it with less code, but all my investigations in learing it are not sustained.

## day 06

Time spent 16 min 

* 3 minutes to understand the challenge
* 8 minutes to solve 1
* 5 minutes to solve 2 -> bug of colision of i as index with i as variable in the array

Adding common utils becomes a mess by copying it into each day. 
I've invested some hours to switch from local build system to central. The challenge is to make build for a particular day, what requires
paramentrization für build script. NPM does not support parameters well enough.
Putting everythin in a run.js script is a workaround having disadvantage of very verbose output.

## day07

Time spent 1,5h

Solution is straigt forward, but there must be a more efficient way of implementing it.
Recursive algorithms feel more natural to mee for tree based problems. 
Idea for preparation is to have a tree data structure with common traversing functions.

I have to change my setup having less verbose output.

## day08

Time spent 1h

I took the first obvious idea: two dimensional array. I've saved time not defining any other more complex strucure and puting it into functions as interface. But I lost a lot of time debugging index errors.

I did not habe time to improve my setup. Idea is to avoid entering day as parameter, but let the script execute file wich was changed.

## day09

Time spent: a day

My first idea was to use a state machine. It was OK for part 1. For part2 it was a best example, that trying to adopt the solution at all costs is not a good idea.
My first approach did not fit to second part. After spending about 10h to debug part 2, I've droped the solution approach and used the distance approach being implemented in 30m. Autch!

Things I've learned:

* first days of aoc it is ok just to start. After a week it is more efficient to spent time to design the solution first.
* Now I have an example how to put arrow functions into a map, but it doesn't improve readability of my code!
  
```javascript
this.headMove = new Map<Dir, (p: Point) => void>([
    [Dir.U, (head) => head.x = head.x - 1],
    [Dir.R, (head) => ++head.y],
    [Dir.D, (head) => ++head.x],
    [Dir.L, (head) => --head.y],
])
```
## day 10

Time spent 1h

Using arrays and the indexes is pragmatic, but if you have a bug, it is much harder to find it. 
Day10 killed all my intentions to spend more time on aoc this week.

## day 11

Time spent 2,5h

The first part was easy, but parsing of input took time.
Second part was hard to understand. I had a feeling that changing from number to BitInt would not solve the problem. It was true. Around 1000 round was OK, but the computation time incread expotentially. 

I had to google for solution ;-(. The idea to look at modulo operation was enought to start thinking on my own. I had luck having all divisors prime numbers, so that modulo of each of them does not change if the worry level is taken modulo of the product of them. 

Things I've learned:

* how BigInt/bigint is working in Typescript <- is some kind of pain, becaue of difference between BigInt and bigint
* adding a small optimization with magicNumber just destroyed "segragation of duty" in my code. I need a value (=magicNumber) in a single Monkey class, which I can only get by combination of values of each Monkey objects. -> I've to sleep about that!

## day 12

Time spent 3h

Today I was able to reuse some code and algorithmus from last year. Unfortunately I've mapped E to elevation('z') + 1. That was the reason, why example was working fine, but my input was slightly to high. 

Second part was straightforward because of efficient algorithmus in part 1. It requires still about 17s to run. I made some optimizations avoiding cloning the board on each step. I reduced the run time from 47s to 17s.

Things I've learned:

* having a good algorithmus in mind is the half of the solution. My implementation was much more straightforward than last year. Having state as own structure makes the interfaces of functions much more clear. 
* I'm not sure if using tabnine VS code plugin is helping me or not. A lot of suggestions are wrong and fixing them costs more time than saving time on right suggestions. 
* console.time does not convinced me. Mostly I need a duration between two timestamps and not an absolute timestamp.  
* I'm using more console.table, since it provides better view for collections.

I'm spending too much time for AOC! Perhaps I should stop this year?

## day13

Time spent: 1h

The challenge today was really javascript friendly. Parsing input and sorting with compare function is supported nativelly.

Things I've learned:

* a multiply function on an array would make sense

## day14

Time spent: 4h

Algorithmus was clear from beginning. Lost some time on having the right boundary of the cave.
The most of the time I spent on debuging to solve error saying "RangeError: Maximum call stack size exceeded". My assuption was, that I have a infinite loop in my code, but is was the limitation of javascript!

Things I've learned:

* JavaScript has limited number of recursive calls. I've never thought about what recursion means for the programming language until now. It's less blaming JavaScript, but more recognizing that recursive calls that are too long aren't optimal

## day15

Time spent: 2h

My first idea was not the best. Spending 10m on thinking saved me hours of coding!

Things I've learned:

* I used regExpr to parse the input. It is still not convinient for me.

