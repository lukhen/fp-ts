import * as U from './util.ts'
import * as _ from '../deno_dist/BooleanAlgebra.ts'
import * as B from '../deno_dist/boolean.ts'
import {
  describe,
  it,
} from "https://deno.land/std@0.148.0/testing/bdd.ts"

describe('BooleanAlgebra', () => {
  it('booleanAlgebraBoolean', () => {
    // tslint:disable-next-line: deprecation
    const BA = _.booleanAlgebraBoolean
    U.deepStrictEqual(BA.implies(true, true), true)
    U.deepStrictEqual(BA.implies(true, false), false)
    U.deepStrictEqual(BA.implies(false, true), true)
    U.deepStrictEqual(BA.implies(false, false), true)

    U.deepStrictEqual(BA.join(true, true), true)
    U.deepStrictEqual(BA.join(true, false), true)
    U.deepStrictEqual(BA.join(false, true), true)
    U.deepStrictEqual(BA.join(false, false), false)

    U.deepStrictEqual(BA.meet(true, true), true)
    U.deepStrictEqual(BA.meet(true, false), false)

    U.deepStrictEqual(BA.not(true), false)
    U.deepStrictEqual(BA.not(false), true)

    U.deepStrictEqual(BA.one, true)
    U.deepStrictEqual(BA.zero, false)
  })

  it('booleanAlgebraVoid', () => {
    const BA = _.booleanAlgebraVoid
    U.deepStrictEqual(BA.implies(undefined, undefined), undefined)

    U.deepStrictEqual(BA.join(undefined, undefined), undefined)

    U.deepStrictEqual(BA.meet(undefined, undefined), undefined)

    U.deepStrictEqual(BA.not(undefined), undefined)

    U.deepStrictEqual(BA.one, undefined)
    U.deepStrictEqual(BA.zero, undefined)
  })

  it('reverse', () => {
    const BA = _.reverse(B.BooleanAlgebra)
    U.deepStrictEqual(BA.implies(true, true), true)
    U.deepStrictEqual(BA.implies(true, false), false)
    U.deepStrictEqual(BA.implies(false, true), true)
    U.deepStrictEqual(BA.implies(false, false), true)

    U.deepStrictEqual(BA.join(true, true), true)
    U.deepStrictEqual(BA.join(true, false), false)
    U.deepStrictEqual(BA.join(false, true), false)
    U.deepStrictEqual(BA.join(false, false), false)

    U.deepStrictEqual(BA.meet(true, true), true)
    U.deepStrictEqual(BA.meet(true, false), true)

    U.deepStrictEqual(BA.not(true), false)
    U.deepStrictEqual(BA.not(false), true)

    U.deepStrictEqual(BA.one, false)
    U.deepStrictEqual(BA.zero, true)
  })
})
