import { stack } from './stack'
import { full } from './ndarrayInit'

describe('ndarray stack', () => {
  it('Fails if an array is not provided', () => {
    const first = full(1, { shape: [2, 3, 4] })
    expect(() => stack(first)).toThrow(TypeError('ndarrays must be a list of ndarrays'))
  })

  it('Fails if the input array contains none ndarray entries', () => {
    const first = full(1, { shape: [2, 3, 4] })
    expect(() => stack([first, 6, 'something'])).toThrow(TypeError('ndarrays must be a list of ndarrays'))
  })

  it('Fails if the input array contains ndarrays with different dtypes', () => {
    const first = full(1, { shape: [2, 3, 4] })
    const second = full(2, { shape: [2, 3, 4], dtype: Uint8ClampedArray })
    expect(() => stack([first, second])).toThrow(TypeError('ndarrays must all have the same dtype'))
  })

  it('Fails if the input array contains ndarrays with different shapes', () => {
    const first = full(1, { shape: [2, 3, 4] })
    const second = full(2, { shape: [2, 5, 4] })
    expect(() => stack([first, second])).toThrow(TypeError('ndarrays must all have the same shape'))
  })

  it('Fails if the axis is larger than length of shape', () => {
    const first = full(1, { shape: [2, 3, 4] })
    const second = full(2, { shape: [2, 3, 4] })
    expect(() => stack([first, second], 4)).toThrow(TypeError('axis can not be larger than 3 for shape 2,3,4'))
  })

  it('Fails if the axis is larger smaller than -1', () => {
    const first = full(1, { shape: [2, 3, 4] })
    const second = full(2, { shape: [2, 3, 4] })
    expect(() => stack([first, second], -2)).toThrow(TypeError('negative axis can only be -1 to indicate last dimension'))
  })

  it('Has correct shape and length for first dimension stacking', () => {
    const first = full(1, { shape: [5, 3, 4] })
    const second = full(2, { shape: [5, 3, 4] })
    const stacked = stack([first, second])
    expect(stacked.shape).toEqual([2, 5, 3, 4])
  })

  it('Has correct shape and length for last dimension stacking with -1', () => {
    const first = full(1, { shape: [5, 3, 4] })
    const second = full(2, { shape: [5, 3, 4] })
    const stacked = stack([first, second], -1)
    expect(stacked.shape).toEqual([5, 3, 4, 2])
  })

  it('Has correct shape and length for last dimension stacking with length + 1', () => {
    const first = full(1, { shape: [5, 3, 4] })
    const second = full(2, { shape: [5, 3, 4] })
    const stacked = stack([first, second], 3)
    expect(stacked.shape).toEqual([5, 3, 4, 2])
  })

  it('Has correct shape and length for inner dimension stacking using positive axis', () => {
    const first = full(1, { shape: [5, 3, 4] })
    const second = full(2, { shape: [5, 3, 4] })
    const stacked = stack([first, second], 1)
    expect(stacked.shape).toEqual([5, 2, 3, 4])
  })

  it('Is the inverse of extracting single elements along the first axis', () => {
    const first = full(1, { shape: [5, 2, 4] })
    const second = full(2, { shape: [5, 2, 4] })
    const third = full(3, { shape: [5, 2, 4] })
    const stacked = stack([first, second, third])
    expect(stacked.get([0]).toList()).toEqual(first.toList())
    expect(stacked.get([1]).toList()).toEqual(second.toList())
    expect(stacked.get([2]).toList()).toEqual(third.toList())
  })

  it('Is the inverse of extracting single elements along the last axis', () => {
    const first = full(1, { shape: [5, 2, 4] })
    const second = full(2, { shape: [5, 2, 4] })
    const third = full(3, { shape: [5, 2, 4] })
    const stacked = stack([first, second, third], -1)
    expect(stacked.get([[], [], [], 0]).toList()).toEqual(first.toList())
    expect(stacked.get([[], [], [], 1]).toList()).toEqual(second.toList())
    expect(stacked.get([[], [], [], 2]).toList()).toEqual(third.toList())
  })

  it('Is the inverse of extracting single elements along the second axis', () => {
    const first = full(1, { shape: [5, 2, 4] })
    const second = full(2, { shape: [5, 2, 4] })
    const third = full(3, { shape: [5, 2, 4] })
    const stacked = stack([first, second, third], 1)
    expect(stacked.get([[], 0, [], []]).toList()).toEqual(first.toList())
    expect(stacked.get([[], 1, [], []]).toList()).toEqual(second.toList())
    expect(stacked.get([[], 2, [], []]).toList()).toEqual(third.toList())
  })
})
