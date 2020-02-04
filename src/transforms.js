export const copy = (mat, ndarray) => {
  const source = mat.dtype.from(mat.values())
  return ndarray(source, { dtype: mat.dtype, shape: [...mat.shape] })
}

export const asType = (dtype, mat, ndarray) => {
  const source = dtype.from(mat.values())
  return ndarray(source, { dtype, shape: [...mat.shape] })
}

// Return all elements in the ndarray as a flat list
export const values = (mat) => {
  const result = []
  mat.forEach((x) => result.push(x))
  return result
}

// Convert Ndarray to an array of arrays (basically export to regular javascript)
export const toList = (mat) => {
  if (mat.shape.length === 1) {
    return mat.values()
  }
  const result = []
  mat.forEach((value, _, index) => {
    let current = result
    index.forEach((entry, idx) => {
      if (idx === index.length - 1) {
        return
      }
      if (!current[entry]) {
        current[entry] = []
      }
      current = current[entry]
    })
    current[index[index.length - 1]] = value
  })
  return result
}
