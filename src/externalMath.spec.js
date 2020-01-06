import ndarray from './ndarray'

describe('Math operations modifying self', () => {
  describe('add', () => {
    it('with a scalar', () => {
      const inData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const mat = ndarray(inData)
      mat.add(5, true)
      expect(mat.values()).toEqual([6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
    })

    it('with another ndarray', () => {
      const inDataOne = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const inDataTwo = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
      const matOne = ndarray(inDataOne)
      const matTwo = ndarray(inDataTwo)
      matOne.add(matTwo, true)
      expect(matOne.values()).toEqual([6, 8, 10, 12, 14, 16, 18, 20, 22, 24])
    })

    it('with another nd ndarray', () => {
      const inDataOne = Float32Array.from({ length: 2 * 4 * 2 }, (_, idx) => idx)
      const matOne = ndarray(inDataOne, { shape: [2, 4, 2] })
      const inDataTwo = Float32Array.from({ length: 2 * 4 * 2 }, (_, idx) => idx)
      const matTwo = ndarray(inDataTwo, { shape: [2, 4, 2] })
      matOne.add(matTwo, true)
      expect(matTwo.values()).toEqual(Array.from(inDataTwo))
      expect(matOne.values()).toEqual([0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30])
    })
  })

  describe('sub', () => {
    it('with a scalar', () => {
      const inData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const mat = ndarray(inData)
      mat.sub(5, true)
      expect(mat.values()).toEqual([-4, -3, -2, -1, 0, 1, 2, 3, 4, 5])
    })

    it('with another ndarray', () => {
      const inDataOne = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const inDataTwo = [5, 3, 7, 8, 9, 10, 11, 12, 13, 2]
      const matOne = ndarray(inDataOne)
      const matTwo = ndarray(inDataTwo)
      matOne.sub(matTwo, true)
      expect(matOne.values()).toEqual([-4, -1, -4, -4, -4, -4, -4, -4, -4, 8])
    })

    it('with another nd ndarray', () => {
      const inDataOne = Float32Array.from({ length: 2 * 4 * 2 }, (_, idx) => idx)
      const matOne = ndarray(inDataOne, { shape: [2, 4, 2] })
      const inDataTwo = Float32Array.from({ length: 2 * 4 * 2 }, (_, idx) => idx)
      const matTwo = ndarray(inDataTwo, { shape: [2, 4, 2] })
      matOne.sub(matTwo, true)
      expect(matTwo.values()).toEqual(Array.from(inDataTwo))
      expect(matOne.values()).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    })
  })

  describe('div', () => {
    it('with a scalar', () => {
      const inData = [1, 2, 3, 4, 5]
      const mat = ndarray(inData)
      mat.div(5, true)
      expect(mat.values()).toEqual([0.2, 0.4, 0.6, 0.8, 1])
    })

    it('with another ndarray', () => {
      const inDataOne = [1, 2, 3, 4]
      const inDataTwo = [2, 2, 4, 6]
      const matOne = ndarray(inDataOne)
      const matTwo = ndarray(inDataTwo)
      matOne.div(matTwo, true)
      expect(matOne.values()).toEqual([0.5, 1, 3 / 4, 4 / 6])
    })

    it('with another nd ndarray', () => {
      const inDataOne = Float32Array.from({ length: 2 * 4 * 2 }, (_, idx) => idx)
      const matOne = ndarray(inDataOne, { shape: [2, 4, 2] })
      const inDataTwo = Float32Array.from({ length: 2 * 4 * 2 }, (_, idx) => idx)
      const matTwo = ndarray(inDataTwo, { shape: [2, 4, 2] })
      matOne.div(matTwo, true)
      expect(matTwo.values()).toEqual(Array.from(inDataTwo))
      expect(matOne.values()).toEqual([NaN, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    })
  })

  describe('mul', () => {
    it('with a scalar', () => {
      const inData = [1, 2, 3, 4, 5]
      const mat = ndarray(inData)
      mat.mul(5, true)
      expect(mat.values()).toEqual([5, 10, 15, 20, 25])
    })

    it('with another ndarray', () => {
      const inDataOne = [1, 2, 3, 4]
      const inDataTwo = [2, 2, 4, 6]
      const matOne = ndarray(inDataOne)
      const matTwo = ndarray(inDataTwo)
      matOne.mul(matTwo, true)
      expect(matOne.values()).toEqual([2, 4, 12, 24])
    })

    it('with another nd ndarray', () => {
      const inDataOne = Float32Array.from({ length: 2 * 4 * 2 }, (_, idx) => idx)
      const matOne = ndarray(inDataOne, { shape: [2, 4, 2] })
      const inDataTwo = Float32Array.from({ length: 2 * 4 * 2 }, (_, idx) => idx)
      const matTwo = ndarray(inDataTwo, { shape: [2, 4, 2] })
      matOne.mul(matTwo, true)
      expect(matTwo.values()).toEqual(Array.from(inDataTwo))
      expect(matOne.values()).toEqual([0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225])
    })
  })

  describe('pow', () => {
    it('with a scalar', () => {
      const inData = [1, 2, 3, 4, 5]
      const mat = ndarray(inData)
      mat.pow(2, true)
      expect(mat.values()).toEqual([1, 4, 9, 16, 25])
    })

    it('with another ndarray', () => {
      const inDataOne = [1, 2, 3, 4]
      const inDataTwo = [2, 2, 4, 6]
      const matOne = ndarray(inDataOne)
      const matTwo = ndarray(inDataTwo)
      matOne.pow(matTwo, true)
      expect(matOne.values()).toEqual([1, 4, 81, 4096])
    })

    it('with another nd ndarray', () => {
      const inDataOne = Float32Array.from({ length: 2 * 2 * 1 }, (_, idx) => idx)
      const matOne = ndarray(inDataOne, { shape: [2, 2, 1] })
      const inDataTwo = Float32Array.from({ length: 2 * 2 * 1 }, (_, idx) => idx)
      const matTwo = ndarray(inDataTwo, { shape: [2, 2, 1] })
      matOne.pow(matTwo, true)
      expect(matTwo.values()).toEqual(Array.from(inDataTwo))
      expect(matOne.values()).toEqual([1, 1, 4, 27])
    })
  })
})

describe('Math operations creating new', () => {
  describe('add', () => {
    it('with a scalar', () => {
      const inData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const mat = ndarray(inData)
      const added = mat.add(5)
      expect(mat.values()).toEqual(inData)
      expect(added.values()).toEqual([6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
    })

    it('with another ndarray', () => {
      const inDataOne = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const inDataTwo = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
      const matOne = ndarray(inDataOne)
      const matTwo = ndarray(inDataTwo)
      const added = matOne.add(matTwo)
      expect(matOne.values()).toEqual(inDataOne)
      expect(matTwo.values()).toEqual(inDataTwo)
      expect(added.values()).toEqual([6, 8, 10, 12, 14, 16, 18, 20, 22, 24])
    })

    it('with another nd ndarray', () => {
      const inDataOne = Float32Array.from({ length: 2 * 4 * 2 }, (_, idx) => idx)
      const matOne = ndarray(inDataOne, { shape: [2, 4, 2] })
      const inDataTwo = Float32Array.from({ length: 2 * 4 * 2 }, (_, idx) => idx)
      const matTwo = ndarray(inDataTwo, { shape: [2, 4, 2] })

      const added = matOne.add(matTwo)
      expect(matOne.values()).toEqual(Array.from(inDataOne))
      expect(matTwo.values()).toEqual(Array.from(inDataTwo))
      expect(added.values()).toEqual([0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30])
    })
  })

  describe('sub', () => {
    it('with a scalar', () => {
      const inData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const mat = ndarray(inData)
      const subbed = mat.sub(5)
      expect(mat.values()).toEqual(inData)
      expect(subbed.values()).toEqual([-4, -3, -2, -1, 0, 1, 2, 3, 4, 5])
    })

    it('with another ndarray', () => {
      const inDataOne = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const inDataTwo = [5, 3, 7, 8, 9, 10, 11, 12, 13, 2]
      const matOne = ndarray(inDataOne)
      const matTwo = ndarray(inDataTwo)
      const subbed = matOne.sub(matTwo)
      expect(matOne.values()).toEqual(inDataOne)
      expect(matTwo.values()).toEqual(inDataTwo)
      expect(subbed.values()).toEqual([-4, -1, -4, -4, -4, -4, -4, -4, -4, 8])
    })

    it('with another nd ndarray', () => {
      const inDataOne = Float32Array.from({ length: 2 * 4 * 2 }, (_, idx) => idx)
      const matOne = ndarray(inDataOne, { shape: [2, 4, 2] })
      const inDataTwo = Float32Array.from({ length: 2 * 4 * 2 }, (_, idx) => idx)
      const matTwo = ndarray(inDataTwo, { shape: [2, 4, 2] })

      const added = matOne.sub(matTwo)
      expect(matOne.values()).toEqual(Array.from(inDataOne))
      expect(matTwo.values()).toEqual(Array.from(inDataTwo))
      expect(added.values()).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    })
  })

  describe('div', () => {
    it('with a scalar', () => {
      const inData = [1, 2, 3, 4]
      const mat = ndarray(inData)
      const res = mat.div(5)
      expect(mat.values()).toEqual(inData)
      expect(res.values()).toEqual([0.2, 0.4, 0.6, 0.8])
    })

    it('with another ndarray', () => {
      const inDataOne = [1, 2, 3, 4]
      const inDataTwo = [5, 3, 7, 8]
      const matOne = ndarray(inDataOne)
      const matTwo = ndarray(inDataTwo)
      const res = matOne.div(matTwo)
      expect(matOne.values()).toEqual(inDataOne)
      expect(matTwo.values()).toEqual(inDataTwo)
      expect(res.values()).toEqual([0.2, 2 / 3, 3 / 7, 0.5])
    })

    it('with another nd ndarray', () => {
      const inDataOne = Float32Array.from({ length: 2 * 4 * 2 }, (_, idx) => idx)
      const matOne = ndarray(inDataOne, { shape: [2, 4, 2] })
      const inDataTwo = Float32Array.from({ length: 2 * 4 * 2 }, (_, idx) => idx)
      const matTwo = ndarray(inDataTwo, { shape: [2, 4, 2] })

      const res = matOne.div(matTwo)
      expect(matOne.values()).toEqual(Array.from(inDataOne))
      expect(matTwo.values()).toEqual(Array.from(inDataTwo))
      expect(res.values()).toEqual([NaN, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    })
  })

  describe('mul', () => {
    it('with a scalar', () => {
      const inData = [1, 2, 3, 4]
      const mat = ndarray(inData)
      const res = mat.mul(5)
      expect(mat.values()).toEqual(inData)
      expect(res.values()).toEqual([5, 10, 15, 20])
    })

    it('with another ndarray', () => {
      const inDataOne = [1, 2, 3, 4]
      const inDataTwo = [5, 3, 7, 8]
      const matOne = ndarray(inDataOne)
      const matTwo = ndarray(inDataTwo)
      const res = matOne.mul(matTwo)
      expect(matOne.values()).toEqual(inDataOne)
      expect(matTwo.values()).toEqual(inDataTwo)
      expect(res.values()).toEqual([5, 6, 21, 32])
    })

    it('with another nd ndarray', () => {
      const inDataOne = Float32Array.from({ length: 2 * 2 * 2 }, (_, idx) => idx)
      const matOne = ndarray(inDataOne, { shape: [2, 2, 2] })
      const inDataTwo = Float32Array.from({ length: 2 * 2 * 2 }, (_, idx) => idx)
      const matTwo = ndarray(inDataTwo, { shape: [2, 2, 2] })

      const res = matOne.mul(matTwo)
      expect(matOne.values()).toEqual(Array.from(inDataOne))
      expect(matTwo.values()).toEqual(Array.from(inDataTwo))
      expect(res.values()).toEqual([0, 1, 4, 9, 16, 25, 36, 49])
    })
  })

  describe('pow', () => {
    it('with a scalar', () => {
      const inData = [1, 2, 3, 4]
      const mat = ndarray(inData)
      const res = mat.pow(2)
      expect(mat.values()).toEqual(inData)
      expect(res.values()).toEqual([1, 4, 9, 16])
    })

    it('with another ndarray', () => {
      const inDataOne = [1, 2, 3, 4]
      const inDataTwo = [2, 3, 0, 1]
      const matOne = ndarray(inDataOne)
      const matTwo = ndarray(inDataTwo)
      const res = matOne.pow(matTwo)
      expect(matOne.values()).toEqual(inDataOne)
      expect(matTwo.values()).toEqual(inDataTwo)
      expect(res.values()).toEqual([1, 8, 1, 4])
    })

    it('with another nd ndarray', () => {
      const inDataOne = Float32Array.from({ length: 2 * 2 * 1 }, (_, idx) => idx)
      const matOne = ndarray(inDataOne, { shape: [2, 2, 1] })
      const inDataTwo = Float32Array.from({ length: 2 * 2 * 1 }, (_, idx) => idx)
      const matTwo = ndarray(inDataTwo, { shape: [2, 2, 1] })

      const res = matOne.pow(matTwo)
      expect(matOne.values()).toEqual(Array.from(inDataOne))
      expect(matTwo.values()).toEqual(Array.from(inDataTwo))
      expect(res.values()).toEqual([1, 1, 4, 27])
    })
  })
})
