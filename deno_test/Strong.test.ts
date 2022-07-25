import * as U from './util.ts'
import * as R from '../deno_dist/Reader.ts'
import { fanout, splitStrong } from '../deno_dist/Strong.ts'
import {
    describe,
    it
} from "https:/deno.land/std@0.148.0/testing/bdd.ts"

describe('Strong', () => {
  it('splitStrong', () => {
    const ab = (s: string) => s.length
    const cd = (n: number) => n >= 2
    // tslint:disable-next-line: deprecation
    U.deepStrictEqual(splitStrong({ ...R.Strong, ...R.Category })(ab, cd)(['foo', 2]), [3, true])
    // tslint:disable-next-line: deprecation
    U.deepStrictEqual(splitStrong({ ...R.Strong, ...R.Category })(ab, cd)(['a', 1]), [1, false])
  })

  it('fanout', () => {
    const ab = (s: string) => s.length
    const ac = (s: string) => s === s.toLowerCase()
    // tslint:disable-next-line: deprecation
    U.deepStrictEqual(fanout({ ...R.Strong, ...R.Category })(ab, ac)('foo'), [3, true])
    // tslint:disable-next-line: deprecation
    U.deepStrictEqual(fanout({ ...R.Strong, ...R.Category })(ab, ac)('A'), [1, false])
  })
})
