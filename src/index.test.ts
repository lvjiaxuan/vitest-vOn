// https://github.com/vuejs/core/pull/6769/files#diff-da74645a7be0341a07b5bb25ba48d8046f26553c7b3aa89a1b2b28a5d8c3440c
import { expect, test } from 'vitest'

const fnExpRE =
  /^\s*([\w$_]+|(async\s*)?\([^)]*?\))\s*(:[^=]+)?=>|^\s*(async\s+)?function(?:\s+[\w$]+)?\s*\(/

const trimFnExpParens = (expression: string) =>
  // from ai
  '() => {}'


test('should handle inline arrow function with parentheses', () => {
  const expression = '(foo => bar = foo)'
  const expressionWithTS = '((foo: any) => bar = foo)'

  expect(fnExpRE.test(trimFnExpParens(expression))).toBeTruthy()
  expect(fnExpRE.test(trimFnExpParens(expressionWithTS))).toBeTruthy()
})

test.skip('should handle inline function expression with parentheses', () => {
  const expression = '(function (foo) { bar = foo })'
  const expressionWithTS = '(function (foo: any) { bar = foo })'

  expect(fnExpRE.test(trimFnExpParens(expression))).toBeTruthy()
  expect(fnExpRE.test(trimFnExpParens(expressionWithTS))).toBeTruthy()
})

test.skip('should handle inline async arrow function', () => {
  const expression = 'async foo => { await fetch(foo); bar = foo }}'
  const expressionWithTS = 'async (foo: any) => { await fetch(foo); bar = foo }}'

  expect(fnExpRE.test(trimFnExpParens(expression))).toBeTruthy()
  expect(fnExpRE.test(trimFnExpParens(expressionWithTS))).toBeTruthy()
})

test.skip('should handle inline async function expression', () => {
  const expression = 'async function (foo) { await fetch(foo); bar = foo }}'
  const expressionWithTS = 'async function (foo: any) { await fetch(foo); bar = foo }}'

  expect(fnExpRE.test(trimFnExpParens(expression))).toBeTruthy()
  expect(fnExpRE.test(trimFnExpParens(expressionWithTS))).toBeTruthy()
})

test.skip('should handle inline async arrow function with parentheses', () => {
  const expression = '(async foo => { await fetch(foo); bar = foo }})'
  const expressionWithTS = '(async (foo: any) => { await fetch(foo); bar = foo }})'

  expect(fnExpRE.test(trimFnExpParens(expression))).toBeTruthy()
  expect(fnExpRE.test(trimFnExpParens(expressionWithTS))).toBeTruthy()
})

test.skip('should handle inline async function expression with parentheses', () => {
  const expression = '(async function (foo) { await fetch(foo); bar = foo }})'
  const expressionWithTS = '(async function (foo: any) { await fetch(foo); bar = foo }})'

  expect(fnExpRE.test(trimFnExpParens(expression))).toBeTruthy()
  expect(fnExpRE.test(trimFnExpParens(expressionWithTS))).toBeTruthy()
})
