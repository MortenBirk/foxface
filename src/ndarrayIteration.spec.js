import ndarray from './ndarray'

const data = [[[1, 2, 3], [4, 5, 6]], [[7, 8, 9], [10, 11, 12]], [[13, 14, 15], [16, 17, 18]], [[19, 20, 21], [22, 23, 24]], [[25, 26, 27], [28, 29, 30]], [[31, 32, 33], [34, 35, 36]]]
const flatData = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]

describe('ndarray iteration', () => {
  it('forEach applies to all elements in a ndarray', () => {
    const mat = ndarray(data)

    const out = []
    mat.forEach((e) => out.push(e))
    expect(out).toEqual(flatData)
  })

  it('forEach applies to all elements in a 1D array', () => {
    const mat = ndarray([1,2,3,4,5,6,7,8,9,10])

    const out = []
    mat.forEach((e) => out.push(e))
    expect(out).toEqual([1,2,3,4,5,6,7,8,9,10])
  })

  it('forEach applies to all elements in a view', () => {
    const mat = ndarray(data)
    const view = mat.get([1,3],[],[2,3])

    const out = []
    const expectedValues = [9, 12, 15, 18]
    view.forEach((e) => out.push(e))
    expect(out).toEqual(expectedValues)
  })

  it('map applies to all elements and return a new ndarray with a new buffer', () => {
    const mat = ndarray([1,2,3,4,5,6,7,8,9,10])

    const mapped = mat.map((e) => e + 1)
    expect(mat.values()).toEqual([1,2,3,4,5,6,7,8,9,10])
    expect(mapped.values()).toEqual([2,3,4,5,6,7,8,9,10,11])  
  })
})