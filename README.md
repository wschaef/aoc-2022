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


