@id ndarray
@desc Create Ndarray from an array of arrays

```js
import ndarray from 'foxface'
const arr = ndarray([[[1, 2, 3], [4, 5, 6]], [[7, 8, 9], [10, 11, 12]], [[13, 14, 15], [16, 17, 18]]])
console.log(arr.shape)
console.log(arr.dtype.name)
```
 
@id ndarray
@desc Create Ndarray from an array of arrays, with another datatype

```js
import ndarray from 'foxface'
const arr = ndarray([[[1, 2, 3], [4, 5, 6]], [[7, 8, 9], [10, 11, 12]], [[13, 14, 15], [16, 17, 18]]], {dtype: Float32Array})
console.log(arr.shape)
console.log(arr.dtype.name)
```

@id ndarray
@desc Create Ndarray from a flat typed array, with another shape

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]), {shape: [3, 2, 3]})
console.log(arr.shape)
console.log(arr.dtype.name)
```

@id Ndarray
@desc Create Ndarray from an array of arrays

```js
import ndarray from 'foxface'
const arr = ndarray([[[1, 2, 3], [4, 5, 6]], [[7, 8, 9], [10, 11, 12]], [[13, 14, 15], [16, 17, 18]]])
console.log(arr.shape)
console.log(arr.dtype.name)
```

@id Ndarray.set
@desc Set values for a given window to a specific value

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]), {shape: [3, 2, 3]})
arr.set([[1,3], 0, []], 5)
console.log(arr.values())
```

@id Ndarray.set
@desc Set values for indices selected by another ndarray

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]), {shape: [3, 2, 3]})
const selection = ndarray(new Int16Array([1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0]), {shape: [3, 2, 3]})
arr.set(selection, 5)
console.log(arr.values())
```

@id Ndarray.get
@desc Get values for a given window

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]), {shape: [3, 2, 3]})
const selected = arr.get([[1,3], 0, []], 5)
console.log(selected.values())
```

@id Ndarray.get
@desc Get values for indices selected by another ndarray

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]), {shape: [3, 2, 3]})
const selection = ndarray(new Int16Array([1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0]), {shape: [3, 2, 3]})
const selected = arr.get(selection, 5)
console.log(selected.values())
```

@id Ndarray.forEach
@desc Iterate all elements of the ndarray and print the value and indices

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]), {shape: [3, 2, 3]})
arr.forEach((value, bufferIdx, index) => console.log(value + ' : ' + index))
```

@id Ndarray.map
@desc Iterate all elements of the ndarray and add 1 to each value

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]), {shape: [3, 2, 3]})
const modified = arr.map((value, bufferIdx, index) => value + 1)
console.log(arr.values())
console.log(modified.values())
```

@id Ndarray.values
@desc Get a flat list of all values in the ndarray

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]), {shape: [3, 2, 3]})
console.log(arr.values())
```

@id Ndarray.toList
@desc Return an array of arrays. This is basically an export to js function

```js
import ndarray from 'foxface'
const arr = ndarray([[1, 2, 6], [4, 3, 12], [3, -2, 22]])
console.log(JSON.stringify(arr.toList()))
```

@id Ndarray.copy
@desc Create a copy of an existing ndarray working on a new buffer

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]), {shape: [3, 2, 3]})
const theCopy = arr.copy()
// You can now modify the original ndarray without modifying the new copy, since they work on different buffers
arr.add(10, true)
console.log(arr.values())
console.log(theCopy.values())
```

@id Ndarray.asType
@desc Create a copy of an existing ndarray with a new datatype

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]), {shape: [3, 2, 3]})
const theCopy = arr.asType(Int16Array)
console.log(arr.dtype.name)
console.log(theCopy.dtype.name)
```

@id Ndarray.avg
@desc Get the average value of an entire ndarray

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]), {shape: [3, 2, 3]})
console.log(arr.avg())
```

@id Ndarray.avg
@desc Get the average value along the second axis of a ndarray

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]), {shape: [3, 2, 3]})
// When we avg along an axis a new ndarray is returned.
console.log(arr.avg(1).values())
```

@id Ndarray.sum
@desc Get the sum of an entire ndarray

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]), {shape: [3, 2, 3]})
console.log(arr.sum())
```

@id Ndarray.sum
@desc Get the sum along the first axis of a ndarray

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]), {shape: [3, 2, 3]})
// When we sum along an axis a new ndarray is returned.
console.log(arr.sum(0).values())
```

@id Ndarray.min
@desc Get the minimum value in the ndarray

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, -250, 10, 11, 12, 13, 14, 122, 16, 17, 18]), {shape: [3, 2, 3]})
console.log(arr.min())
```

@id Ndarray.max
@desc Get the maximum value in the ndarray

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, -250, 10, 11, 12, 13, 14, 122, 16, 17, 18]), {shape: [3, 2, 3]})
console.log(arr.max())
```

@id Ndarray.add
@desc Add a number to a ndarray

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]), {shape: [3, 2, 3]})
console.log(arr.add(10).values())
```

@id Ndarray.add
@desc Add two ndarrays to each other

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]), {shape: [3, 2, 3]})
console.log(arr.add(arr).values())
```

@id Ndarray.sub
@desc Subtract a number from a ndarray

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]), {shape: [3, 2, 3]})
console.log(arr.sub(10).values())
```

@id Ndarray.sub
@desc Subtract a ndarray from another

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]), {shape: [3, 2, 3]})
console.log(arr.sub(arr).values())
```

@id Ndarray.div
@desc Divide an ndarray with a number

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]), {shape: [3, 2, 3]})
console.log(arr.div(2).values())
```

@id Ndarray.div
@desc Divide an ndarray with another

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]), {shape: [3, 2, 3]})
console.log(arr.div(arr).values())
```

@id Ndarray.mul
@desc Multiply an ndarray with a number

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]), {shape: [3, 2, 3]})
console.log(arr.mul(10).values())
```

@id Ndarray.mul
@desc Multiply an ndarray with another

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]), {shape: [3, 2, 3]})
console.log(arr.mul(arr).values())
```

@id Ndarray.pow
@desc Raise a ndarray to the power of a number

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]), {shape: [3, 2, 3]})
console.log(arr.pow(2).values())
```

@id Ndarray.pow
@desc Raise a ndarray to the power of another

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]), {shape: [3, 2, 3]})
const other = ndarray(new Float32Array([1, 2, 3, 1, 2, 3, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2]), {shape: [3, 2, 3]})
console.log(arr.pow(other).values())
```

@id Ndarray.eq
@desc Select all entries equal to a value

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 2, 4, 5, 2, 7, 2, 9]), {shape: [3, 3]})
console.log(arr.eq(2).values())
```

@id Ndarray.eq
@desc Select all entries equal to another ndarrays entries

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 2, 4, 5, 2, 7, 2, 9]), {shape: [3, 3]})
const other = ndarray(new Float32Array([2, 2, 2, 0, 5, 1, 12, 5, 9]), {shape: [3, 3]})
console.log(arr.eq(other).values())
```

@id Ndarray.neq
@desc Select all entries not equal to a value

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 2, 4, 5, 2, 7, 2, 9]), {shape: [3, 3]})
console.log(arr.neq(2).values())
```

@id Ndarray.neq
@desc Select all entries not equal to another ndarrays entries

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 2, 4, 5, 2, 7, 2, 9]), {shape: [3, 3]})
const other = ndarray(new Float32Array([2, 2, 2, 0, 5, 1, 12, 5, 9]), {shape: [3, 3]})
console.log(arr.neq(other).values())
```

@id Ndarray.lt
@desc Select all entries less than a value

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 2, 4, -5, 2, 3, -2, 9]), {shape: [3, 3]})
console.log(arr.lt(2).values())
```

@id Ndarray.lt
@desc Select all entries less than another ndarrays entries

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([5, 5, 5, 5, 5, 5, 5, 5, 5]), {shape: [3, 3]})
const other = ndarray(new Float32Array([2, 7, 2, 7, 5, 5, 2, 7, 5]), {shape: [3, 3]})
console.log(arr.lt(other).values())
```

@id Ndarray.gt
@desc Select all entries greater than a value

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 2, 4, -5, 2, 3, -2, 9]), {shape: [3, 3]})
console.log(arr.gt(2).values())
```

@id Ndarray.gt
@desc Select all entries greater than another ndarrays entries

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([5, 5, 5, 5, 5, 5, 5, 5, 5]), {shape: [3, 3]})
const other = ndarray(new Float32Array([2, 7, 2, 7, 5, 5, 2, 7, 5]), {shape: [3, 3]})
console.log(arr.gt(other).values())
```

@id Ndarray.le
@desc Select all entries less than or equal to a value

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 2, 4, -5, 2, 3, -2, 9]), {shape: [3, 3]})
console.log(arr.le(2).values())
```

@id Ndarray.le
@desc Select all entries less than or equal to another ndarrays entries

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([5, 5, 5, 5, 5, 5, 5, 5, 5]), {shape: [3, 3]})
const other = ndarray(new Float32Array([2, 7, 2, 7, 5, 5, 2, 7, 5]), {shape: [3, 3]})
console.log(arr.le(other).values())
```

@id Ndarray.ge
@desc Select all entries greater than or equal to a value

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 2, 4, -5, 2, 3, -2, 9]), {shape: [3, 3]})
console.log(arr.ge(2).values())
```

@id Ndarray.ge
@desc Select all entries greater than or equal another ndarrays entries

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([5, 5, 5, 5, 5, 5, 5, 5, 5]), {shape: [3, 3]})
const other = ndarray(new Float32Array([2, 7, 2, 7, 5, 5, 2, 7, 5]), {shape: [3, 3]})
console.log(arr.ge(other).values())
```