

import { VariableDefinition } from '@perses-dev/core';
import { ExternalVariableDefinition } from '@perses-dev/dashboards';
import { VariableStoreStateMap } from '@perses-dev/plugin-system';
import { checkSavedDefaultVariableStatus, mergeVariableDefinitions } from './utils';

describe('checkSavedDefaultVariableStatus', () => {
  it('should check whether saved variable definitions are out of date with current default values state', () => {
    const savedVariables: VariableDefinition[] = [
      {
        kind: 'ListVariable',
        spec: {
          name: 'interval',
          defaultValue: '1m',
          allowAllValue: false,
          allowMultiple: false,
          plugin: {
            kind: 'StaticListVariable',
            spec: {
              values: ['1m', '5m'],
            },
          },
        },
      },
      {
        kind: 'ListVariable',
        spec: {
          name: 'NewListVariable',
          display: {
            name: 'Test display label',
            hidden: false,
          },
          defaultValue: 'second list value',
          allowAllValue: true,
          allowMultiple: false,
          plugin: {
            kind: 'StaticListVariable',
            spec: {
              values: [
                {
                  label: 'test list value',
                  value: 'test list value',
                },
                {
                  label: 'second list value',
                  value: 'second list value',
                },
                {
                  label: 'another list value',
                  value: 'another list value',
                },
              ],
            },
          },
        },
      },
      {
        kind: 'TextVariable',
        spec: {
          name: 'NewTextVariable',
          display: {
            name: 'Text display',
            hidden: false,
          },
          constant: true,
          value: 'first text value',
        },
      },
    ];
    const variableState = new VariableStoreStateMap();
    variableState.set(
      { name: 'interval' },
      {
        value: '5m',
        loading: false,
        options: [
          {
            label: '1m',
            value: '1m',
          },
          {
            label: '5m',
            value: '5m',
          },
        ],
      }
    );
    variableState.set(
      { name: 'NewListVariable' },
      {
        value: 'last list value',
        loading: false,
        options: [
          {
            label: 'test list value',
            value: 'test list value',
          },
          {
            label: 'second list value',
            value: 'second list value',
          },
          {
            label: 'last list value',
            value: 'last list value',
          },
        ],
        defaultValue: 'test list value',
      }
    );
    variableState.set(
      { name: 'NewTextVariable' },
      {
        value: 'New text value',
        loading: false,
      }
    );
    const { isSavedVariableModified } = checkSavedDefaultVariableStatus(savedVariables, variableState);
    expect(isSavedVariableModified).toBe(true);
  });

  it('should confirm list variable default value was not modified', () => {
    const savedVariables: VariableDefinition[] = [
      {
        kind: 'ListVariable',
        spec: {
          name: 'interval',
          defaultValue: '5m',
          allowAllValue: false,
          allowMultiple: false,
          plugin: {
            kind: 'StaticListVariable',
            spec: {
              values: ['1m', '5m'],
            },
          },
        },
      },
    ];
    const variableState = new VariableStoreStateMap();
    variableState.set(
      { name: 'interval' },
      {
        value: '5m',
        defaultValue: '5m',
        loading: false,
        options: [
          {
            label: '1m',
            value: '1m',
          },
          {
            label: '5m',
            value: '5m',
          },
        ],
      }
    );
    const { isSavedVariableModified } = checkSavedDefaultVariableStatus(savedVariables, variableState);
    expect(isSavedVariableModified).toBe(false);
  });

  it('should confirm null list variable was not modified', () => {
    const savedVariables: VariableDefinition[] = [
      {
        kind: 'ListVariable',
        spec: {
          allowAllValue: false,
          allowMultiple: false,
          plugin: {
            kind: 'StaticListVariable',
            spec: {
              values: [],
            },
          },
          name: 'EmptyListVariableTest',
        },
      },
    ];
    const variableState = new VariableStoreStateMap();
    variableState.set(
      { name: 'EmptyListVariableTest' },
      {
        value: null,
        loading: false,
        options: [],
      }
    );
    const { isSavedVariableModified } = checkSavedDefaultVariableStatus(savedVariables, variableState);
    expect(isSavedVariableModified).toBe(false);
  });

  it('should confirm text variable value was not modified', () => {
    const savedVariables: VariableDefinition[] = [
      {
        kind: 'TextVariable',
        spec: {
          name: 'NewTextVariable',
          display: {
            name: 'Text display',
            hidden: false,
          },
          constant: true,
          value: 'first text value',
        },
      },
    ];
    const variableState = new VariableStoreStateMap();
    variableState.set(
      { name: 'NewTextVariable' },
      {
        value: 'first text value',
        loading: false,
      }
    );
    const { isSavedVariableModified } = checkSavedDefaultVariableStatus(savedVariables, variableState);
    expect(isSavedVariableModified).toBe(false);
  });

  it('should confirm text variable value was modified', () => {
    const savedVariables: VariableDefinition[] = [
      {
        kind: 'TextVariable',
        spec: {
          name: 'NewTextVariable',
          value: 'Lorem ipsum',
        },
      },
    ];
    const variableState = new VariableStoreStateMap();
    variableState.set(
      { name: 'NewTextVariable' },
      {
        value: 'updated text value',
        loading: false,
      }
    );
    const { isSavedVariableModified } = checkSavedDefaultVariableStatus(savedVariables, variableState);
    expect(isSavedVariableModified).toBe(true);
  });

  it('should merge variable definitions giving priority on local over externals', () => {
    const localVariables: VariableDefinition[] = [
      {
        kind: 'TextVariable',
        spec: {
          name: 'NewTextVariable',
          value: 'Lorem ipsum',
        },
      },
    ];
    const externalVariables: ExternalVariableDefinition[] = [
      {
        source: 'project',
        definitions: [
          {
            kind: 'TextVariable',
            spec: {
              name: 'project_greetings',
              display: {
                name: 'Greetings(project)',
              },
              constant: false,
              value: 'hello',
            },
          },
          {
            kind: 'TextVariable',
            spec: {
              name: 'overridden',
              value: 'project scope value',
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
              name: 'global_greetings',
              display: {
                name: 'Greetings(global)',
              },
              constant: true,
              value: 'hello',
            },
          },
          {
            kind: 'TextVariable',
            spec: {
              name: 'overridden',
              value: 'global scope value',
            },
          },
        ],
      },
    ];

    const expected = [
      {
        kind: 'TextVariable',
        spec: {
          name: 'NewTextVariable',
          value: 'Lorem ipsum',
        },
      },
      {
        kind: 'TextVariable',
        spec: {
          name: 'project_greetings',
          display: {
            name: 'Greetings(project)',
          },
          constant: false,
          value: 'hello',
        },
      },
      {
        kind: 'TextVariable',
        spec: {
          name: 'overridden',
          value: 'project scope value',
        },
      },
      {
        kind: 'TextVariable',
        spec: {
          name: 'global_greetings',
          display: {
            name: 'Greetings(global)',
          },
          constant: true,
          value: 'hello',
        },
      },
    ];
    expect(mergeVariableDefinitions(localVariables, externalVariables)).toEqual(expected);
  });
});
