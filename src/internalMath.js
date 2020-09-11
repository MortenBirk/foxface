import { zerosLike } from './ndarrayInit'
import ndarray, { Ndarray } from './ndarray'

export const avg = (mat, axis = null) => {
  if (axis < 0) {
    axis = axis + mat.shape.length
  }
  const sum = mat.sum(axis)
  if (sum instanceof Ndarray) {
    sum.div(mat.shape[axis], true)
    return sum
  }
  return sum / mat.length
}

export const median = (mat, axis = null) => {
  const medianOfList = (l) => {
    const sorted = l.sort((a, b) => a - b)
    const center = Math.floor(sorted.length / 2)
    return sorted.length % 2 ? sorted[center] : (sorted[center - 1] + sorted[center]) / 2
  }

  if (axis !== null && axis !== undefined) {
    if (axis < 0) {
      axis = axis + mat.shape.length
    }
    const seen = {}
    mat.forEach((e, _, matIndex) => {
      const entryName = matIndex.filter((e, idx) => idx !== axis) + ''
      if (seen[entryName]) {
        seen[entryName].push(e)
      } else {
        seen[entryName] = [e]
      }
    })
    return ndarray(Object.values(seen).map(e => medianOfList(e)), { dtype: mat.dtype, shape: mat.shape.filter((e, idx) => idx !== axis) })
  }
  return medianOfList(mat.values())
}

export const variance = (mat, axis = null) => {
  const avg = mat.avg(axis)
  // If broadcast is implemented this can be done much simpler
  if (axis !== null && axis !== undefined) {
    if (axis < 0) {
      axis = axis + mat.shape.length
    }
    const entry = mat.shape.map(e => [])
    entry[axis] = 0
    const res = zerosLike(mat.get(entry))
    for (let idx = 0; idx < mat.shape[axis]; idx++) {
      entry[axis] = idx
      res.add(mat.get(entry).sub(avg).pow(2), true)
    }
    res.div(mat.shape[axis], true)
    return res
  }

  return mat.sub(avg).pow(2).avg(axis)
}

export const std = (mat, axis = null) => {
  const v = mat.variance(axis)
  if (v instanceof Ndarray) {
    return v.map(val => Math.sqrt(val))
  }
  return Math.sqrt(v)
}

export const mad = (mat, axis = null) => {
  const med = mat.median(axis)

  // If broadcast is implemented this can be done much simpler
  if (axis !== null && axis !== undefined) {
    if (axis < 0) {
      axis = axis + mat.shape.length
    }

    const entry = mat.shape.map(e => [])
    entry[axis] = 0
    const res = mat.map((e, _, matIdx) => {
      const medIdx = matIdx.filter((e, idx) => idx !== axis)
      return Math.abs(e - med.get(medIdx))
    })
    return res.median(axis)
  }

  return mat.sub(med).abs().median()
}

export const sum = (mat, axis = null) => {
  if (axis !== null && axis !== undefined) {
    if (axis < 0) {
      axis = axis + mat.shape.length
    }
    // If broadcast is implemented this can be done much simpler
    const entry = mat.shape.map(e => [])
    entry[axis] = 0
    const res = zerosLike(mat.get(entry))
    for (let idx = 0; idx < mat.shape[axis]; idx++) {
      entry[axis] = idx
      res.add(mat.get(entry), true)
    }
    return res
  }
  return mat.values().reduce((a, e) => a + e, 0)
}

export const abs = (mat) => mat.map(val => Math.abs(val))

export const min = (mat) => mat.values().reduce((acc, e) => e < acc ? e : acc, Number.POSITIVE_INFINITY)

export const max = (mat) => mat.values().reduce((acc, e) => e > acc ? e : acc, Number.NEGATIVE_INFINITY)
