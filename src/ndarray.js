import { forEach, map } from './ndarrayIteration'
import { copy, asType, values} from './transforms'
import { avg, sum, min, max } from './internalMath'
import { add, sub, div, mul, pow } from './externalMath'
import { eq, neq, gt, lt, ge, le } from './comparison'

const  getDim = (a) => {
  var dim = [];
  while (true) {
      dim.push(a.length);
      if (Array.isArray(a[0])) {
          a = a[0];
      } else {
          break;
      }
  }
  return dim;
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
  }
  else {
    return arr
  }
};

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

  return new ndarray(null, {source: mat, shape: shape, offset: mat.offset + shift, strides: strides})
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
    }
    else {
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
  for (let dtype of types) {
    if (arrayLike instanceof dtype) {
      return dtype
    }
  }
}

const select = (selection, mat) => {
  selection = convertNegativeindexes(selection, mat)
  selection = paddMissingRank(selection, mat)
  validateGetArgs(selection, mat)
  let isView = false;
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
    if (value)  {
      values.push(mat.get(...indices))
    }
  })
  return ndarray(mat.dtype.from(values))
}

const setSelectionValues = (value, selection, mat) => {
  selection.forEach((s, _, indices) => {
    if (s)  {
      mat.set(indices, value)
    }
  })
}

class Ndarray {
  constructor(array, options={}) {
    const {dtype=null, source=null, shape=null, offset=null, strides=null} = options
    // This is a new ndarray from an array
    if (array) {
      const inputType = determineDtype(array)
      let inputData = inputType === Array ? flat(array) : array
      if (shape && inputData.length !== shape.reduce((a,e) => a * e, 1)) {
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
    // Else return the view
    selection.forEach((_, idx) => this.data[idx] = value)
  }

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

  forEach = (operation) => forEach(operation, this)
  map = (operation) => map(operation, this)
  values = () => values(this)
  copy = () => copy(this, ndarray)
  asType = (dtype) => asType(dtype, this, ndarray)
  avg = (axis) => avg(this, axis)
  sum = (axis) => sum(this, axis)
  min = () => min(this)
  max = () => max(this)
  add = (other, inplace=false) => add(this, other, inplace)
  sub = (other, inplace=false) => sub(this, other, inplace)
  div = (other, inplace=false) => div(this, other, inplace)
  mul = (other, inplace=false) => mul(this, other, inplace)
  pow = (other, inplace=false) => pow(this, other, inplace)
  eq = (other) => eq(other, this)
  neq = (other) => neq(other, this)
  lt = (other) => lt(other, this)
  gt = (other) => gt(other, this)
  le = (other) => le(other, this)
  ge = (other) => ge(other, this)

}

const ndarray = (array, options) => {
  return new Ndarray(array, options)
}

export default ndarray