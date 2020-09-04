export const shapesEqual = (shapeA, shapeB) => {
  if (shapeA.length !== shapeB.length) {
    return false
  }

  for (let i = 0; i < shapeA.length; i++) {
    if (shapeA[i] !== shapeB[i]) {
      return false
    }
  }

  return true
}
