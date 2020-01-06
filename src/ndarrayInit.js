import ndarray from './ndarray'

export const zeros = (options) => {
  return full(0, options)
}

export const ones = (options) => {
  return full(1, options)
}

export const full = (value, options = {}) => {
  const { dtype = Float64Array, shape = null } = options
  if (shape === null) {
    throw new TypeError('A shape option must be specified')
  }
  const length = shape.reduce((acc, e) => acc * e, 1)
  const data = dtype.from({ length: length }, () => value)
  return ndarray(data, { shape })
}

export const zerosLike = (other) => {
  return full(0, { dtype: other.dtype, shape: other.shape.slice() })
}
