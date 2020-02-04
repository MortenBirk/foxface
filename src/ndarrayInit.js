import ndarray from './ndarray'

/**
 * Create a new Ndarray containing zeros
 * @category Array creation
 * @param {NdarrayOptions} options Define creation options of the array.
 * @returns {Ndarray}
 */
export const zeros = (options) => {
  return full(0, options)
}

/**
 * Create a new Ndarray containing ones
 * @category Array creation
 * @param {NdarrayOptions} options Define creation options of the array.
 * @returns {Ndarray}
 */
export const ones = (options) => {
  return full(1, options)
}

/**
 * Create a new Ndarray containing the specified values
 * @category Array creation
 * @param {number} value The value to fill the Ndarray with.
 * @param {NdarrayOptions} options Define creation options of the array.
 * @returns {Ndarray}
 */
export const full = (value, options = {}) => {
  const { dtype = Float64Array, shape = null } = options
  if (shape === null) {
    throw new TypeError('A shape option must be specified')
  }
  const length = shape.reduce((acc, e) => acc * e, 1)
  const data = dtype.from({ length: length }, () => value)
  return ndarray(data, { shape })
}

/**
 * Create a new Ndarray containing zeros, with same shape and dtype as the provided Ndarray
 * @category Array creation
 * @param {Ndarray} other Define creation options of the array.
 * @returns {Ndarray}
 */
export const zerosLike = (other) => {
  return full(0, { dtype: other.dtype, shape: other.shape.slice() })
}
