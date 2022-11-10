# Pattern

## 2d-board

Take a number[][] array and transforms it to a Point[][].
Every point gets an array of the references to neigbours like:

```
xxx
xAx
xxx
```

## Snippeds

Transform an array of arrays to a map: [[a,3],[b,2]] => { 'a':3, 'b':2 }
```
const dict = listOfArrays.reduce((map, p) => map.set(p[0], p[1]), new Map())
```

Transform a map to an array of values or keys
```
const listOValues = Array.from(aMap.values())
const listObKeys = Array.from(aMap.keys())
```

increase a value of a map or set it to 1 if not there
```
const map = new Map<string,number>()
map.set('aKey', ++(map.get('aKey') || 0))
```

range
```
const range = (start, end) => Array.from(Array(end - start + 1).keys()).map(x => x + start);
console.log(range(3, 6));
// [3, 4, 5, 6]
console.log(range(-2, 2));
// [-2, -1, 0, 1]
```

## eternal links
https://github.com/tajpouria/algorithms-and-data-structures-cheat-sheet