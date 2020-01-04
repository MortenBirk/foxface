/**
 * Add a number or a ndarray to an existing ndarray
 * @param {ndarray} mat The ndarray
 * @param {ndarray} other Another  or a number
 * @param {boolean} inplace if falsy a new ndarray will be created, otherwize mat will be updated
 * @returns {ndarray|null} The updated ndarray if inplace is falsy, otherwize null
 */
export const add = (mat, other, inplace) => {

  if (!inplace) {
    if (typeof other === 'number') {
      return mat.map((e) => e + other)
    }
    return mat.map((e, _, entry) => e + other.data[other.getBufferIdx(entry)])
  }

  if (typeof other === 'number') {
    mat.forEach((e, bufferIdx, _) => mat.data[bufferIdx] = e + other)
    return 
  }
   mat.forEach((e, bufferIdx, entry) => mat.data[bufferIdx] = e + other.data[other.getBufferIdx(entry)])
}

export const sub = (mat, other, inplace) => {

  if (!inplace) {
    if (typeof other === 'number') {
      return mat.map((e) => e - other)
    }
    return mat.map((e, _, entry) => e - other.data[other.getBufferIdx(entry)])
  }

  if (typeof other === 'number') {
    mat.forEach((e, bufferIdx, _) => mat.data[bufferIdx] = e - other)
    return 
  }
   mat.forEach((e, bufferIdx, entry) => mat.data[bufferIdx] = e - other.data[other.getBufferIdx(entry)])
}

export const div = (mat, other, inplace) => {

  if (!inplace) {
    if (typeof other === 'number') {
      return mat.map((e) => e / other)
    }
    return mat.map((e, _, entry) => e / other.data[other.getBufferIdx(entry)])
  }

  if (typeof other === 'number') {
    mat.forEach((e, bufferIdx, _) => mat.data[bufferIdx] = e / other)
    return 
  }
   mat.forEach((e, bufferIdx, entry) => mat.data[bufferIdx] = e / other.data[other.getBufferIdx(entry)])
}

export const mul = (mat, other, inplace) => {

  if (!inplace) {
    if (typeof other === 'number') {
      return mat.map((e) => e * other)
    }
    return mat.map((e, _, entry) => e * other.data[other.getBufferIdx(entry)])
  }

  if (typeof other === 'number') {
    mat.forEach((e, bufferIdx, _) => mat.data[bufferIdx] = e * other)
    return 
  }
   mat.forEach((e, bufferIdx, entry) => mat.data[bufferIdx] = e * other.data[other.getBufferIdx(entry)])
}

export const pow = (mat, other, inplace) => {

  if (!inplace) {
    if (typeof other === 'number') {
      return mat.map((e) => e ** other)
    }
    return mat.map((e, _, entry) => e ** other.data[other.getBufferIdx(entry)])
  }

  if (typeof other === 'number') {
    mat.forEach((e, bufferIdx, _) => mat.data[bufferIdx] = e ** other)
    return 
  }
   mat.forEach((e, bufferIdx, entry) => mat.data[bufferIdx] = e ** other.data[other.getBufferIdx(entry)])
}