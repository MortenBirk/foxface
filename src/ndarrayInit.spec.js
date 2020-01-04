import ndarray from './ndarray'
import { full, zeros, ones, zeros_like } from './ndarrayInit'


describe('full', () => {
  it('Correctly fills a flat float64 array with 5 if no dtype is specified', () => {
    const mat = full(5, {shape: [3]})
    expect(mat.values()).toEqual([5, 5, 5])
    expect(mat.shape).toEqual([3])
    expect(mat.dtype).toBe(Float64Array)
  })

  it('Correctly fills a nd float64 array with 3 if no dtype is specified', () => {
    const mat = full(5, {shape: [2, 3, 4]})
    expect(mat.values()).toEqual([5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5])
    expect(mat.shape).toEqual([2, 3, 4])
    expect(mat.dtype).toBe(Float64Array)
  })

  it('Correctly fills a nd Int16 array with 5 if no Int16 is specified', () => {
    const mat = full(5, {dtype: Int16Array, shape: [2, 3, 4]})
    expect(mat.values()).toEqual([5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5])
    expect(mat.shape).toEqual([2, 3, 4])
    expect(mat.dtype).toBe(Int16Array)
  })

  it('Throws an error if no shape is specified', () => {
    expect(() => full(123)).toThrow(TypeError)
  })
})

describe('Zeros', () => {
  it('Correctly fills a nd float64 array with 0 if no dtype is specified', () => {
    const mat = zeros({shape: [2, 3, 4]})
    expect(mat.values()).toEqual([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
    expect(mat.shape).toEqual([2, 3, 4])
    expect(mat.dtype).toBe(Float64Array)
  })

  it('Correctly fills a nd Int16 array with 0 if no Int16 is specified', () => {
    const mat = zeros({dtype: Int16Array, shape: [2, 2, 2]})
    expect(mat.values()).toEqual([0,0,0,0,0,0,0,0])
    expect(mat.shape).toEqual([2, 2, 2])
    expect(mat.dtype).toBe(Int16Array)
  })

  it('zeros_like corectly uses the reference objects shape and dtype', () => {
    const mat = ndarray([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23], {shape: [2, 3, 4], dtype: Int16Array})
    const zeros = zeros_like(mat)
    expect(zeros.values()).toEqual([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
    expect(zeros.shape).toEqual([2, 3, 4])
    expect(zeros.dtype).toBe(Int16Array)
  })

  it('Throws an error if no shape is specified', () => {
    expect(() => zeros()).toThrow(TypeError)
  })
})

describe('Ones', () => {
  it('Correctly fills a nd float64 array with 0 if no dtype is specified', () => {
    const mat = ones({shape: [2, 3, 4]})
    expect(mat.values()).toEqual([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1])
    expect(mat.shape).toEqual([2, 3, 4])
    expect(mat.dtype).toBe(Float64Array)
  })

  it('Correctly fills a nd Int16 array with 0 if no Int16 is specified', () => {
    const mat = ones({dtype: Int16Array, shape: [2, 2, 2]})
    expect(mat.values()).toEqual([1,1,1,1,1,1,1,1])
    expect(mat.shape).toEqual([2, 2, 2])
    expect(mat.dtype).toBe(Int16Array)
  })

  it('Throws an error if no shape is specified', () => {
    expect(() => ones()).toThrow(TypeError)
  })
})