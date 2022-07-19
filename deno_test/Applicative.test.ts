import * as U from './util.ts'
import { getApplicativeComposition } from '../deno_dist/Applicative.ts'
import * as RA from '../deno_dist/ReadonlyArray.ts'
import * as O from '../deno_dist/Option.ts'
import { increment } from '../deno_dist/function.ts'
import {
  describe,
  it,
} from "https://deno.land/std@0.148.0/testing/bdd.ts"

describe('Applicative', () => {
  it('getApplicativeComposition', () => {
    // tslint:disable-next-line: deprecation
    const AC = getApplicativeComposition(RA.Applicative, O.Applicative)
    U.deepStrictEqual(AC.of(1), [O.some(1)])
    U.deepStrictEqual(AC.map(AC.of(1), increment), [O.some(2)])
    U.deepStrictEqual(AC.ap([O.some(U.double), O.some(increment)], [O.some(1), O.some(2)]), [
      O.some(2),
      O.some(4),
      O.some(2),
      O.some(3)
    ])
    U.deepStrictEqual(AC.ap([O.some(U.double), O.none], [O.some(1), O.some(2)]), [O.some(2), O.some(4), O.none, O.none])
  })
})
