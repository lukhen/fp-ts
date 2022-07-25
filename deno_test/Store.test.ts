import { pipe } from '../deno_dist/function.ts'
import * as RA from '../deno_dist/ReadonlyArray.ts'
import * as _ from '../deno_dist/Store.ts'
import * as S from '../deno_dist/string.ts'
import * as U from './util.ts'
import {
    describe,
    it
} from "https:/deno.land/std@0.148.0/testing/bdd.ts"

describe('Store', () => {
  describe('pipeables', () => {
    it('map', () => {
      const wa: _.Store<string, number> = { peek: S.size, pos: 'a' }
      U.deepStrictEqual(
        _.extract(
          pipe(
            wa,
            _.map((n) => n + 1)
          )
        ),
        2
      )
    })

    it('extend', () => {
      const wa: _.Store<string, number> = { peek: S.size, pos: 'a' }
      U.deepStrictEqual(
        _.extract(
          pipe(
            wa,
            _.extend((wa) =>
              _.extract(
                pipe(
                  wa,
                  _.map((n) => n + 1)
                )
              )
            )
          )
        ),
        2
      )
    })

    it('duplicate', () => {
      const wa: _.Store<string, number> = { peek: S.size, pos: 'a' }
      U.deepStrictEqual(_.extract(_.extract(pipe(wa, _.duplicate))), 1)
    })
  })

  it('seek', () => {
    const wa: _.Store<string, number> = { peek: S.size, pos: 'a' }
    U.deepStrictEqual(_.extract(pipe(wa, _.seek('aa'))), 2)
  })

  it('seeks', () => {
    const wa: _.Store<string, number> = { peek: S.size, pos: 'a' }
    U.deepStrictEqual(
      _.extract(
        pipe(
          wa,
          _.seeks((s) => s + 'a')
        )
      ),
      2
    )
  })

  it('peeks', () => {
    const wa: _.Store<string, number> = { peek: S.size, pos: 'a' }
    U.deepStrictEqual(
      pipe(
        wa,
        _.peeks((s) => s + 'a')
      ),
      2
    )
  })

  it('experiment', () => {
    const wa: _.Store<string, number> = { peek: S.size, pos: 'a' }
    U.deepStrictEqual(
      pipe(
        wa,
        _.experiment(RA.Functor)((s) => [s, s + 'a'])
      ),
      [1, 2]
    )
  })
})
