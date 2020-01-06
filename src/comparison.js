export const eq = (other, mat) => {
  if (typeof other === 'number') {
    return mat.map((e) => e === other ? 1 : 0)
  }
  return mat.map((e, _, entry) => e === other.data[other.getBufferIdx(entry)] ? 1 : 0)
}

export const neq = (other, mat) => {
  if (typeof other === 'number') {
    return mat.map((e) => e !== other ? 1 : 0)
  }
  return mat.map((e, _, entry) => e !== other.data[other.getBufferIdx(entry)] ? 1 : 0)
}

export const gt = (other, mat) => {
  if (typeof other === 'number') {
    return mat.map((e) => e > other ? 1 : 0)
  }
  return mat.map((e, _, entry) => e > other.data[other.getBufferIdx(entry)] ? 1 : 0)
}

export const ge = (other, mat) => {
  if (typeof other === 'number') {
    return mat.map((e) => e >= other ? 1 : 0)
  }
  return mat.map((e, _, entry) => e >= other.data[other.getBufferIdx(entry)] ? 1 : 0)
}

export const lt = (other, mat) => {
  if (typeof other === 'number') {
    return mat.map((e) => e < other ? 1 : 0)
  }
  return mat.map((e, _, entry) => e < other.data[other.getBufferIdx(entry)] ? 1 : 0)
}

export const le = (other, mat) => {
  if (typeof other === 'number') {
    return mat.map((e) => e <= other ? 1 : 0)
  }
  return mat.map((e, _, entry) => e <= other.data[other.getBufferIdx(entry)] ? 1 : 0)
}
