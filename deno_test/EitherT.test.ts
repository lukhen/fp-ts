import * as U from './util.ts'
import * as E from '../deno_dist/Either.ts'
import { getEitherM } from '../deno_dist/EitherT.ts'
import * as I from '../deno_dist/IO.ts'
import {
    describe,
    it
} from "https://deno.land/std@0.148.0/testing/bdd.ts"

describe('EitherT', () => {
  // tslint:disable-next-line: deprecation
  const T = getEitherM(I.Monad)

  it('fold', () => {
    const onLeft = (s: string) => I.of(`left(${s})`)
    const onRight = (n: number) => I.of(`right(${n})`)
    U.deepStrictEqual(T.fold(I.of(E.right(1)), onLeft, onRight)(), 'right(1)')
    U.deepStrictEqual(T.fold(I.of(E.left('bb')), onLeft, onRight)(), 'left(bb)')
  })

  it('getOrElse', () => {
    const onLeft = (s: string) => I.of(`left(${s})`)
    U.deepStrictEqual(T.getOrElse(I.of(E.right('a')), onLeft)(), 'a')
    U.deepStrictEqual(T.getOrElse(I.of(E.left('bb')), onLeft)(), 'left(bb)')
  })
})
