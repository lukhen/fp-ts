import * as U from './util.ts'
import * as RA from '../deno_dist/ReadonlyArray.ts'
import { getFilterableComposition } from '../deno_dist/Filterable.ts'
import { some, none } from '../deno_dist/Option.ts'
import { right, left } from '../deno_dist/Either.ts'
import { increment } from '../deno_dist/function.ts'
import { separated } from '../deno_dist/Separated.ts'
import {
    describe,
    it
} from "https://deno.land/std@0.148.0/testing/bdd.ts"

describe('Filterable', () => {
  it('getFilterableComposition', () => {
    // tslint:disable-next-line: deprecation
    const F = getFilterableComposition(RA.Functor, RA.Filterable)

    U.deepStrictEqual(F.map([[1]], increment), [[2]])

    U.deepStrictEqual(
      F.filter(
        [
          [1, 2],
          [3, 4]
        ],
        (a) => a > 1
      ),
      [[2], [3, 4]]
    )

    U.deepStrictEqual(
      F.filterMap(
        [
          ['a', 'bb'],
          ['ccc', 'dddd']
        ],
        (a) => (a.length > 1 ? some(a.length) : none)
      ),
      [[2], [3, 4]]
    )

    U.deepStrictEqual(
      F.partition(
        [
          ['a', 'bb'],
          ['ccc', 'dddd']
        ],
        (a) => a.length % 2 === 0
      ),
      separated([['a'], ['ccc']], [['bb'], ['dddd']])
    )

    U.deepStrictEqual(
      F.partitionMap(
        [
          ['a', 'bb'],
          ['ccc', 'dddd']
        ],
        (a) => (a.length % 2 === 0 ? right(a.length) : left(a))
      ),
      separated([['a'], ['ccc']], [[2], [4]])
    )
  })
})
