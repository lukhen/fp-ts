import * as U from './util.ts'
import * as I from '../deno_dist/IO.ts'
import { IORef, newIORef } from '../deno_dist/IORef.ts'
import { pipe } from '../deno_dist/function.ts'
import {
    describe,
    it
} from "https://deno.land/std@0.148.0/testing/bdd.ts"

describe('IORef', () => {
  it('read', () => {
    const ref = new IORef(1)
    U.deepStrictEqual(ref.read(), 1)
  })

  it('write', () => {
    const ref = new IORef(1)
    U.deepStrictEqual(
      pipe(
        ref.write(2),
        I.chain(() => ref.read)
      )(),
      2
    )
  })

  it('modify', () => {
    const ref = new IORef(1)
    U.deepStrictEqual(
      pipe(
        ref.modify(U.double),
        I.chain(() => ref.read)
      )(),
      2
    )
  })

  it('newIORef', () => {
    U.deepStrictEqual(
      pipe(
        newIORef(1),
        I.chain((ref) => ref.read)
      )(),
      1
    )
  })

  it('pipe', () => {
    const ref = new IORef(1)
    pipe(2, ref.write)()
    U.deepStrictEqual(ref.read(), 2)
    pipe(() => 3, ref.modify)()
    U.deepStrictEqual(ref.read(), 3)
  })
})
