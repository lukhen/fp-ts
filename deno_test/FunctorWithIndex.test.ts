import * as U from './util.ts'
import * as RA from '../deno_dist/ReadonlyArray.ts'
import { getFunctorWithIndexComposition } from '../deno_dist/FunctorWithIndex.ts'
import {
    describe,
    it
} from "https://deno.land/std@0.148.0/testing/bdd.ts"

describe('FunctorWithIndex', () => {
  it('getFunctorComposition', () => {
    // tslint:disable-next-line: deprecation
    const FWI = getFunctorWithIndexComposition(RA.FunctorWithIndex, RA.FunctorWithIndex)
    const f = ([i, j]: readonly [number, number], a: string) => a + i + j
    U.deepStrictEqual(
      FWI.map([[1], [2]], (n) => n * 2),
      [[2], [4]]
    )
    U.deepStrictEqual(
      FWI.mapWithIndex(
        [
          ['a', 'b'],
          ['c', 'd']
        ],
        f
      ),
      [
        ['a00', 'b01'],
        ['c10', 'd11']
      ]
    )
  })
})
