

import { Transform, transformData } from '@perses-dev/core';

function generateMockFlattenQueriesResult(): Array<Record<string, unknown>> {
  return [
    // QUERY #1
    {
      ['timestamp #1']: 1630000000,
      ['value #1']: 55,
      ['job #1']: 'job1',
      ['instance #1']: 'instance1',
    },
    {
      ['timestamp #1']: 1630000000,
      ['value #1']: 33,
      ['job #1']: 'job1',
      ['instance #1']: 'instance2',
    },
    {
      ['timestamp #1']: 1630000000,
      ['value #1']: 45,
      ['job #1']: 'job1',
      ['instance #1']: 'instance3',
    },
    // QUERY #2
    {
      ['timestamp #2']: 1630000000,
      ['value #2']: 112,
      ['job #2']: 'job1',
      ['instance #2']: 'instance1',
    },
    {
      ['timestamp #2']: 1630000000,
      ['value #2']: 20,
      ['job #2']: 'job1',
      ['instance #2']: 'instance2',
    },
    {
      ['timestamp #2']: 1630000000,
      ['value #2']: 10,
      ['job #2']: 'job1',
      ['instance #2']: 'instance3',
    },
  ];
}

describe('No Transform', () => {
  test('output should be similar to input', () => {
    const input = generateMockFlattenQueriesResult();
    const output = transformData(input, []);
    expect(output).toEqual(input);
  });
});

describe('Merge Indexed Columns Transform', () => {
  test('output should be similar to input if column does not exist', () => {
    const input = generateMockFlattenQueriesResult();

    const mergeTransform: Transform = {
      kind: 'MergeIndexedColumns',
      spec: {
        column: 'non-existent-column',
      },
    };

    const output = transformData(input, [mergeTransform]);
    expect(output).toEqual(input);
  });

  test('output should have instance column merged', () => {
    const input = generateMockFlattenQueriesResult();

    const mergeTransform: Transform = {
      kind: 'MergeIndexedColumns',
      spec: {
        column: 'instance',
      },
    };

    const result = [
      // QUERY #1
      {
        ['timestamp #1']: 1630000000,
        ['value #1']: 55,
        ['job #1']: 'job1',
        ['instance']: 'instance1',
      },
      {
        ['timestamp #1']: 1630000000,
        ['value #1']: 33,
        ['job #1']: 'job1',
        ['instance']: 'instance2',
      },
      {
        ['timestamp #1']: 1630000000,
        ['value #1']: 45,
        ['job #1']: 'job1',
        ['instance']: 'instance3',
      },
      // QUERY #2
      {
        ['timestamp #2']: 1630000000,
        ['value #2']: 112,
        ['job #2']: 'job1',
        ['instance']: 'instance1',
      },
      {
        ['timestamp #2']: 1630000000,
        ['value #2']: 20,
        ['job #2']: 'job1',
        ['instance']: 'instance2',
      },
      {
        ['timestamp #2']: 1630000000,
        ['value #2']: 10,
        ['job #2']: 'job1',
        ['instance']: 'instance3',
      },
    ];

    const output = transformData(input, [mergeTransform]);
    expect(output).toEqual(result);
  });

  test('should be able to chain merge transforms', () => {
    const input = generateMockFlattenQueriesResult();

    const transforms: Transform[] = [
      {
        kind: 'MergeIndexedColumns',
        spec: {
          column: 'timestamp',
        },
      },
      {
        kind: 'MergeIndexedColumns',
        spec: {
          column: 'value',
        },
      },
      {
        kind: 'MergeIndexedColumns',
        spec: {
          column: 'job',
        },
      },
      {
        kind: 'MergeIndexedColumns',
        spec: {
          column: 'instance',
        },
      },
    ];

    const result = [
      // QUERY #1
      {
        ['timestamp']: 1630000000,
        ['value']: 55,
        ['job']: 'job1',
        ['instance']: 'instance1',
      },
      {
        ['timestamp']: 1630000000,
        ['value']: 33,
        ['job']: 'job1',
        ['instance']: 'instance2',
      },
      {
        ['timestamp']: 1630000000,
        ['value']: 45,
        ['job']: 'job1',
        ['instance']: 'instance3',
      },
      // QUERY #2
      {
        ['timestamp']: 1630000000,
        ['value']: 112,
        ['job']: 'job1',
        ['instance']: 'instance1',
      },
      {
        ['timestamp']: 1630000000,
        ['value']: 20,
        ['job']: 'job1',
        ['instance']: 'instance2',
      },
      {
        ['timestamp']: 1630000000,
        ['value']: 10,
        ['job']: 'job1',
        ['instance']: 'instance3',
      },
    ];

    const output = transformData(input, transforms);
    expect(output).toEqual(result);
  });
});

describe('Join By Column Transform', () => {
  test('output should contain one row if column does not exist', () => {
    const input = generateMockFlattenQueriesResult();

    const joinTransform: Transform = {
      kind: 'JoinByColumnValue',
      spec: {
        columns: ['non-existent-column'],
      },
    };

    const result = [
      {
        'timestamp #1': 1630000000,
        'timestamp #2': 1630000000,
        'value #1': 45,
        'value #2': 10,
        'job #1': 'job1',
        'job #2': 'job1',
        'instance #1': 'instance3',
        'instance #2': 'instance3',
      },
    ];

    const output = transformData(input, [joinTransform]);
    expect(output).toEqual(result);
  });

  test('output should have one column joined', () => {
    const input = generateMockFlattenQueriesResult();

    const transforms: Transform[] = [
      {
        kind: 'MergeIndexedColumns',
        spec: {
          column: 'instance',
        },
      },
      {
        kind: 'JoinByColumnValue',
        spec: {
          columns: ['instance'],
        },
      },
    ];

    const result = [
      // QUERY #1
      {
        ['timestamp #1']: 1630000000,
        ['timestamp #2']: 1630000000,

        ['value #1']: 55,
        ['value #2']: 112,

        ['job #1']: 'job1',
        ['job #2']: 'job1',

        ['instance']: 'instance1',
      },
      {
        ['timestamp #1']: 1630000000,
        ['timestamp #2']: 1630000000,

        ['value #1']: 33,
        ['value #2']: 20,

        ['job #1']: 'job1',
        ['job #2']: 'job1',

        ['instance']: 'instance2',
      },
      {
        ['timestamp #1']: 1630000000,
        ['timestamp #2']: 1630000000,

        ['value #1']: 45,
        ['value #2']: 10,

        ['job #1']: 'job1',
        ['job #2']: 'job1',

        ['instance']: 'instance3',
      },
    ];

    const output = transformData(input, transforms);
    expect(output).toEqual(result);
  });

  test('output should return last entry value in case of multiple entries with same column value', () => {
    const input: Array<Record<string, unknown>> = [
      {
        timestamp: 1630000000,
        value: 55,
        job: 'job1',
        instance: 'instance1',
        devices: '/dva/1',
      },
      {
        timestamp: 1630000000,
        value: 80,
        job: 'job1',
        instance: 'instance1',
        devices: '/dva/2',
      },
      {
        timestamp: 1630000000,
        value: 166,
        job: 'job1',
        instance: 'instance1',
        devices: '/dva/3',
      },
    ];

    const joinTransform: Transform = {
      kind: 'JoinByColumnValue',
      spec: {
        columns: ['instance'],
      },
    };

    const result: Array<Record<string, unknown>> = [
      {
        timestamp: 1630000000,
        value: 166,
        job: 'job1',
        instance: 'instance1',
        devices: '/dva/3',
      },
    ];

    const output = transformData(input, [joinTransform]);
    expect(output).toEqual(result);
  });
});
