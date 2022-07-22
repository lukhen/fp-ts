import * as U from './util.ts'
import * as _ from '../deno_dist/number.ts'
import {
    describe,
    it
} from "https://deno.land/std@0.148.0/testing/bdd.ts"

describe('string', () => {
  it('Ord', () => {
    U.deepStrictEqual(_.Ord.compare(1, 2), -1)
    U.deepStrictEqual(_.Ord.compare(2, 1), 1)
    U.deepStrictEqual(_.Ord.compare(2, 2), 0)
  })

  it('Field', () => {
    U.deepStrictEqual(_.Field.degree(0), 1)
    U.deepStrictEqual(_.Field.degree(1), 1)
    U.deepStrictEqual(_.Field.degree(2), 1)
  })

  it('Show', () => {
    U.deepStrictEqual(_.Show.show(1), '1')
  })

  it('SemigroupProduct', () => {
    U.deepStrictEqual(_.SemigroupProduct.concat(2, 3), 6)
  })

  it('MagmaSub', () => {
    U.deepStrictEqual(_.MagmaSub.concat(2, 3), -1)
  })
})
