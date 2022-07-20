import * as U from './util.ts'
import * as RA from '../deno_dist/ReadonlyArray.ts'
import { getFunctorComposition } from '../deno_dist/Functor.ts'
import * as option from '../deno_dist/Option.ts'
import {
    describe,
    it
} from "https://deno.land/std@0.148.0/testing/bdd.ts"

describe('Functor', () => {
  it('getFunctorComposition', () => {
    // tslint:disable-next-line: deprecation
    const arrayOption = getFunctorComposition(RA.Functor, option.Functor)
    U.deepStrictEqual(arrayOption.map([option.some(1)], U.double), [option.some(2)])
  })
})
