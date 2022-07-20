import * as U from './util.ts'
import * as RA from '../deno_dist/ReadonlyArray.ts'
import { getFoldableWithIndexComposition } from '../deno_dist/FoldableWithIndex.ts'
import * as S from '../deno_dist/string.ts'
import {
    describe,
    it
} from "https://deno.land/std@0.148.0/testing/bdd.ts"

describe('FoldableWithIndex', () => {
  it('getFoldableWithIndexComposition', () => {
    // tslint:disable-next-line: deprecation
    const arrayOfArray = getFoldableWithIndexComposition(RA.FoldableWithIndex, RA.FoldableWithIndex)
    const fa: ReadonlyArray<ReadonlyArray<string>> = [
      ['a', 'b'],
      ['c', 'd']
    ]

    U.deepStrictEqual(
      arrayOfArray.reduceWithIndex(fa, '', ([i, j], b: string, a: string) => b + a + i + j),
      'a00b01c10d11'
    )

    U.deepStrictEqual(
      arrayOfArray.foldMapWithIndex(S.Monoid)(fa, ([i, j], a) => a + i + j),
      'a00b01c10d11'
    )

    U.deepStrictEqual(
      arrayOfArray.reduceRightWithIndex(fa, '', ([i, j], a: string, b: string) => b + a + i + j),
      'd11c10b01a00'
    )
  })
})
