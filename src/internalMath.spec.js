import ndarray from './ndarray'

describe('avg', () => {
  it('flat ndarray', () => {
    const inData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const mat = ndarray(inData)

    expect(mat.values()).toEqual(inData)
    expect(mat.avg()).toBe(5.5)
  })

  it('3d ndarray', () => {
    const inData = Float32Array.from({ length: 2 * 4 * 2 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [2, 4, 2] })
    expect(mat.avg()).toBe(7.5)
  })

  it('3d ndarray along the last access', () => {
    const inData = Float32Array.from({ length: 2 * 4 * 2 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [2, 4, 2] })
    const avgMat = mat.avg(-1)
    expect(avgMat.values()).toEqual([0.5, 2.5, 4.5, 6.5, 8.5, 10.5, 12.5, 14.5])
    expect(avgMat.shape).toEqual([2, 4])
  })

  it('3d ndarray along the first access', () => {
    const inData = Float32Array.from({ length: 2 * 4 * 2 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [2, 4, 2] })
    const avgMat = mat.avg(0)
    expect(avgMat.values()).toEqual([4, 5, 6, 7, 8, 9, 10, 11])
    expect(avgMat.shape).toEqual([4, 2])
  })
})

describe('median', () => {
  it('flat ndarray with even length', () => {
    const inData = [1, 2, 3, 4, 22, 6, 7, 8, 9, 20]
    const mat = ndarray(inData)

    expect(mat.values()).toEqual(inData)
    expect(mat.median()).toBe(6.5)
  })

  it('flat ndarray with uneven length', () => {
    const inData = [1, 2, 3, 4, 22, 6, 7, 8, 9, 20, 7]
    const mat = ndarray(inData)

    expect(mat.values()).toEqual(inData)
    expect(mat.median()).toBe(7)
  })

  it('3d ndarray', () => {
    const inData = Float32Array.from({ length: 2 * 4 * 2 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [2, 4, 2] })
    expect(mat.median()).toBe(7.5)
  })

  it('3d ndarray along the last access', () => {
    const inData = Float32Array.from({ length: 2 * 4 * 2 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [2, 4, 2] })
    const avgMat = mat.median(-1)
    expect(avgMat.values()).toEqual([0.5, 2.5, 4.5, 6.5, 8.5, 10.5, 12.5, 14.5])
    expect(avgMat.shape).toEqual([2, 4])
  })

  it('3d ndarray along the first access', () => {
    const inData = Float32Array.from({ length: 2 * 4 * 2 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [2, 4, 2] })
    const avgMat = mat.median(0)
    expect(avgMat.values()).toEqual([4, 5, 6, 7, 8, 9, 10, 11])
    expect(avgMat.shape).toEqual([4, 2])
  })
})

describe('variance', () => {
  it('flat ndarray', () => {
    const inData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const mat = ndarray(inData)

    expect(mat.values()).toEqual(inData)
    expect(mat.variance()).toBe(8.25)
  })

  it('3d ndarray', () => {
    const inData = Float32Array.from({ length: 2 * 4 * 2 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [2, 4, 2] })
    expect(mat.variance()).toBe(21.25)
  })

  it('3d ndarray along the last access', () => {
    const inData = Float32Array.from({ length: 2 * 4 * 2 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [2, 4, 2] })
    const avgMat = mat.variance(-1)
    expect(avgMat.values()).toEqual([0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25])
    expect(avgMat.shape).toEqual([2, 4])
  })

  it('3d ndarray along the first access', () => {
    const inData = Float32Array.from({ length: 2 * 4 * 2 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [2, 4, 2] })
    const avgMat = mat.variance(0)
    expect(avgMat.values()).toEqual([16, 16, 16, 16, 16, 16, 16, 16])
    expect(avgMat.shape).toEqual([4, 2])
  })
})

describe('std', () => {
  it('flat ndarray', () => {
    const inData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const mat = ndarray(inData)

    expect(mat.values()).toEqual(inData)
    expect(mat.std()).toBe(2.8722813232690143)
  })

  it('3d ndarray', () => {
    const inData = Float32Array.from({ length: 2 * 4 * 2 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [2, 4, 2] })
    expect(mat.std()).toBe(4.6097722286464435)
  })

  it('3d ndarray along the last access', () => {
    const inData = Float32Array.from({ length: 2 * 4 * 2 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [2, 4, 2] })
    const avgMat = mat.std(-1)
    expect(avgMat.values()).toEqual([0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5])
    expect(avgMat.shape).toEqual([2, 4])
  })

  it('3d ndarray along the first access', () => {
    const inData = Float32Array.from({ length: 2 * 4 * 2 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [2, 4, 2] })
    const avgMat = mat.std(0)
    expect(avgMat.values()).toEqual([4, 4, 4, 4, 4, 4, 4, 4])
    expect(avgMat.shape).toEqual([4, 2])
  })
})

describe('sum', () => {
  it('flat ndarray', () => {
    const inData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const mat = ndarray(inData)

    expect(mat.values()).toEqual(inData)
    expect(mat.sum()).toBe(55)
  })

  it('3d ndarray', () => {
    const inData = Float32Array.from({ length: 2 * 4 * 2 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [2, 4, 2] })
    expect(mat.sum()).toBe(120)
  })

  it('3d ndarray along the last access', () => {
    const inData = Float32Array.from({ length: 2 * 4 * 2 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [2, 4, 2] })
    const avgMat = mat.sum(-1)
    expect(avgMat.values()).toEqual([1, 5, 9, 13, 17, 21, 25, 29])
    expect(avgMat.shape).toEqual([2, 4])
  })

  it('3d ndarray along the first access', () => {
    const inData = Float32Array.from({ length: 2 * 4 * 2 }, (_, idx) => idx)
    const mat = ndarray(inData, { shape: [2, 4, 2] })
    const avgMat = mat.sum(0)
    expect(avgMat.values()).toEqual([8, 10, 12, 14, 16, 18, 20, 22])
    expect(avgMat.shape).toEqual([4, 2])
  })
})

describe('min', () => {
  it('flat ndarray', () => {
    const inData = [1, 2, 3, 4, 5, 0.2, 7, 8, 9, 10]
    const mat = ndarray(inData)

    expect(mat.values()).toEqual(inData)
    expect(mat.min()).toBe(0.2)
  })

  it('3d ndarray', () => {
    const inData = Float32Array.from({ length: 2 * 4 * 2 }, (_, idx) => 22 - idx)
    const mat = ndarray(inData, { shape: [2, 4, 2] })
    expect(mat.min()).toBe(7)
  })
})

describe('max', () => {
  it('flat ndarray', () => {
    const inData = [1, 2, 3, 4, 5, 0.2, 7, 8, 22, -10]
    const mat = ndarray(inData)

    expect(mat.values()).toEqual(inData)
    expect(mat.max()).toBe(22)
  })

  it('3d ndarray', () => {
    const inData = Float32Array.from({ length: 2 * 4 * 2 }, (_, idx) => 22 - idx)
    const mat = ndarray(inData, { shape: [2, 4, 2] })
    expect(mat.max()).toBe(22)
  })
})
