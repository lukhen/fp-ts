import * as U from './util.ts'
import * as _ from '../deno_dist/Random.ts'
import {
    describe,
    it
} from "https://deno.land/std@0.148.0/testing/bdd.ts"

describe('Random', () => {
  it('random', () => {
    const n = _.random()
    U.deepStrictEqual(typeof n, 'number')
  })

  it('randomInt', () => {
    const n = _.randomInt(0, 10)()
    U.deepStrictEqual(typeof n, 'number')
    U.deepStrictEqual(n % 1 === 0, true)
    U.deepStrictEqual(n >= 0, true)
    U.deepStrictEqual(n <= 10, true)
  })

  it('randomRange', () => {
    for (let i = 0; i < 10; i++) {
      const n = _.randomRange(0, 10)()
      U.deepStrictEqual(typeof n, 'number')
      U.deepStrictEqual(n >= 0, true)
      U.deepStrictEqual(n < 10, true)
    }
  })

  it('randomBool', () => {
    const b = _.randomBool()
    U.deepStrictEqual(typeof b, 'boolean')
  })

  it('randomElem', () => {
    const e = _.randomElem([1, 2, 3])()
    U.deepStrictEqual(e >= 1 && e <= 3, true)
  })
})
