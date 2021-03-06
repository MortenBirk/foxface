import ndarray from './ndarray'

describe('astype', () => {
  it('can convert Float32Array to Array', () => {
    const inData = Float32Array.from({ length: 5 * 7 * 2 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [5, 7, 2] })

    const copy = mat.asType(Array)

    expect(mat.dtype).toEqual(Float32Array)
    expect(copy.dtype).toEqual(Array)
  })

  it('can convert Array to Float32Array', () => {
    const inData = Array.from({ length: 5 * 7 * 2 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [5, 7, 2] })

    const copy = mat.asType(Float32Array)

    expect(mat.dtype).toEqual(Array)
    expect(copy.dtype).toEqual(Float32Array)
  })

  it('can convert Uint8Array to Float32Array', () => {
    const inData = Uint8Array.from({ length: 5 * 7 * 2 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [5, 7, 2] })

    const copy = mat.asType(Float32Array)

    expect(mat.dtype).toEqual(Uint8Array)
    expect(copy.dtype).toEqual(Float32Array)
  })

  it('Changing the datatype will copy the dataset to a new buffer', () => {
    const inData = Uint8Array.from({ length: 5 * 7 * 2 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [5, 7, 2] })

    const copy = mat.asType(Float32Array)
    expect(mat.dtype).toEqual(Uint8Array)
    expect(copy.dtype).toEqual(Float32Array)
    const previousVal = mat.get([3, 2, 1])
    mat.set([3, 2, 1], 1)
    expect(mat.get([3, 2, 1])).toBe(1)
    expect(copy.get([3, 2, 1])).toBe(previousVal)
  })
})

describe('copy', () => {
  it('Copying a typed array dataset makes it work on another buffer', () => {
    const inData = Float32Array.from({ length: 2 * 4 * 2 }, (_, idx) => idx)
    const flatData = Array.from(inData)
    const mat = ndarray(inData, { shape: [2, 4, 2] })

    const copy = mat.copy()

    expect(mat.values()).toEqual(flatData)
    expect(copy.values()).toEqual(flatData)

    mat.set([], 5)
    expect(copy.values()).toEqual(flatData)
    copy.set([], 10)
    expect(copy.values()).toEqual(Array.from({ length: 2 * 4 * 2 }, () => 10))
    expect(mat.values()).toEqual(Array.from({ length: 2 * 4 * 2 }, () => 5))
  })

  it('Copying an Array dataset makes it work on another buffer', () => {
    const inData = Array.from({ length: 5 * 3 * 2 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [5, 3, 2] })

    const copy = mat.copy()

    expect(mat.values()).toEqual(inData)
    expect(copy.values()).toEqual(inData)

    mat.set([], 5)
    expect(copy.values()).toEqual(inData)
    copy.set([], 10)
    expect(copy.values()).toEqual(Array.from({ length: 5 * 3 * 2 }, () => 10))
    expect(mat.values()).toEqual(Array.from({ length: 5 * 3 * 2 }, () => 5))
  })
})

describe('values', () => {
  it('extracts all values of a ndarray', () => {
    const inData = Array.from({ length: 5 * 10 * 3 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [5, 10, 3] })
    expect(mat.values()).toEqual(inData)
  })

  it('extracts all values of a view', () => {
    const inData = Array.from({ length: 20 * 15 * 3 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [20, 15, 3] })
    const view = mat.get([5, [7, 11], 1])
    expect(view.values()).toEqual([247, 250, 253, 256])
  })
})

describe('toList', () => {
  it('Extract all values of a flat array', () => {
    const inData = [1, 2, 6, 4, 3, 12, 3, -2, 22]
    const mat = ndarray(new Float32Array([1, 2, 6, 4, 3, 12, 3, -2, 22]))
    expect(mat.toList()).toEqual(inData)
  })

  it('Extract all values of a 2d array', () => {
    const inData = [[1, 2, 6], [4, 3, 12], [3, -2, 22]]
    const mat = ndarray(inData)
    expect(mat.toList()).toEqual(inData)
  })

  it('Extracts all values of a 3d array', () => {
    const inData = [[[1, 2, 3], [4, 5, 6]], [[7, 8, 9], [10, 11, 12]], [[13, 14, 15], [16, 17, 18]], [[19, 20, 21], [22, 23, 24]], [[25, 26, 27], [28, 29, 30]], [[31, 32, 33], [34, 35, 36]]]
    const mat = ndarray(inData)
    expect(mat.toList()).toEqual(inData)
  })
})
