import { pipe } from '../deno_dist/function.ts'
import * as RT from '../deno_dist/ReaderTask.ts'
import * as RA from '../deno_dist/ReadonlyArray.ts'
import * as RR from '../deno_dist/ReadonlyRecord.ts'
import * as T from '../deno_dist/Task.ts'
import * as S from '../deno_dist/string.ts'
import * as _ from '../deno_dist/Witherable.ts'
import * as U from './util.ts'
import {
    describe,
    it
} from "https:/deno.land/std@0.148.0/testing/bdd.ts"

describe('Witherable', () => {
  describe('filterE', () => {
    const filterERA = _.filterE(RA.Witherable)
    const filterERR = _.filterE(RR.getWitherable(S.Ord))

    it('Applicative1', async () => {
      const f = (n: number) => T.of(n % 2 === 0)
      U.deepStrictEqual(await pipe([1, 2], filterERA(T.ApplicativePar)(f))(), [2])
      U.deepStrictEqual(await pipe({ a: 1, b: 2 }, filterERR(T.ApplicativePar)(f))(), { b: 2 })
    })

    it('Applicative2', async () => {
      const f = (n: number) => RT.of(n % 2 === 0)
      U.deepStrictEqual(await pipe([1, 2], filterERA(RT.ApplicativePar)(f))({})(), [2])
      U.deepStrictEqual(await pipe({ a: 1, b: 2 }, filterERR(RT.ApplicativePar)(f))({})(), { b: 2 })
    })
  })
})
