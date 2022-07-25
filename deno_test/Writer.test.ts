import * as U from './util.ts'
import { pipe, tuple } from '../deno_dist/function.ts'
import * as S from '../deno_dist/string.ts'
import * as _ from '../deno_dist/Writer.ts'
import {
    describe,
    it
} from "https:/deno.land/std@0.148.0/testing/bdd.ts"

describe('Writer', () => {
  describe('pipeables', () => {
    it('map', () => {
      const x: _.Writer<string, number> = () => [1, 'a']
      U.deepStrictEqual(pipe(x, _.map(U.double))(), [2, 'a'])
    })
  })

  it('evalWriter', () => {
    U.deepStrictEqual(
      // tslint:disable-next-line: deprecation
      _.evalWriter(() => [1, 'a']),
      1
    )
  })

  it('execWriter', () => {
    U.deepStrictEqual(
      // tslint:disable-next-line: deprecation
      _.execWriter(() => [1, 'a']),
      'a'
    )
  })

  it('evaluate', () => {
    U.deepStrictEqual(pipe((() => [1, 'a']) as _.Writer<string, number>, _.evaluate), 1)
  })

  it('execute', () => {
    U.deepStrictEqual(pipe((() => [1, 'a']) as _.Writer<string, number>, _.execute), 'a')
  })

  it('tell', () => {
    U.deepStrictEqual(_.tell(1)(), [undefined, 1])
  })

  it('listen', () => {
    U.deepStrictEqual(_.listen(() => [1, 'a'])(), [[1, 'a'], 'a'])
  })

  it('pass', () => {
    U.deepStrictEqual(_.pass(() => [tuple(1, (w: string) => w + 'b'), 'a'])(), [1, 'ab'])
  })

  it('listens', () => {
    const fa: _.Writer<string, number> = () => [1, 'a']
    U.deepStrictEqual(
      pipe(
        fa,
        _.listens((w) => w.length)
      )(),
      [[1, 1], 'a']
    )
  })

  it('censor', () => {
    const fa: _.Writer<ReadonlyArray<string>, number> = () => [1, ['a', 'b']]
    U.deepStrictEqual(
      pipe(
        fa,
        _.censor((w) => w.filter((a) => a !== 'a'))
      )(),
      [1, ['b']]
    )
  })

  describe('getMonad', () => {
    const M = _.getMonad(S.Monoid)

    it('of', () => {
      U.deepStrictEqual(M.of(1)(), [1, ''])
    })

    it('ap', () => {
      const fab: _.Writer<string, (n: number) => number> = () => [(n: number) => n * 2, 'a']
      const fa: _.Writer<string, number> = () => [1, 'b']
      U.deepStrictEqual(M.ap(fab, fa)(), [2, 'ab'])
    })

    it('chain', () => {
      const fa: _.Writer<string, number> = () => [1, 'a']
      const f = (n: number): _.Writer<string, number> => () => [n * 2, 'b']
      U.deepStrictEqual(M.chain(fa, f)(), [2, 'ab'])
    })
  })
})
