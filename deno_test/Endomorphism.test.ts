import * as _ from '../deno_dist/Endomorphism.ts'
import * as U from './util.ts'
import {
    describe,
    it
} from "https://deno.land/std@0.148.0/testing/bdd.ts"

describe('Endomorphism', () => {
  it('getMonoid', () => {
    const M = _.getMonoid<number>()
    const inc = (n: number) => n + 1
    const f = M.concat(inc, U.double)
    U.deepStrictEqual(f(3), 8)
  })
})
