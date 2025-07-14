

import { VariableValue } from '@perses-dev/core';
import { getInitalValuesFromQueryParameters, decodeVariableValue, encodeVariableValue } from './query-params';

describe('getInitalValuesFromQueryParameters', () => {
  test('base case', () => {
    expect(
      getInitalValuesFromQueryParameters({
        'var-foo': 'bar',
        'var-baz': ['qux', 'quux'],
      })
    ).toEqual({
      foo: 'bar',
      baz: ['qux', 'quux'],
    });
  });
});

describe('encodeVariableValue', () => {
  const testCases = [
    {
      input: 'foo',
      expected: 'foo',
    },
    {
      input: ['foo', 'bar'],
      expected: 'foo,bar',
    },
    {
      input: '$__all',
      expected: '$__all',
    },
  ];

  testCases.forEach(({ input, expected }) => {
    test(`encodes ${input} as ${expected}`, () => {
      expect(encodeVariableValue(input)).toEqual(expected);
    });
  });
});

describe('decodeVariableValue', () => {
  const testCases: Array<{ input: string; expected: VariableValue }> = [
    {
      input: 'foo',
      expected: 'foo',
    },
    {
      input: 'foo,bar',
      expected: ['foo', 'bar'],
    },
    {
      input: '$__all',
      expected: '$__all',
    },
  ];

  testCases.forEach(({ input, expected }) => {
    test(`encodes ${input} as ${expected}`, () => {
      expect(decodeVariableValue(input)).toEqual(expected);
    });
  });
});
