import * as U from './util.ts'
import { semigroupString } from '../deno_dist/Semigroup.ts'
import * as _ from '../deno_dist/ValidationT.ts'
import * as IO from '../deno_dist/IO.ts'
import * as E from '../deno_dist/Either.ts'
import {
    describe,
    it
} from "https:/deno.land/std@0.148.0/testing/bdd.ts"

describe('ValidationT', () => {
  describe('getValidationM', () => {
    // tslint:disable-next-line: deprecation
    const VT = _.getValidationM(semigroupString, IO.Monad)

    it('chain', () => {
      const f = (n: number) => (n > 0 ? IO.of(E.right(n * 2)) : IO.of(E.left('b')))
      U.deepStrictEqual(VT.chain(IO.of(E.right(1)), f)(), E.right(2))
      U.deepStrictEqual(VT.chain(IO.of(E.right(-1)), f)(), E.left('b'))
      U.deepStrictEqual(VT.chain(IO.of(E.left('a')), f)(), E.left('a'))
    })

    it('alt', () => {
      U.deepStrictEqual(VT.alt(IO.of(E.right(1)), () => IO.of(E.right(2)))(), E.right(1))
      U.deepStrictEqual(VT.alt(IO.of(E.right(1)), () => IO.of(E.left('b')))(), E.right(1))
      U.deepStrictEqual(VT.alt(IO.of(E.left('a')), () => IO.of(E.right(2)))(), E.right(2))
      U.deepStrictEqual(VT.alt(IO.of(E.left('a')), () => IO.of(E.left('b')))(), E.left('ab'))
    })
  })
})
