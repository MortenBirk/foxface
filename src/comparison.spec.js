import ndarray from './ndarray'


describe('eq', () => {
  it('finds equal numbers when compared with a scalar', () => {
    const inData = [0,1,2,3,4,5,6,7,5,9,10,11,12,13,14,15,16,5]
    const mat = ndarray(inData, {dtype: Float32Array, shape: [3,3,2]})
    const eq = mat.eq(5)
    expect(eq.shape).toEqual([3,3,2])
    expect(eq.values()).toEqual([0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1])
  })

  it('finds equal numbers when compared with a ndarray', () => {
    const mat = ndarray([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17], {dtype: Float32Array, shape: [3,3,2]})
    const comp = ndarray([0,0,0,3,0,0,0,7,0,0,1,1,1,13,1,1,16,17], {dtype: Float32Array, shape: [3,3,2]})
    const eq = mat.eq(comp)
    expect(eq.shape).toEqual([3,3,2])
    expect(eq.values()).toEqual([1,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,1,1])
  })
})


describe('neq', () => {
  it('finds non equal numbers when compared with a scalar', () => {
    const inData = [0,1,2,3,4,5,6,7,5,9,10,11,12,13,14,15,16,5]
    const mat = ndarray(inData, {dtype: Float32Array, shape: [3,3,2]})
    const eq = mat.neq(5)
    expect(eq.shape).toEqual([3,3,2])
    expect(eq.values()).toEqual([1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0])
  })

  it('finds non equal numbers when compared with a ndarray', () => {
    const mat = ndarray([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17], {dtype: Float32Array, shape: [3,3,2]})
    const comp = ndarray([0,0,0,3,0,0,0,7,0,0,1,1,1,13,1,1,16,17], {dtype: Float32Array, shape: [3,3,2]})
    const eq = mat.neq(comp)
    expect(eq.shape).toEqual([3,3,2])
    expect(eq.values()).toEqual([0,1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,0,0])
  })
})

describe('gt', () => {
  it('finds greater than numbers when compared with a scalar', () => {
    const inData = [0,1,2,3,4,5,6,7,5,9,10,11,12,13,14,15,16,5]
    const mat = ndarray(inData, {dtype: Float32Array, shape: [3,3,2]})
    const eq = mat.gt(5)
    expect(eq.shape).toEqual([3,3,2])
    expect(eq.values()).toEqual([0,0,0,0,0,0,1,1,0,1,1,1,1,1,1,1,1,0])
  })

  it('finds greater than numbers when compared with a ndarray', () => {
    const mat = ndarray([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17], {dtype: Float32Array, shape: [3,3,2]})
    const comp = ndarray([0,0,2,3,5,6,0,7,8,100,10,11,12,0,14,15,16,18], {dtype: Float32Array, shape: [3,3,2]})
    const eq = mat.gt(comp)
    expect(eq.shape).toEqual([3,3,2])
    expect(eq.values()).toEqual([0,1,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0])
  })
})

describe('ge', () => {
  it('finds greater than or equal numbers when compared with a scalar', () => {
    const inData = [0,1,2,3,4,5,6,7,4,9,10,11,12,13,14,15,16,5]
    const mat = ndarray(inData, {dtype: Float32Array, shape: [3,3,2]})
    const eq = mat.ge(5)
    expect(eq.shape).toEqual([3,3,2])
    expect(eq.values()).toEqual([0,0,0,0,0,1,1,1,0,1,1,1,1,1,1,1,1,1])
  })
  
  it('finds greater than or equal numbers when compared with a ndarray', () => {
    const mat =  ndarray([0,1,2,3,4,5,6,7,8], {dtype: Float32Array, shape: [3,3]})
    const comp = ndarray([0,0,2,3,4,5,6,9,10], {dtype: Float32Array, shape: [3,3]})
    const eq = mat.ge(comp)
    expect(eq.shape).toEqual([3,3])
    expect(eq.values()).toEqual([1,1,1,1,1,1,1,0,0])
  })
})

describe('lt', () => {
  it('finds less than numbers when compared with a scalar', () => {
    const inData = [0,1,2,3,4,5,6,7,5,9,10,11,12,13,14,15,16,3]
    const mat = ndarray(inData, {dtype: Float32Array, shape: [3,3,2]})
    const eq = mat.lt(5)
    expect(eq.shape).toEqual([3,3,2])
    expect(eq.values()).toEqual([1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1])
  })

  it('finds less than numbers when compared with a ndarray', () => {
    const mat =  ndarray([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17], {dtype: Float32Array, shape: [3,3,2]})
    const comp = ndarray([1,0,2,5,4,5,0,7,8,0,10,11,12,0,14,15,16,18], {dtype: Float32Array, shape: [3,3,2]})
    const eq = mat.lt(comp)
    expect(eq.shape).toEqual([3,3,2])
    expect(eq.values()).toEqual([1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1])
  })
})

describe('le', () => {
  it('finds less than or equal numbers when compared with a scalar', () => {
    const inData = [0,1,2,3,4,5,6,7,4,9,10,11,12,13,14,15,16,5]
    const mat = ndarray(inData, {dtype: Float32Array, shape: [3,3,2]})
    const eq = mat.le(5)
    expect(eq.shape).toEqual([3,3,2])
    expect(eq.values()).toEqual([1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,1])
  })
  
  it('finds less than or equal numbers when compared with a ndarray', () => {
    const mat =  ndarray([0,1,2,3,4,5,6,7,10], {dtype: Float32Array, shape: [3,3]})
    const comp = ndarray([0,0,2,3,9,5,6,7,8], {dtype: Float32Array, shape: [3,3]})
    const eq = mat.le(comp)
    expect(eq.shape).toEqual([3,3])
    expect(eq.values()).toEqual([1,0,1,1,1,1,1,1,0])
  })
})