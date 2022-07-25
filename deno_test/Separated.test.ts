import * as fc from 'https://cdn.skypack.dev/fast-check';
import { isDeepStrictEqual } from "https://deno.land/std@0.149.0/node/internal/util/comparisons.ts"

import * as _ from '../deno_dist/Separated.ts'
import { pipe } from '../deno_dist/function.ts'
import {
    describe,
    it
} from "https://deno.land/std@0.148.0/testing/bdd.ts"

describe('Separated', () => {
  describe('pipeables', () => {
    it('mapLeft', () =>
      fc.assert(
          fc.property(fc.integer(), fc.integer(), (left: any, right: any) => {
          isDeepStrictEqual(
            pipe(
              _.separated(left, right),
              _.mapLeft((n) => n.toString())
            ),
            _.separated(`${left}`, right)
          )
          isDeepStrictEqual(
            _.Bifunctor.mapLeft(_.separated(left, right), (n) => n.toString()),
            _.separated(`${left}`, right)
          )
        })
      ))

    it('map', () =>
      fc.assert(
          fc.property(fc.integer(), fc.integer(), (left: any, right: any) => {
          isDeepStrictEqual(
            pipe(
              _.separated(left, right),
              _.map((n) => n.toString())
            ),
            _.separated(left, `${right}`)
          )
          isDeepStrictEqual(
            _.Functor.map(_.separated(left, right), (n) => n.toString()),
            _.separated(left, `${right}`)
          )
        })
      ))

    it('bimap', () =>
      fc.assert(
          fc.property(fc.integer(), fc.integer(), (left: any, right: any) => {
          isDeepStrictEqual(
            pipe(
              _.separated(left, right),
              _.bimap(
                (n) => n.toString(),
                (n) => n.toString()
              )
            ),
            _.separated(`${left}`, `${right}`)
          )
          isDeepStrictEqual(
            _.Bifunctor.bimap(
              _.separated(left, right),
              (n) => n.toString(),
              (n) => n.toString()
            ),
            _.separated(`${left}`, `${right}`)
          )
        })
      ))
  })
})
