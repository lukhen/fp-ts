import * as E from '../deno_dist/Either.ts'
import { pipe } from '../deno_dist/function.ts'
import * as _ from '../deno_dist/IO.ts'
import * as N from '../deno_dist/number.ts'
import * as RA from '../deno_dist/ReadonlyArray.ts'
import { ReadonlyNonEmptyArray } from '../deno_dist/ReadonlyNonEmptyArray.ts'
import * as U from './util.ts'
import {
    describe,
    it
} from "https://deno.land/std@0.148.0/testing/bdd.ts"

describe('IO', () => {
  describe('pipeables', () => {
    it('map', () => {
      U.deepStrictEqual(pipe(_.of(1), _.map(U.double))(), 2)
    })

    it('ap', () => {
      U.deepStrictEqual(pipe(_.of(U.double), _.ap(_.of(1)))(), 2)
    })

    it('apFirst', () => {
      U.deepStrictEqual(pipe(_.of('a'), _.apFirst(_.of('b')))(), 'a')
    })

    it('apSecond', () => {
      U.deepStrictEqual(pipe(_.of('a'), _.apSecond(_.of('b')))(), 'b')
    })

    it('chain', () => {
      const f = (n: number) => _.of(n * 2)
      U.deepStrictEqual(pipe(_.of(1), _.chain(f))(), 2)
    })

    it('flatten', () => {
      U.deepStrictEqual(pipe(_.of(_.of(1)), _.flatten)(), 1)
    })

    it('chainFirst', () => {
      const f = (n: number) => _.of(n * 2)
      U.deepStrictEqual(pipe(_.of(1), _.chainFirst(f))(), 1)
    })
  })

  it('getSemigroup', () => {
    // tslint:disable-next-line: deprecation
    const S = _.getSemigroup(N.SemigroupSum)
    // tslint:disable-next-line: readonly-array
    const log: Array<string> = []
    const append = (message: string): _.IO<number> => () => log.push(message)
    U.deepStrictEqual(S.concat(append('a'), append('b'))(), 3)
    U.deepStrictEqual(log, ['a', 'b'])
  })

  it('getMonoid', () => {
    // tslint:disable-next-line: deprecation
    const M = _.getMonoid(N.MonoidSum)
    // tslint:disable-next-line: readonly-array
    const log: Array<string> = []
    const append = (message: string): _.IO<number> => () => log.push(message)
    U.deepStrictEqual(M.concat(append('a'), M.empty)(), 1)
    U.deepStrictEqual(M.concat(M.empty, append('b'))(), 2)
    U.deepStrictEqual(log, ['a', 'b'])
  })

  it('chainRec', () => {
    const f = (n: number) => (n < 15000 ? _.of(E.left(n + 1)) : _.of(E.right('ok ' + n)))
    U.deepStrictEqual(_.ChainRec.chainRec(0, f)(), 'ok 15000')
  })

  it('do notation', () => {
    U.deepStrictEqual(
      pipe(
        _.of(1),
        _.bindTo('a'),
        _.bind('b', () => _.of('b'))
      )(),
      { a: 1, b: 'b' }
    )
  })

  it('apS', () => {
    U.deepStrictEqual(pipe(_.of(1), _.bindTo('a'), _.apS('b', _.of('b')))(), { a: 1, b: 'b' })
  })

  describe('array utils', () => {
    const input: ReadonlyNonEmptyArray<string> = ['a', 'b']

    it('traverseReadonlyArrayWithIndex', () => {
      const f = _.traverseReadonlyArrayWithIndex((i, a: string) => _.of(a + i))
      U.strictEqual(pipe(RA.empty, f)(), RA.empty)
      U.deepStrictEqual(pipe(input, f)(), ['a0', 'b1'])
    })

    // old
    it('sequenceArray', () => {
      // tslint:disable-next-line: readonly-array
      const log: Array<number | string> = []
      const append = (n: number): _.IO<number> => () => {
        log.push(n)
        return n
      }
      // tslint:disable-next-line: deprecation
      U.deepStrictEqual(pipe([append(1), append(2)], _.sequenceArray)(), [1, 2])
      U.deepStrictEqual(log, [1, 2])
    })
  })
})
