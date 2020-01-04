import { zeros_like } from './matrixInit'

export const avg = (mat, axis=null) => {
  if (axis !== null && axis !== undefined) {

    if (axis < 0) {
      axis = axis + mat.shape.length
    }

    let entry = mat.shape.map(e => [])
    entry[axis] = 0
    const res = zeros_like(mat.get(...entry))
    for (let idx = 0; idx < mat.shape[axis]; idx++) {
      entry[axis] = idx
      res.add(mat.get(...entry), true)
    }

    res.forEach((e, bufferIdx) => res.data[bufferIdx] = e / mat.shape[axis])
    return res
  }
  const values = mat.values()
  const sum = values.reduce((a, e) => a + e, 0)
  return sum / values.length
}

export const sum = (mat, axis=null) => {
  if (axis !== null && axis !== undefined) {

    if (axis < 0) {
      axis = axis + mat.shape.length
    }

    let entry = mat.shape.map(e => [])
    entry[axis] = 0
    const res = zeros_like(mat.get(...entry))
    for (let idx = 0; idx < mat.shape[axis]; idx++) {
      entry[axis] = idx
      res.add(mat.get(...entry), true)
    }

    return res
  }
  const values = mat.values()
  const sum = values.reduce((a, e) => a + e, 0)
  return sum
}

export const min = (mat) => {
  let min = Number.POSITIVE_INFINITY
  mat.forEach(e => {
    if (e < min) {
      min = e
    }
  })
  return min
}


export const max = (mat) => {
  let max = Number.NEGATIVE_INFINITY
  mat.forEach(e => {
    if (e > max) {
      max = e
    }
  })
  return max
}