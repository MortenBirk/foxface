@id zeros
@desc Create a new ndarray containing only zeros

```js
import { zeros } from 'foxface'
const arr = zeros({dtype: Float32Array, shape: [5, 2, 3]})
console.log(arr.shape)
console.log(arr.dtype.name)
console.log(arr.values())
```

@id ones
@desc Create a new ndarray containing only ones

```js
import { ones } from 'foxface'
const arr = ones({dtype: Float32Array, shape: [5, 2, 3]})
console.log(arr.shape)
console.log(arr.dtype.name)
console.log(arr.values())
```

@id full
@desc Create a new ndarray containing only the specified value

```js
import { full } from 'foxface'
const arr = full(5, {dtype: Float32Array, shape: [5, 2, 3]})
console.log(arr.shape)
console.log(arr.dtype.name)
console.log(arr.values())
```

@id zerosLike
@desc Create a new Ndarray containing zeros, with same shape and dtype as the provided Ndarray

```js
import { ones, zerosLike } from 'foxface'
const oneArr = ones({dtype: Float32Array, shape: [5, 2, 3]})
const arr = zerosLike(oneArr)
console.log(arr.shape)
console.log(arr.dtype.name)
console.log(arr.values())
```