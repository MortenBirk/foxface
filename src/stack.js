import { Ndarray } from './ndarray'
import { zeros } from './ndarrayInit'
import { shapesEqual } from './utils/compare'

const validate = (ndarrays, axis) => {
  if (!Array.isArray(ndarrays)) {
    throw new TypeError('ndarrays must be a list of ndarrays')
  }

  let dtype = null
  let shape = null
  ndarrays.forEach(e => {
    if (!(e instanceof Ndarray)) {
      throw new TypeError('ndarrays must be a list of ndarrays')
    }
    if (dtype !== null && dtype !== e.dtype) {
      throw new TypeError('ndarrays must all have the same dtype')
    }
    dtype = e.dtype
    if (shape !== null && !shapesEqual(shape, e.shape)) {
      throw new TypeError('ndarrays must all have the same shape')
    }
    shape = [...e.shape]
  })

  if (axis > shape.length) {
    throw new TypeError(`axis can not be larger than ${shape.length} for shape ${shape}`)
  }

  if (axis < -1) {
    throw new TypeError('negative axis can only be -1 to indicate last dimension')
  }
}

/**
 * Create a new Ndarray build from stacking a list of Ndarrays along a given axis
 * @category Array creation
 * @param {Ndarray[]} ndarrays A list of Ndarrays to stack
 * @param {Number} [axis = 0] The axis along which the Ndarrays should be stacked
 * @returns {Ndarray} The returned Ndarray will have a new dimension.
 */
export const stack = (ndarrays, axis = 0) => {
  // Validate that the entry is a list of ndarrays with the same dtype
  validate(ndarrays, axis)
  const dtype = ndarrays[0].dtype
  let shape = [...ndarrays[0].shape]

  // Initiate a new ndarray with the stacked shape
  if (axis === -1) {
    axis = shape.length
  }

  if (axis === shape.length) {
    shape.push(ndarrays.length)
  } else {
    shape = shape.reduce((acc, e, idx) => {
      if (idx === axis) {
        acc.push(ndarrays.length)
      }
      acc.push(e)
      return acc
    }, [])
  }

  let result = zeros({
    shape,
    dtype
  })

  // Notice that for some shapes this can be significantly optimized, since we could simply stack 2 buffers after each other

  // Now fill the ndarray with the given data
  result = result.map((value, bufferIdx, index) => {
    const inputNdarray = ndarrays[index[axis]]
    const selector = index.filter((_, idx) => idx !== axis)
    return inputNdarray.get(selector)
  })

  return result
}
