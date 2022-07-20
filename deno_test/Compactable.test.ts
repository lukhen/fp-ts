import * as U from './util.ts'
import * as RA from '../deno_dist/ReadonlyArray.ts'
import { getCompactableComposition } from '../deno_dist/Compactable.ts'
import { none, some } from '../deno_dist/Option.ts'
import { left, right } from '../deno_dist/Either.ts'
import { separated } from '../deno_dist/Separated.ts'
import {
  describe,
  it,
} from "https://deno.land/std@0.148.0/testing/bdd.ts"


describe('Compactable', () => {
  it('getCompactableComposition', () => {
    // tslint:disable-next-line: deprecation
    const C = getCompactableComposition(RA.Functor, { ...RA.Functor, ...RA.Compactable })
    U.deepStrictEqual(
      C.map([[1], [2]], (n) => n * 2),
      [[2], [4]]
    )
    U.deepStrictEqual(
      C.compact([
        [some(1), none],
        [none, some(2)]
      ]),
      [[1], [2]]
    )
    U.deepStrictEqual(
      C.separate([
        [left('a'), right(1)],
        [right(2), left('b')]
      ]),
      separated([['a'], ['b']], [[1], [2]])
    )
  })
})
