import * as _ from '../deno_dist/Alternative.ts'
import * as O from '../deno_dist/Option.ts'
import * as U from './util.ts'
import {
  describe,
  it,
} from "https://deno.land/std@0.148.0/testing/bdd.ts"

describe('Alternative', () => {
  it('altAll', () => {
    const altAll = _.altAll(O.Alternative)
    U.deepStrictEqual(altAll([]), O.none)
    U.deepStrictEqual(altAll([O.none]), O.none)
    U.deepStrictEqual(altAll([O.none, O.some(1)]), O.some(1))
  })
})
