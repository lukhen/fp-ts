import * as E from '../deno_dist/Either.ts'
import * as IO from '../deno_dist/IO.ts'
import * as _ from '../deno_dist/ReaderT.ts'
import * as TE from '../deno_dist/TaskEither.ts'
import * as U from './util.ts'
import {
    describe,
    it
} from "https://deno.land/std@0.148.0/testing/bdd.ts"

describe('ReaderT', () => {
  it('fromNaturalTransformation', async () => {
    const fromReaderIO = _.fromNaturalTransformation(TE.fromIO)
    const f = (s: string): IO.IO<number> => IO.of(s.length)
    const fa = fromReaderIO(f)
    U.deepStrictEqual(await fa('a')(), E.right(1))
  })
})
