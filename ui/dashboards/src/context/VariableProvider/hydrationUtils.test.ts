

import { DEFAULT_ALL_VALUE, VariableDefinition } from '@perses-dev/core';
import { ExternalVariableDefinition } from '@perses-dev/dashboards';
import { hydrateVariableDefinitionStates } from './hydrationUtils';

describe('hydrateVariableStates', () => {
  test('normalizes single "all" value in an array', () => {
    const definitions: VariableDefinition[] = [
      {
        kind: 'ListVariable',
        spec: {
          name: 'instance',
          display: {
            name: 'Instance',
            hidden: false,
          },
          allowAllValue: true,
          allowMultiple: true,
          defaultValue: ['$__all'],
          plugin: {
            kind: 'PrometheusLabelValuesVariable',
            spec: {
              labelName: 'instance',
            },
          },
        },
      },
    ];
    const result = hydrateVariableDefinitionStates(definitions, {});
    expect(result?.get({ name: 'instance' })?.value).toEqual(DEFAULT_ALL_VALUE);
  });
  test('external definitions overridden and overriding', () => {
    const definitions: VariableDefinition[] = [
      {
        kind: 'TextVariable',
        spec: {
          name: 'project_var',
          value: 'something',
        },
      },
      {
        kind: 'TextVariable',
        spec: {
          name: 'greetings',
          value: 'something',
        },
      },
    ];

    const externalDefinitions: ExternalVariableDefinition[] = [
      {
        source: 'project',
        definitions: [
          {
            kind: 'TextVariable',
            spec: {
              name: 'greetings',
              display: {
                name: 'Greetings(project)',
              },
              value: 'hello',
            },
          },
          {
            kind: 'TextVariable',
            spec: {
              name: 'project_var',
              value: 'something',
            },
          },
        ],
      },
      {
        source: 'global',
        definitions: [
          {
            kind: 'TextVariable',
            spec: {
              name: 'greetings',
              display: {
                name: 'Greetings(global)',
              },
              value: 'hello',
            },
          },
          {
            kind: 'TextVariable',
            spec: {
              name: 'global_var',
              value: 'global scope value',
            },
          },
        ],
      },
    ];

    const localStateResult = hydrateVariableDefinitionStates(definitions, {}, externalDefinitions);

    // Verify hydration of local variable state
    expect(localStateResult.get({ name: 'project_var' })).toEqual({
      value: 'something',
      loading: false,
      overriding: true,
      overridden: false,
    });
    expect(localStateResult.get({ name: 'greetings' })).toEqual({
      value: 'something',
      loading: false,
      overriding: true,
      overridden: false,
    });

    // Verify hydration of external variable state
    expect(localStateResult.get({ source: 'project', name: 'greetings' })).toEqual({
      value: 'hello',
      loading: false,
      overriding: true,
      overridden: true,
    });
    expect(localStateResult.get({ source: 'project', name: 'project_var' })).toEqual({
      value: 'something',
      loading: false,
      overriding: false,
      overridden: true,
    });
    expect(localStateResult.get({ source: 'global', name: 'greetings' })).toEqual({
      value: 'hello',
      loading: false,
      overriding: false,
      overridden: true,
    });
    expect(localStateResult.get({ source: 'global', name: 'global_var' })).toEqual({
      value: 'global scope value',
      loading: false,
      overriding: false,
      overridden: false,
    });
  });
});
