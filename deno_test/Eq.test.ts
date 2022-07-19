import * as U from './util.ts'
import * as _ from '../deno_dist/Eq.ts'
import { concatAll } from '../deno_dist/Monoid.ts'
import { pipe } from '../deno_dist/function.ts'
import * as B from '../deno_dist/boolean.ts'
import * as S from '../deno_dist/string.ts'
import * as N from '../deno_dist/number.ts'
import {
  describe,
  it,
} from "https://deno.land/std@0.148.0/testing/bdd.ts"

describe('Eq', () => {
  describe('pipeables', () => {
    it('contramap', () => {
      const E = pipe(
        S.Eq,
        _.contramap((p: Person) => p.name)
      )
      U.deepStrictEqual(E.equals({ name: 'a', age: 1 }, { name: 'a', age: 2 }), true)
      U.deepStrictEqual(E.equals({ name: 'a', age: 1 }, { name: 'a', age: 1 }), true)
      U.deepStrictEqual(E.equals({ name: 'a', age: 1 }, { name: 'b', age: 1 }), false)
      U.deepStrictEqual(E.equals({ name: 'a', age: 1 }, { name: 'b', age: 2 }), false)
    })
  })

  it('tuple', () => {
    const E = _.tuple(S.Eq, N.Eq, B.Eq)
    U.deepStrictEqual(E.equals(['a', 1, true], ['a', 1, true]), true)
    U.deepStrictEqual(E.equals(['a', 1, true], ['b', 1, true]), false)
    U.deepStrictEqual(E.equals(['a', 1, true], ['a', 2, true]), false)
    U.deepStrictEqual(E.equals(['a', 1, true], ['a', 1, false]), false)
  })

  interface Person {
    readonly name: string
    readonly age: number
  }

  it('fromEquals', () => {
    interface A {
      readonly x: number
    }
    let nbCall = 0
    const S1 = _.fromEquals<A>((a, b) => {
      nbCall += 1
      return a.x === b.x
    })
    const a1 = { x: 1 }
    const a2 = { x: 1 }
    S1.equals(a1, a1)
    U.deepStrictEqual(nbCall, 0)
    S1.equals(a1, a2)
    U.deepStrictEqual(nbCall, 1)
  })

  it('struct', () => {
    const E = _.struct<Person>({
      name: S.Eq,
      age: N.Eq
    })
    U.deepStrictEqual(E.equals({ name: 'a', age: 1 }, { name: 'a', age: 1 }), true)
    U.deepStrictEqual(E.equals({ name: 'a', age: 1 }, { name: 'a', age: 2 }), false)
    U.deepStrictEqual(E.equals({ name: 'a', age: 1 }, { name: 'b', age: 1 }), false)
  })

  it('eqStrict', () => {
    U.deepStrictEqual(_.eqStrict.equals(1, 1), true)
    U.deepStrictEqual(_.eqStrict.equals(1, 'a'), false)
  })

  it('getMonoid', () => {
    type T = readonly [string, number, boolean]
    const M = _.getMonoid<T>()
    const eqFst: _.Eq<T> = _.contramap((x: T) => x[0])(S.Eq)
    const eqSnd: _.Eq<T> = _.contramap((x: T) => x[1])(N.Eq)
    const eq3rd: _.Eq<T> = _.contramap((x: T) => x[2])(B.Eq)
    const eq = concatAll(M)([eqFst, eqSnd, eq3rd])
    U.deepStrictEqual(eq.equals(['a', 1, true], ['a', 1, true]), true)
    U.deepStrictEqual(eq.equals(['a', 1, true], ['b', 1, true]), false)
    U.deepStrictEqual(eq.equals(['a', 1, true], ['a', 2, true]), false)
    U.deepStrictEqual(eq.equals(['a', 1, true], ['a', 1, false]), false)
  })

  it('eqDate', () => {
    // tslint:disable-next-line: deprecation
    const E = _.eqDate
    U.deepStrictEqual(E.equals(new Date(0), new Date(0)), true)
    U.deepStrictEqual(E.equals(new Date(0), new Date(1)), false)
    U.deepStrictEqual(E.equals(new Date(1), new Date(0)), false)
  })
})
