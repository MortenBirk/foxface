import { forEach, map } from './ndarrayIteration'
import { copy, asType, values } from './transforms'
import { avg, sum, min, max } from './internalMath'
import { add, sub, div, mul, pow } from './externalMath'
import { eq, neq, gt, lt, ge, le } from './comparison'

const getDim = (a) => {
  var dim = []
  while (true) {
    dim.push(a.length)
    if (Array.isArray(a[0])) {
      a = a[0]
    } else {
      break
    }
  }
  return dim
}

const getStrides = (dims) => {
  if (dims.length === 1) {
    return [1]
  }

  const strides = []
  let current = dims
  while (true) {
    current = current.filter((_, idx) => idx > 0)
    if (current.length > 1) {
      strides.push(current.reduce((e, acc) => e * acc, 1))
    }
    if (current.length === 1) {
      strides.push(current[0])
      strides.push(1)
      break
    }
  }
  return strides
}

const flat = (arr) => {
  if (Array.isArray(arr[0])) {
    return arr.reduce((acc, val) => acc.concat(flat(val)), [])
  } else {
    return arr
  }
}

const getView = (args, mat) => {
  const shape = args.map((arg, idx) => {
    if (Array.isArray(arg)) {
      if (arg.length === 0) {
        return mat.shape[idx]
      }
      if (arg.length !== 2) {
        throw new TypeError('Indices must be a range of two numbers, or an empty array')
      }
      return arg[1] - arg[0]
    }
    return null
  }).filter((e) => e !== null)

  const strides = args.map((e, idx) => Array.isArray(e) ? mat.strides[idx] : null).filter((e) => e !== null)

  const shift = args.map((arg) => {
    if (Array.isArray(arg)) {
      if (arg.length === 0) {
        return 0
      }
      return arg[0]
    }
    return arg
  }).reduce((acc, e, idx) => acc + e * mat.strides[idx], 0)

  return ndarray(null, { source: mat, shape: shape, offset: mat.offset + shift, strides: strides })
}

const convertNegativeindexes = (args, mat) => {
  return args.map((arg, idx) => {
    if (Array.isArray(arg)) {
      return arg.map((entry) => entry < 0 ? entry + mat.shape[idx] : entry)
    }
    return arg < 0 ? arg + mat.shape[idx] : arg
  })
}

const validateGetArgs = (args, mat) => {
  if (args.length > mat.shape.length) {
    throw new RangeError('Index out of range')
  }

  args.forEach((e, idx) => {
    if (Array.isArray(e)) {
      e.forEach((entry) => {
        if (entry > mat.shape[idx]) {
          throw new RangeError('Index out of range')
        }
      })
    } else {
      if (e >= mat.shape[idx]) {
        throw new RangeError('Index out of range')
      }
    }
  })
}

const paddMissingRank = (args, mat) => {
  if (args.length < mat.shape.length) {
    return mat.shape.map((_, idx) => idx < args.length ? args[idx] : [])
  }
  return args
}

const types = [
  Array,
  Float32Array,
  Float64Array,
  Int8Array,
  Int16Array,
  Int32Array,
  Uint8Array,
  Uint8ClampedArray,
  Uint16Array,
  Uint32Array
]

const determineDtype = (arrayLike) => {
  for (const dtype of types) {
    if (arrayLike instanceof dtype) {
      return dtype
    }
  }
}

const select = (selection, mat) => {
  selection = convertNegativeindexes(selection, mat)
  selection = paddMissingRank(selection, mat)
  validateGetArgs(selection, mat)
  let isView = false
  selection.forEach((arg) => {
    if (Array.isArray(arg)) {
      isView = true
    }
  })

  if (!isView) {
    return mat.getBufferIdx(selection, mat)
  }

  return getView(selection, mat)
}

const getSelectionValues = (selection, mat) => {
  const values = []
  selection.forEach((value, _, indices) => {
    if (value) {
      values.push(mat.get(...indices))
    }
  })
  return ndarray(mat.dtype.from(values))
}

const setSelectionValues = (value, selection, mat) => {
  selection.forEach((s, _, indices) => {
    if (s) {
      mat.set(indices, value)
    }
  })
}

/**
 * @typedef {Object} NdarrayOptions
 * @property {Array|Float32Array|Float64Array|Int8Array|Int16Array|Int32Array|Uint8Array|Uint8ClampedArray|Uint16Array|Uint32Array} dtype The datatype of the NdArray
 * @property {number[]} shape The shape of the object, where each number describes the size of each dimension
 */

/**
 * The base class of foxface.
 * Ndarray represents a multi dimensional array, and exposes a bunch of methods for operations on high dimensionality data.
 *
 * Instances of this class should be instantiated through the {@link ndarray } factory function.
 * @hideconstructor
 */
class Ndarray {
  constructor (array, options = {}) {
    const { dtype = null, source = null, shape = null, offset = null, strides = null } = options
    // This is a new ndarray from an array
    if (array) {
      const inputType = determineDtype(array)
      let inputData = inputType === Array ? flat(array) : array
      if (shape && inputData.length !== shape.reduce((a, e) => a * e, 1)) {
        throw new RangeError('Invalid shape provided for the given data')
      }
      this.dtype = dtype || inputType
      inputData = this.dtype.from(inputData)
      this.shape = shape || getDim(array)
      this.length = this.shape.reduce((acc, e) => e * acc, 1)
      this.strides = getStrides(this.shape)
      this.offset = 0
      this.data = inputData
      return
    }
    // This is a view of an existing ndarray
    if (source && shape && strides) {
      this.shape = shape
      this.length = this.shape.reduce((acc, e) => e * acc, 1)
      this.offset = offset || 0
      this.strides = strides
      this.data = source.data
      this.dtype = dtype || source.dtype
      return
    }
    throw new TypeError('shape and strides must be provided when a view is selected with a source')
  }

  /**
   * Set a part of the Ndarray
   * @method
   * @param {number|number[]|Ndarray} selectionArg Description on which part of the Ndarray to get
   * @param {number} value The value to set set selected view to.
   */
  set = (selectionArg, value) => {
    if (selectionArg instanceof Ndarray) {
      setSelectionValues(value, selectionArg, this)
      return
    }

    const selection = select(selectionArg, this)
    if (Number.isInteger(selection)) {
      this.data[selection] = value
      return
    }
    // Else set values in the window
    selection.forEach((_, idx) => (this.data[idx] = value))
  }

  /**
   * Get a part of the Ndarray
   * @method
   * @param {number|number[]|Ndarray} args Description on which part of the Ndarray to get
   * @return {Ndarray} The requested view of the data
   */
  get = (...args) => {
    if (args.length === 1 && args[0] instanceof Ndarray) {
      return getSelectionValues(args[0], this)
    }

    const selection = select(args, this)
    // If we have selected a specific index and not a view, return the value
    if (Number.isInteger(selection)) {
      return this.data[selection]
    }
    // Else return the view
    return selection
  }

  getBufferIdx = (selection) => {
    // Get the idx
    const values = selection.map((arg, idx) => arg * this.strides[idx])
    return this.offset + values.reduce((acc, e) => e + acc, 0)
  }

  // Value iteration

  /**
 * This callback type is called `requestCallback` and is displayed as a global symbol.
 *
 * @callback iterationCallback
 * @param {number} value The value for the current element
 * @param {number} bufferIdx The current elements index in the buffer. This should rarely be used
 * @param {number[]} index The indices of the current element. This is what you would use as arguement to Ndarrays get method
 */

  /**
   * Applies the given function to each element in the Ndarray
   * @method
   * @param {iterationCallback} operation The operation to apply to each element
   */
  forEach = (operation) => forEach(operation, this)
  /**
   * Applies the given function to each element in the Ndarray, and construct a new Ndarray with the returned values
   * @method
   * @param {iterationCallback} operation The operation to apply to each element
   */
  map = (operation) => map(operation, this)

  // Transforms

  /**
   * Return a flat array of values in the NdArray
   * @method
   * @returns {number[]}
   */
  values = () => values(this)
  /**
   * Return a copy of the Ndarray working on a new buffer
   * @method
   * @returns {number[]}
   */
  copy = () => copy(this, ndarray)
  /**
   * Return a copy of the Ndarray working on a new buffer with the specified datatype
   * @param {Array|Float32Array|Float64Array|Int8Array|Int16Array|Int32Array|Uint8Array|Uint8ClampedArray|Uint16Array|Uint32Array} dtype the datatype to convert to
   * @returns {number[]}
   */
  asType = (dtype) => asType(dtype, this, ndarray)

  // Internal math

  /**
   * Get the average value of the Ndarray
   * @method
   * @param {number} [axis = null] If specified an axis along which the avg should be found
   * @returns {number|Ndarray} If no axis is specified a number is returned, otherwise a new Ndarray is returned
   */
  avg = (axis) => avg(this, axis)
  /**
   * Get the sum of the Ndarray
   * @method
   * @param {number} [axis = null] If specified an axis along which the sum should be found
   * @returns {number|Ndarray} If no axis is specified a number is returned, otherwise a new Ndarray is returned
   */
  sum = (axis) => sum(this, axis)
  /**
   * Get the min value of the Ndarray
   * @method
   * @returns {number}
   */
  min = () => min(this)
  /**
   * Get the max value of the Ndarray
   * @method
   * @returns {number}
   */
  max = () => max(this)

  /**
   * Add a number or a Ndarray (element wize) to a Ndarray
   * @method
   * @param {Ndarray|number} other The value or Ndarray to add to this Ndarray
   * @param {boolean} [inplace = false] If true, the Ndarray will be updated and nothing will be returned
   * @returns {Ndarray|null} The updated Ndarray if inplace is false, otherwise null
   */
  add = (other, inplace = false) => add(this, other, inplace)
  /**
   * Substract a number or a Ndarray (element wize) from a Ndarray
   * @method
   * @param {Ndarray|number} other The value or Ndarray to subtract from this Ndarray
   * @param {boolean} [inplace = false] If true, the Ndarray will be updated and nothing will be returned
   * @returns {Ndarray|null} The updated Ndarray if inplace is false, otherwise null
   */
  sub = (other, inplace = false) => sub(this, other, inplace)
  /**
   * Divide the Ndarray with a number or another Ndarray (element wize)
   * @method
   * @param {Ndarray|number} other The value or Ndarray to divide this Ndarray with
   * @param {boolean} [inplace = false] If true, the Ndarray will be updated and nothing will be returned
   * @returns {Ndarray|null} The updated Ndarray if inplace is false, otherwise null
   */
  div = (other, inplace = false) => div(this, other, inplace)
  /**
   * Multiply a number or a Ndarray (element wize) to the Ndarray
   * @method
   * @param {Ndarray|number} other The value or Ndarray to multiply with this Ndarray
   * @param {boolean} [inplace = false] If true, the Ndarray will be updated and nothing will be returned
   * @returns {Ndarray|null} The updated Ndarray if inplace is false, otherwise null
   */
  mul = (other, inplace = false) => mul(this, other, inplace)
  /**
   * Raise the Ndarray to the power of a specified number of Ndarray (element wize)
   * @method
   * @param {Ndarray|number} other The value or Ndarray to raise the Ndarray to
   * @param {boolean} [inplace = false] If true, the Ndarray will be updated and nothing will be returned
   * @returns {Ndarray|null} The updated Ndarray if inplace is false, otherwise null
   */
  pow = (other, inplace = false) => pow(this, other, inplace)

  // Comparison

  /**
   * Create a new Ndarray with 1 where values are equal
   * @method
   * @param {Ndarray|number} other The value or Ndarray to compare values with element wize
   * @returns {Ndarray}
   */
  eq = (other) => eq(other, this)
  /**
   * Create a new Ndarray with 1 where values are not equal
   * @method
   * @param {Ndarray|number} other The value or Ndarray to compare values with element wize
   * @returns {Ndarray}
   */
  neq = (other) => neq(other, this)
  /**
   * Create a new Ndarray with 1 where values are smaller
   * @method
   * @param {Ndarray|number} other The value or Ndarray to compare values with element wize
   * @returns {Ndarray}
   */
  lt = (other) => lt(other, this)
  /**
   * Create a new Ndarray with 1 where values are larger
   * @method
   * @param {Ndarray|number} other The value or Ndarray to compare values with element wize
   * @returns {Ndarray}
   */
  gt = (other) => gt(other, this)
  /**
   * Create a new Ndarray with 1 where values are less than or equal
   * @method
   * @param {Ndarray|number} other The value or Ndarray to compare values with element wize
   * @returns {Ndarray}
   */
  le = (other) => le(other, this)
  /**
   * Create a new Ndarray with 1 where values are greater than or equal
   * @method
   * @param {Ndarray|number} other The value or Ndarray to compare values with element wize
   * @returns {Ndarray}
   */
  ge = (other) => ge(other, this)
}

/**
 * Create a new {@link Ndarray}
 * @param {Array|Float32Array|Float64Array|Int8Array|Int16Array|Int32Array|Uint8Array|Uint8ClampedArray|Uint16Array|Uint32Array} data The data for the nd-array. It can be a flat array or typed array, or it can be an array of arrays.
 * @param {NdarrayOptions} options Define creation options of the array. If no options are specified the ndarray will have shape and dtype like the provided data.
 * @returns {Ndarray}
 * @example <caption>Create nd-array from an array of arrays</caption>
 * const arr = ndarray([[[1, 2, 3], [4, 5, 6]], [[7, 8, 9], [10, 11, 12]], [[13, 14, 15], [16, 17, 18]]])
 * arr.shape
 * // [2,2,3]
 * arr.dtype
 * // Array
 * @example <caption>Create nd-array from an array of arrays, with another datatype</caption>
 * const arr = ndarray([[[1, 2, 3], [4, 5, 6]], [[7, 8, 9], [10, 11, 12]], [[13, 14, 15], [16, 17, 18]]], {dtype: Float32Array})
 * arr.shape
 * // [2,2,3]
 * arr.dtype
 * // Float32Array
 * @example <caption>Create nd-array from a flat typed array, with another shape</caption>
 * const arr = ndarray(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]), {shape: [2, 2, 3]})
 * arr.shape
 * // [2,2,3]
 * arr.dtype
 * // Float32Array
 */
const ndarray = (data, options) => {
  return new Ndarray(data, options)
}

export default ndarray
