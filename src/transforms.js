export const copy = (mat, matrix) => {
  const source = mat.dtype.from(mat.values())
  return matrix(source, {dtype: mat.dtype, shape: [...mat.shape]})
}

export const asType = (dtype, mat, matrix) => {
  const source = dtype.from(mat.values())
  return matrix(source, {dtype, shape: [...mat.shape]})
}

// Return all elements in the matrix as a flat list
export const values = (mat) => {
  let result = []
  mat.forEach((x) => result.push(x))
  return result
}