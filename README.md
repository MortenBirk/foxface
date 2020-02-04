# Foxface

[![Build Status](https://travis-ci.com/MortenBirk/foxface.svg?branch=master)](https://travis-ci.com/MortenBirk/foxface)

Foxface is a javascript library for handling n-dimensional arrays. The main objective is to make an easy to use interface, similar to numpy.

# Installation
Using npm

`npm i --save foxface`

# Using foxface
In general check out the documentation here: https://mortenbirk.github.io/foxface/

Foxface primarily uses instaces of the Ndarray class, which serves as a n-dimensional array with a bunch of methods to operate on it. 

## Creating a n-dimensional array
A n-dimensional array can be constructed from an array of arrays and will then be given that shape. A flat array can also be provided, and then a shape must be provided as creation options

```js
import ndarray from 'foxface'
// From an array of arrays
const arr1 = ndarray([[[1, 2, 3], [4, 5, 6]], [[7, 8, 9], [10, 11, 12]], [[13, 14, 15], [16, 17, 18]]])
// From a flat array, with a provided shape
const arr2 = ndarray(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]), {shape: [3, 2, 3]})
```

## Operating on n-dimensional arrays
In general check out all the methods of the Ndarray in the [documentation](https://mortenbirk.github.io/foxface/) which contains usage examples.

Using the `map` and `forEach` method most non existing operations can easily be implemented. For instance to add 5 to every number larger than 10 in a ndarray one could do the following

```js
import ndarray from 'foxface'
const arr = ndarray(new Float32Array([1, 2, 6, 4, 3, 12, 3, -2, 22]), {shape: [3, 3]})
const result = arr.map(e => e > 10 ? e + 5 : e)
result.values() // [1, 2, 6, 4, 3, 17, 3, -2, 27]
```