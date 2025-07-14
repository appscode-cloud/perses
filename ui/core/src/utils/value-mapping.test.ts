

import { ValueMapping } from '../model';
import { applyValueMapping } from './value-mapping';

describe('applyValueMapping', () => {
  it('should return the original value if no mappings are provided', () => {
    const result = applyValueMapping('test');
    expect(result).toEqual({ value: 'test' });
  });

  it('should map value based on Value mapping', () => {
    const mappings: ValueMapping[] = [
      {
        kind: 'Value',
        spec: {
          value: 'test',
          result: { value: 'mapped', color: 'red' },
        },
      },
    ];
    const result = applyValueMapping('test', mappings);
    expect(result).toEqual({ value: 'mapped', color: 'red' });
  });

  it('should map value based on Range mapping', () => {
    const mappings: ValueMapping[] = [
      {
        kind: 'Range',
        spec: {
          from: 1,
          to: 10,
          result: { value: 'in range', color: 'blue' },
        },
      },
    ];
    const result = applyValueMapping(5, mappings);
    expect(result).toEqual({ value: 'in range', color: 'blue' });
  });

  it('should map value based on Regex exact match mapping', () => {
    const mappings: ValueMapping[] = [
      {
        kind: 'Regex',
        spec: {
          pattern: '^test.*',
          result: { value: 'regex match', color: 'green' },
        },
      },
    ];
    const result = applyValueMapping('test123', mappings);
    expect(result).toEqual({ value: 'regex match', color: 'green' });
  });

  it('should map value based on Regex with groups mapping', () => {
    const mappings: ValueMapping[] = [
      {
        kind: 'Regex',
        spec: {
          pattern: '(.+)0+(.+)0+(.+)',
          result: { value: '$1.$2.$3', color: 'green' },
        },
      },
    ];
    const result = applyValueMapping('30300', mappings);
    expect(result).toEqual({ value: '3.3.0', color: 'green' });
  });

  it('should map value based on Misc mapping', () => {
    const mappings: ValueMapping[] = [
      {
        kind: 'Misc',
        spec: {
          value: 'empty',
          result: { value: 'is empty', color: 'yellow' },
        },
      },
    ];
    const result = applyValueMapping('', mappings);
    expect(result).toEqual({ value: 'is empty', color: 'yellow' });
  });

  it('should return the original value if no mapping matches', () => {
    const mappings: ValueMapping[] = [
      {
        kind: 'Value',
        spec: {
          value: 'no match',
          result: { value: 'mapped', color: 'red' },
        },
      },
    ];
    const result = applyValueMapping('test', mappings);
    expect(result).toEqual({ value: 'test' });
  });
});
