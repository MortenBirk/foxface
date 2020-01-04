export const copy = (mat, ndarray) => {
  const source = mat.dtype.from(mat.values())
  return ndarray(source, {dtype: mat.dtype, shape: [...mat.shape]})
}

export const asType = (dtype, mat, ndarray) => {
  const source = dtype.from(mat.values())
  return ndarray(source, {dtype, shape: [...mat.shape]})
}

// Return all elements in the ndarray as a flat list
export const values = (mat) => {
  let result = []
  mat.forEach((x) => result.push(x))
  return result
}