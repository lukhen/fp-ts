import * as U from './util.ts'
import { getMinMaxBoundedDistributiveLattice } from '../deno_dist/BoundedDistributiveLattice.ts'
import * as N from '../deno_dist/number.ts'
import {
  describe,
  it,
} from "https://deno.land/std@0.148.0/testing/bdd.ts"


describe('BoundedDistributiveLattice', () => {
  it('getMinMaxBoundedDistributiveLattice', () => {
    const BDL = getMinMaxBoundedDistributiveLattice(N.Ord)(0, 1)
    U.deepStrictEqual(BDL.join(0.2, 0.4), 0.4)
    U.deepStrictEqual(BDL.meet(0.2, 0.4), 0.2)
    U.deepStrictEqual(BDL.one, 1)
    U.deepStrictEqual(BDL.zero, 0)
  })
})
