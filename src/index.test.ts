// https://github.com/vuejs/core/pull/6769/files#diff-da74645a7be0341a07b5bb25ba48d8046f26553c7b3aa89a1b2b28a5d8c3440c
import { expect, test } from 'vitest'

// old
// const fnExpRE = /^\s*([\w$_]+|(async\s*)?\([^)]*?\))\s*(:[^=]+)?=>|^\s*(async\s+)?function(?:\s+[\w$]+)?\s*\(/
const fnExpRE = /(^[\s\(]*((async\s*)?([\w$_]+|\([^)]*?\))\s*(:[^=]+)?=>|(async\s+)?function(?:\s*[\w$_]*)\s*\([^)]*?\)\s*(:[^=]+)?{))[\s\S]+\)*/

test('should handle inline arrow function wrapped in parentheses', () => {
  const expression = '(foo => bar = foo)'
  const expressionWithTS = '((foo: any): any => bar = foo)'

  expect(fnExpRE.test(expression)).toBeTruthy()
  expect(fnExpRE.test(expressionWithTS)).toBeTruthy()
})

test('should handle inline function expression wrapped in parentheses', () => {
  const expression = '(function (foo) { bar = foo })'
  const expressionWithTS = '(function (foo: any): any { bar = foo })'

  expect(fnExpRE.test(expression)).toBeTruthy()
  expect(fnExpRE.test(expressionWithTS)).toBeTruthy()
})

test('should handle inline async arrow function', () => {
  const expression = 'async foo => { await fetch(foo); bar = foo; }'
  const expressionWithTS = 'async (foo: any): Promise<any> => { await fetch(foo); bar = foo }}'

  expect(fnExpRE.test(expression)).toBeTruthy()
  expect(fnExpRE.test(expressionWithTS)).toBeTruthy()
})

test('should handle inline async function expression', () => {
  const expression = 'async function (foo) { await fetch(foo); bar = foo }}' // old reg works
  const expressionWithTS = 'async function (foo: any): Promise<any> { await fetch(foo); bar = foo }}'

  expect(fnExpRE.test(expression)).toBeTruthy()
  expect(fnExpRE.test(expressionWithTS)).toBeTruthy()
})

test('should handle inline async arrow function wrapped in parentheses', () => {
  const expression = '(async foo => { await fetch(foo); bar = foo }})'
  const expressionWithTS = '(async (foo: any): Promise<any> => { await fetch(foo); bar = foo }})'

  expect(fnExpRE.test(expression)).toBeTruthy()
  expect(fnExpRE.test(expressionWithTS)).toBeTruthy()
})

test('should handle inline async function expression wrapped in parentheses', () => {
  const expression = '(async function (foo) {\nawait fetch(foo)\nbar = foo\n})'
  const expressionWithTS = '(async function (foo: any): Promise<any> {\nawait fetch(foo)\nbar = foo\n}})'

  expect(fnExpRE.test(expression)).toBeTruthy()
  expect(fnExpRE.test(expressionWithTS)).toBeTruthy()
})
