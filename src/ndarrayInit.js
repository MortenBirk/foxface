import ndarray from './ndarray'

/**
 * Create a new {Ndarray} containing zeros
 * @func
 * @param {NdarrayOptions} options Define creation options of the array.
 * @returns {Ndarray}
 * @example
 * const arr = zeros({dtype: Float32Array, shape: [5, 2, 3]})
 * arr.shape
 * // [5,2,3]
 * arr.dtype
 * // Float32Array
 */
export const zeros = (options) => {
  return full(0, options)
}

/**
 * Create a new {Ndarray} containing ones
 * @func
 * @param {NdarrayOptions} options Define creation options of the array.
 * @returns {Ndarray}
 * @example
 * const arr = ones({dtype: Float32Array, shape: [5, 2, 3]})
 * arr.shape
 * // [5,2,3]
 * arr.dtype
 * // Float32Array
 */
export const ones = (options) => {
  return full(1, options)
}

/**
 * Create a new {Ndarray} containing the specified values
 * @func
 * @param {number} value The value to fill the Ndarray with.
 * @param {NdarrayOptions} options Define creation options of the array.
 * @returns {Ndarray}
 * @example
 * const arr = full(5, {dtype: Float32Array, shape: [5, 2, 3]})
 * arr.shape
 * // [5,2,3]
 * arr.dtype
 * // Float32Array
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
 * Create a new {Ndarray} containing zeros, with same shape and dtype as the provided Ndarray
 * @func
 * @param {Ndarray} other Define creation options of the array.
 * @returns {Ndarray}
 * @example
 * const ones = ones({dtype: Float32Array, shape: [5, 2, 3]})
 * const arr = zerosLike(ones)
 * arr.shape
 * // [5,2,3]
 * arr.dtype
 * // Float32Array
 */
export const zerosLike = (other) => {
  return full(0, { dtype: other.dtype, shape: other.shape.slice() })
}
