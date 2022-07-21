import { assertEquals, assertStrictEquals } from "https://deno.land/std@0.148.0/testing/asserts.ts";
import { expandGlobSync } from "https://deno.land/std/fs/mod.ts";
import * as _ from "../deno_dist/index.ts"
import {
    describe,
    it
} from "https://deno.land/std@0.148.0/testing/bdd.ts"

type ObjectKey = keyof typeof _

const getExportName = (name: string): string => {
  if (name === 'HKT' || name === 'IO') {
    return name.toLowerCase()
  }
  if (name === 'IOEither') {
    return 'ioEither'
  }
  if (name === 'IORef') {
    return 'ioRef'
  }
  if (name === 'TaskEither') {
    return 'taskEither'
  }
  return name.substring(0, 1).toLowerCase() + name.substring(1)
}

function getModuleNames(): ReadonlyArray<string> {
    return [...expandGlobSync("/home/lukh/Desktop/fp_ts/deno_dist/**/*.ts")]
	.map(f => f.name.slice(0, -3))
	.filter((name) => name !== 'internal')
}

describe('index', () => {
  it('check exported modules', () => {
    const moduleNames = getModuleNames()
    const fp = _
    moduleNames.forEach((name) => {
      if (name !== 'index') {
          const exportName = getExportName(name)
	  console.log(name, exportName)
        assertEquals(
          fp[exportName as ObjectKey] !== undefined,
          true,
          `The "${name}" module is not exported in src/index.ts as ${exportName}`
        )
      }
    })
  })
})
