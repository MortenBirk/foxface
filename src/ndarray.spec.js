import ndarray from './ndarray'

const data = [[[1, 2, 3], [4, 5, 6]], [[7, 8, 9], [10, 11, 12]], [[13, 14, 15], [16, 17, 18]], [[19, 20, 21], [22, 23, 24]], [[25, 26, 27], [28, 29, 30]], [[31, 32, 33], [34, 35, 36]]]
const flatData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]

describe('ndarray instantiation', () => {
  it('with 3d Array has correct shape and data', () => {
    const mat = ndarray(data)

    expect(mat.shape).toEqual([6, 2, 3])
    expect(mat.length).toBe(36)
    expect(Array.from(mat.data)).toEqual(flatData)
  })

  it('with 1d Array has correct shape and data', () => {
    const mat = ndarray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    expect(mat.shape).toEqual([10])
    expect(mat.length).toBe(10)
    expect(Array.from(mat.data)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })

  it('with simple 2d Array has correct shape and data', () => {
    const mat = ndarray([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]])
    expect(mat.shape).toEqual([1, 10])
    expect(mat.length).toBe(10)
    expect(Array.from(mat.data)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })

  it('with Regular 2d Array has correct shape and data', () => {
    const mat = ndarray([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]])
    expect(mat.shape).toEqual([2, 5])
    expect(mat.length).toBe(10)
    expect(Array.from(mat.data)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })

  it('with simple 4d Array has correct shape and data', () => {
    const mat = ndarray([[[[1], [2]], [[3], [4]], [[5], [6]], [[7], [8]], [[9], [10]]]])
    expect(mat.shape).toEqual([1, 5, 2, 1])
    expect(mat.length).toBe(10)
    expect(Array.from(mat.data)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })

  it('from flat array with provided shape is initialized correctly', () => {
    const inData = Array.from({ length: 4 * 2 * 2 * 5 * 3 * 2 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [4, 2, 2, 5, 3, 2] })
    expect(mat.shape).toEqual([4, 2, 2, 5, 3, 2])
    expect(mat.length).toBe(inData.length)
    expect(Array.from(mat.data)).toEqual(inData)
  })

  it('from flat large array with provided shape is initialized correctly', () => {
    const inData = Array.from({ length: 30 * 15 * 3 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [30, 15, 3] })
    expect(mat.shape).toEqual([30, 15, 3])
    expect(mat.length).toBe(inData.length)
    expect(Array.from(mat.data)).toEqual(inData)
  })

  it('from flat large array with provided shape of high dim is initialized correctly', () => {
    const inData = Array.from({ length: 4 * 2 * 3 * 5 * 3 * 2 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [4, 2, 3, 5, 3, 2] })
    expect(mat.shape).toEqual([4, 2, 3, 5, 3, 2])
    expect(mat.length).toBe(inData.length)
    expect(Array.from(mat.data)).toEqual(inData)
  })

  it('can instantiate as Int8Array', () => {
    const inData = Int8Array.from({ length: 3 * 3 * 3 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [3, 3, 3] })

    expect(mat.values()).toEqual(Array.from(inData))
    expect(mat.shape).toEqual([3, 3, 3])
    expect(mat.length).toBe(27)
    expect(mat.dtype).toEqual(Int8Array)
    expect(mat.data instanceof Int8Array).toBe(true)
  })

  it('can instantiate as UInt8Array', () => {
    const inData = Uint8Array.from({ length: 3 * 3 * 3 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [3, 3, 3] })

    expect(mat.values()).toEqual(Array.from(inData))
    expect(mat.shape).toEqual([3, 3, 3])
    expect(mat.length).toBe(27)
    expect(mat.dtype).toEqual(Uint8Array)
    expect(mat.data instanceof Uint8Array).toBe(true)
  })

  it('can instantiate as Float32Array', () => {
    const inData = Float32Array.from({ length: 3 * 3 * 3 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [3, 3, 3] })

    expect(mat.values()).toEqual(Array.from(inData))
    expect(mat.shape).toEqual([3, 3, 3])
    expect(mat.length).toBe(27)
    expect(mat.dtype).toEqual(Float32Array)
    expect(mat.data instanceof Float32Array).toBe(true)
  })

  it('can instantiate an Array as dtype Float32Arrray', () => {
    const inData = Array.from({ length: 3 * 3 * 3 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [3, 3, 3], dtype: Float32Array })

    expect(mat.values()).toEqual(Array.from(inData))
    expect(mat.shape).toEqual([3, 3, 3])
    expect(mat.length).toBe(27)
    expect(mat.dtype).toEqual(Float32Array)
    expect(mat.data instanceof Float32Array).toBe(true)
  })

  it('can instantiate a Float32Arrray as dtype Array', () => {
    const inData = Float32Array.from({ length: 3 * 3 * 3 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [3, 3, 3], dtype: Array })

    expect(mat.values()).toEqual(Array.from(inData))
    expect(mat.shape).toEqual([3, 3, 3])
    expect(mat.length).toBe(27)
    expect(mat.dtype).toEqual(Array)
    expect(mat.data instanceof Array).toBe(true)
  })

  it('with shape parameter not matching the input will throw error', () => {
    const inData = Float32Array.from({ length: 3 * 3 * 3 }, (_, idx) => idx)
    expect(() => ndarray(inData, { shape: [3, 5, 3], dtype: Array })).toThrow(RangeError)
  })

  it('with a source but without shape and strides will throw an error', () => {
    const mat = ndarray(data)
    expect(() => ndarray(null, { source: mat })).toThrow(TypeError)
  })
})

describe('ndarray get', () => {
  it('Extracting view from array has correct shape and data', () => {
    const mat = ndarray(data)
    const view = mat.get([[1, 3], [], [2, 3]])

    expect(view.shape).toEqual([2, 2, 1])
    expect(view.length).toBe(4)

    const expectedValues = [9, 12, 15, 18]
    const out = []
    for (let row = 0; row < view.shape[0]; row++) {
      for (let col = 0; col < view.shape[1]; col++) {
        for (let chan = 0; chan < view.shape[2]; chan++) {
          out.push(view.get([row, col, chan]))
        }
      }
    }
    expect(out).toEqual(expectedValues)
  })

  it('Extracting a specific entry in a view squeezes the shape', () => {
    const mat = ndarray(data)
    const view = mat.get([2, [], 2])

    expect(view.shape).toEqual([2])

    const expectedValues = [15, 18]
    const out = []
    for (let col = 0; col < view.shape[0]; col++) {
      out.push(view.get([col]))
    }
    expect(out).toEqual(expectedValues)
  })

  it('Extracting a view from a view correctly selects data', () => {
    const inData = Array.from({ length: 20 * 15 * 3 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [20, 15, 3] })
    const view1 = mat.get([[0, 10], [], [0, 1]])
    expect(view1.shape).toEqual([10, 15, 1])

    const view2 = view1.get([[2, 5], [1, 4], 0])

    expect(view2.shape).toEqual([3, 3])
    const out = view2.values()
    expect(out).toEqual([93, 96, 99, 138, 141, 144, 183, 186, 189])
  })

  it('Extracting a view from a squeezed view correctly selects data', () => {
    const inData = Array.from({ length: 20 * 15 * 3 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [20, 15, 3] })
    const view1 = mat.get([5, [5, 15], 1])
    expect(view1.shape).toEqual([10])

    const out1 = mat.get([5, [7, 11], 1]).values()
    expect(out1).toEqual([247, 250, 253, 256])

    const view2 = view1.get([[2, 6]])

    expect(view2.shape).toEqual([4])
    const out2 = view2.values()

    expect(out2).toEqual([247, 250, 253, 256])
    expect(out2).toEqual(out1)
  })

  it('Providing fever arguments the the ndarray rank, will automatically select everything from missing dimensions', () => {
    const inData = Array.from({ length: 10 * 5 * 2 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [10, 5, 2] })

    expect(mat.get([5]).shape).toEqual([5, 2])
    expect(mat.get([[1, 5]]).shape).toEqual([4, 5, 2])
    expect(mat.get([[1, 5], 2]).shape).toEqual([4, 2])
    expect(mat.get([2, [1, 3]]).shape).toEqual([2, 2])
    expect(mat.get([0, [1, 3]]).values()).toEqual([2, 3, 4, 5])
  })

  it('Providing more arguemtns then ndarray rank will throw an error', () => {
    const mat = ndarray(data)
    expect(() => mat.get([1, 1, 1, 1])).toThrow(RangeError)
  })

  it('Calling get with negative intergers properly return the correct value', () => {
    const mat = ndarray(data)
    expect(mat.get([-4, -1, -1])).toEqual(18)
  })

  it('Getting a view using negative intergers works properly', () => {
    const mat = ndarray(data)
    expect(mat.get([[-5, 3], -1, [0, -1]]).values()).toEqual([10, 11, 16, 17])
  })

  it('Calling get with only integers returns the value at the index', () => {
    const mat = ndarray(data)
    expect(mat.get([2, 1, 2])).toEqual(18)
  })

  it('Calling get with out of range integers will throw an error', () => {
    const mat = ndarray(data)
    expect(() => mat.get([2, 5, 2])).toThrow(RangeError)
  })

  it('Calling get for a view with out of range integers will throw an error', () => {
    const mat = ndarray(data)
    expect(() => mat.get([100, [], 2])).toThrow(RangeError)
  })

  it('Calling get with a range containing more than 2 values should throw an error', () => {
    const mat = ndarray(data)
    expect(() => mat.get([0, [0, 1, 2], 0])).toThrow(TypeError)
  })

  it('Calling get with a range containing only one values should throw an error', () => {
    const mat = ndarray(data)
    expect(() => mat.get([0, [0], 0])).toThrow(TypeError)
  })

  it('Calling get with a range larger than the shape should throw an error', () => {
    const mat = ndarray(data)
    expect(() => mat.get([0, [0, 20], 0])).toThrow(RangeError)
  })

  it('Calling get with a ndarray returns a new flat ndarray with the values at indexes with values in the selection ndarray larger than 0', () => {
    const mat = ndarray(data, { dtype: Float64Array })
    const selected = mat.get(mat.ge(30))
    expect(selected.values()).toEqual([30, 31, 32, 33, 34, 35, 36])
    expect(selected.shape).toEqual([7])
    expect(selected.dtype).toBe(Float64Array)
  })
})

describe('ndarray set', () => {
  it('Setting a value at a specific index properly updates the buffer data', () => {
    const inData = Array.from({ length: 10 * 5 * 2 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [10, 5, 2] })

    expect(mat.get([5, 3, 1])).toBe(57)
    mat.set([5, 3, 1], 2.343)
    expect(mat.get([5, 3]).values()).toEqual([56, 2.343])
  })

  it('Setting a value at a view properly update all values in view', () => {
    const inData = Array.from({ length: 3 * 3 * 2 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [3, 3, 2] })

    expect(mat.get([1]).values()).toEqual([6, 7, 8, 9, 10, 11])
    mat.set([1], 3.21)
    expect(mat.get([1]).values()).toEqual([3.21, 3.21, 3.21, 3.21, 3.21, 3.21])
    expect(mat.values()).toEqual([0, 1, 2, 3, 4, 5, 3.21, 3.21, 3.21, 3.21, 3.21, 3.21, 12, 13, 14, 15, 16, 17])
  })

  it('Calling set with a ndarray updates the ndarray values at indexes with values in the selection ndarray larger than 0', () => {
    const mat = ndarray(data, { dtype: Float64Array })
    mat.set(mat.lt(30), 5)
    expect(mat.values()).toEqual([5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 30, 31, 32, 33, 34, 35, 36])
    expect(mat.shape).toEqual([6, 2, 3])
    expect(mat.dtype).toBe(Float64Array)
  })
})
