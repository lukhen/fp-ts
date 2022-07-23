import * as U from './util.ts'
import * as N from '../deno_dist/number.ts'
import * as _ from '../deno_dist/Ring.ts'
import {
    describe,
    it
} from "https://deno.land/std@0.148.0/testing/bdd.ts"

describe('Ring', () => {
  it('tuple', () => {
    const R = _.tuple(N.Field, N.Field, N.Field)
    U.deepStrictEqual(R.add([1, 2, 3], [4, 5, 6]), [5, 7, 9])
    U.deepStrictEqual(R.mul([1, 2, 3], [4, 5, 6]), [4, 10, 18])
    U.deepStrictEqual(R.one, [1, 1, 1])
    U.deepStrictEqual(R.sub([1, 2, 3], [4, 5, 6]), [-3, -3, -3])
    U.deepStrictEqual(R.zero, [0, 0, 0])
  })

  it('negate', () => {
    U.deepStrictEqual(_.negate(N.Field)(1), -1)
  })
})
