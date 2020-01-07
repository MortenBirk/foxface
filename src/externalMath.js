export const add = (mat, other, inplace) => {
  if (!inplace) {
    if (typeof other === 'number') {
      return mat.map((e) => e + other)
    }
    return mat.map((e, _, entry) => e + other.data[other.getBufferIdx(entry)])
  }

  if (typeof other === 'number') {
    mat.forEach((e, bufferIdx, _) => (mat.data[bufferIdx] = e + other))
    return
  }
  mat.forEach((e, bufferIdx, entry) => (mat.data[bufferIdx] = e + other.data[other.getBufferIdx(entry)]))
}

export const sub = (mat, other, inplace) => {
  if (!inplace) {
    if (typeof other === 'number') {
      return mat.map((e) => e - other)
    }
    return mat.map((e, _, entry) => e - other.data[other.getBufferIdx(entry)])
  }

  if (typeof other === 'number') {
    mat.forEach((e, bufferIdx, _) => (mat.data[bufferIdx] = e - other))
    return
  }
  mat.forEach((e, bufferIdx, entry) => (mat.data[bufferIdx] = e - other.data[other.getBufferIdx(entry)]))
}

export const div = (mat, other, inplace) => {
  if (!inplace) {
    if (typeof other === 'number') {
      return mat.map((e) => e / other)
    }
    return mat.map((e, _, entry) => e / other.data[other.getBufferIdx(entry)])
  }

  if (typeof other === 'number') {
    mat.forEach((e, bufferIdx, _) => (mat.data[bufferIdx] = e / other))
    return
  }
  mat.forEach((e, bufferIdx, entry) => (mat.data[bufferIdx] = e / other.data[other.getBufferIdx(entry)]))
}

export const mul = (mat, other, inplace) => {
  if (!inplace) {
    if (typeof other === 'number') {
      return mat.map((e) => e * other)
    }
    return mat.map((e, _, entry) => e * other.data[other.getBufferIdx(entry)])
  }

  if (typeof other === 'number') {
    mat.forEach((e, bufferIdx, _) => (mat.data[bufferIdx] = e * other))
    return
  }
  mat.forEach((e, bufferIdx, entry) => (mat.data[bufferIdx] = e * other.data[other.getBufferIdx(entry)]))
}

export const pow = (mat, other, inplace) => {
  if (!inplace) {
    if (typeof other === 'number') {
      return mat.map((e) => e ** other)
    }
    return mat.map((e, _, entry) => e ** other.data[other.getBufferIdx(entry)])
  }

  if (typeof other === 'number') {
    mat.forEach((e, bufferIdx, _) => (mat.data[bufferIdx] = e ** other))
    return
  }
  mat.forEach((e, bufferIdx, entry) => (mat.data[bufferIdx] = e ** other.data[other.getBufferIdx(entry)]))
}
