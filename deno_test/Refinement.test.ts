import * as B from '../deno_dist/boolean.ts'
import * as E from '../deno_dist/Either.ts'
import { pipe } from '../deno_dist/function.ts'
import * as N from '../deno_dist/number.ts'
import * as O from '../deno_dist/Option.ts'
import { ReadonlyRecord } from '../deno_dist/ReadonlyRecord.ts'
import * as _ from '../deno_dist/Refinement.ts'
import * as S from '../deno_dist/string.ts'
import * as U from './util.ts'
import {
    describe,
    it
} from "https://deno.land/std@0.148.0/testing/bdd.ts"

interface NonEmptyStringBrand {
  readonly NonEmptyString: unique symbol
}

type NonEmptyString = string & NonEmptyStringBrand

const NonEmptyString: _.Refinement<string, NonEmptyString> = (s): s is NonEmptyString => s.length > 0

describe('Refinement', () => {
  it('not', () => {
    const r1: _.Refinement<string | number, string> = S.isString
    const r2 = _.not(r1)
    U.deepStrictEqual(r2('a'), false)
    U.deepStrictEqual(r2(1), true)
  })

  it('or', () => {
    const r = pipe(S.isString, _.or(N.isNumber), _.or(B.isBoolean))
    U.deepStrictEqual(r({}), false)
    U.deepStrictEqual(r('a'), true)
    U.deepStrictEqual(r(1), true)
    U.deepStrictEqual(r(true), true)
  })

  it('and', () => {
    const ra = (r: ReadonlyRecord<string, unknown>): r is { readonly a: string } => S.isString(r['a'])
    const rb = (r: ReadonlyRecord<string, unknown>): r is { readonly b: number } => N.isNumber(r['b'])
    const r = pipe(ra, _.and(rb))
    U.deepStrictEqual(r({ a: 'a' }), false)
    U.deepStrictEqual(r({ b: 1 }), false)
    U.deepStrictEqual(r({}), false)
    U.deepStrictEqual(r({ a: 'a', b: 'b' }), false)
    U.deepStrictEqual(r({ a: 1, b: 2 }), false)
    U.deepStrictEqual(r({ a: 'a', b: 1 }), true)
  })

  it('fromOptionK', () => {
    const f = (s: string | number): O.Option<string> => (typeof s === 'string' ? O.some(s) : O.none)
    const isString = _.fromOptionK(f)
    U.deepStrictEqual(isString('s'), true)
    U.deepStrictEqual(isString(1), false)
    type A = { readonly type: 'A' }
    type B = { readonly type: 'B' }
    type C = A | B
    const isA = _.fromOptionK<C, A>((c) => (c.type === 'A' ? O.some(c) : O.none))
    U.deepStrictEqual(isA({ type: 'A' }), true)
    U.deepStrictEqual(isA({ type: 'B' }), false)
  })

  it('zero', () => {
    const refinement = _.zero()
    U.strictEqual(refinement('a'), false)
  })

  it('id', () => {
    const refinement = _.id<string>()
    U.strictEqual(refinement('a'), true)
  })

  it('compose', () => {
    const refinement = pipe(S.isString, _.compose(NonEmptyString))
    U.strictEqual(refinement('a'), true)
    U.strictEqual(refinement(null), false)
    U.strictEqual(refinement(''), false)
  })

  it('fromEitherK', () => {
    const f = (s: string | number): E.Either<string, string> =>
      typeof s === 'string' ? E.right(s) : E.left('not a string')
    const isString = _.fromEitherK(f)
    U.deepStrictEqual(isString('s'), true)
    U.deepStrictEqual(isString(1), false)
    type A = { readonly type: 'A' }
    type B = { readonly type: 'B' }
    type C = A | B
    const isA = _.fromEitherK<C, A>((c) => (c.type === 'A' ? E.right(c) : E.left('not as A')))
    U.deepStrictEqual(isA({ type: 'A' }), true)
    U.deepStrictEqual(isA({ type: 'B' }), false)
  })
})
