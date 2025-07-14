

import { parseVariables, replaceVariable, replaceVariables } from './variables';

describe('parseVariables()', () => {
  const tests = [
    {
      text: 'hello $var1 world $var2',
      variables: ['var1', 'var2'],
    },
  ];

  tests.forEach(({ text, variables }) => {
    it(`parses ${text}`, () => {
      expect(parseVariables(text)).toEqual(variables);
    });
  });
});

describe('replaceVariable()', () => {
  const tests = [
    {
      text: 'hello $var1',
      varName: 'var1',
      value: 'world',
      expected: 'hello world',
    },
    {
      text: 'hello $var1 $var1',
      varName: 'var1',
      value: 'world',
      expected: 'hello world world',
    },
    {
      text: 'hello $var1',
      varName: 'var1',
      value: ['world', 'w'],
      expected: 'hello (world|w)',
    },
    {
      text: 'hello $var1 $var1',
      varName: 'var1',
      value: ['world', 'w'],
      expected: 'hello (world|w) (world|w)',
    },
  ];

  tests.forEach(({ text, value, varName, expected }) => {
    it(`replaces ${text} ${value}`, () => {
      expect(replaceVariable(text, varName, value)).toEqual(expected);
    });
  });
});

describe('replaceVariables()', () => {
  const tests = [
    {
      text: 'hello $var1 $var2',
      state: {
        var1: { value: 'world', loading: false },
        var2: { value: 'world', loading: false },
      },
      expected: 'hello world world',
    },
    {
      text: 'hello $var1 $var2',
      state: {
        var1: { value: 'world', loading: false },
        var2: { value: ['a', 'b'], loading: false },
      },
      expected: 'hello world (a|b)',
    },
    {
      text: 'hello $var1 $var2 $var3',
      state: {
        var1: { value: 'world', loading: false },
        var2: { value: 'world', loading: false },
      },
      expected: 'hello world world $var3',
    },
  ];

  tests.forEach(({ text, state, expected }) => {
    it(`replaces ${text} ${JSON.stringify(state)}`, () => {
      expect(replaceVariables(text, state)).toEqual(expected);
    });
  });
});
