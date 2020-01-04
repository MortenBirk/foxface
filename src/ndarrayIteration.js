
// Apply a function to all elements in a ndarray
export const forEach = (operation, mat) => {
  const next = mat.shape.map(() => 0)
  let hasNext = true
  while (hasNext) {

    // Apply operation to the current value
    const val = mat.get(...next)
    operation(val, mat.getBufferIdx(next), next)

    // Select the next element to iterate over in the following order for shape(1,1,1) -> [0,0,0] [0,0,1] [0,1,0] [0,1,1] [1,0,0] [1,0,1] [1,1,1]
    // mat will read the elements sequentially given the default configuration (mat should give some speed on elements which are not reshaped or transposed)
    let shapeEntry = mat.shape.length - 1
    while (true) {
      next[shapeEntry] += 1
      if (next[shapeEntry] >= mat.shape[shapeEntry]) {
        if (shapeEntry === 0) {
          hasNext = false
        }
        for (let x = shapeEntry; x < mat.shape.length; x++) {
          next[x] = 0
        }
        shapeEntry -= 1
      }
      else {
        break
      }
    }
  }
}

// Apply a function to a copy of a ndarray and return that ndarray
export const map = (operation, mat) => {
  mat = mat.copy()
  mat.forEach((val, idx, entry) => mat.data[idx] = operation(val, idx, entry))
  return mat
}