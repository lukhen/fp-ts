import * as B from '../deno_dist/boolean.ts'
import { increment } from '../deno_dist/function.ts'
import * as _ from '../deno_dist/Monoid.ts'
import * as N from '../deno_dist/number.ts'
import * as S from '../deno_dist/string.ts'
import * as U from './util.ts'
import {
    describe,
    it
} from "https://deno.land/std@0.148.0/testing/bdd.ts"

describe('Monoid', () => {
  it('tuple', () => {
    const M1 = _.tuple(S.Monoid, N.MonoidSum)
    U.deepStrictEqual(M1.concat(['a', 1], ['b', 2]), ['ab', 3])
    const M2 = _.tuple(S.Monoid, N.MonoidSum, B.MonoidAll)
    U.deepStrictEqual(M2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
  })

  it('concatAll', () => {
    U.deepStrictEqual(_.concatAll(N.MonoidSum)([1, 2, 3]), 6)
  })

  it('getEndomorphismMonoid', () => {
    // tslint:disable-next-line: deprecation
    const M = _.getEndomorphismMonoid<number>()
    const f = M.concat(U.double, increment)
    U.deepStrictEqual(f(3), 8)
  })

  it('min', () => {
    const M = _.min(N.Bounded)
    U.deepStrictEqual(_.concatAll(M)([]), +Infinity)
    U.deepStrictEqual(_.concatAll(M)([1]), 1)
    U.deepStrictEqual(_.concatAll(M)([1, -1]), -1)
  })

  it('max', () => {
    const M = _.max(N.Bounded)
    U.deepStrictEqual(_.concatAll(M)([]), -Infinity)
    U.deepStrictEqual(_.concatAll(M)([1]), 1)
    U.deepStrictEqual(_.concatAll(M)([1, -1]), 1)
  })

  it('reverse', () => {
    const M = _.reverse(S.Monoid)
    U.deepStrictEqual(M.concat('a', 'b'), 'ba')
    U.deepStrictEqual(M.concat('a', M.empty), 'a')
    U.deepStrictEqual(M.concat(M.empty, 'a'), 'a')
  })

  it('struct', () => {
    // should ignore non own properties
    const monoids = Object.create({ a: 1 })
    const s = _.struct(monoids)
    U.deepStrictEqual(s.empty, {})
  })
})
