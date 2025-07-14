

import { createContext, useContext, useMemo } from 'react';
import { BuiltinVariableDefinition } from '@perses-dev/core';
import { VariableStateMap } from './variables';

export type BuiltinVariableSrv = {
  variables: BuiltinVariableDefinition[];
};

export const BuiltinVariableContext = createContext<BuiltinVariableSrv | undefined>(undefined);

export function useBuiltinVariableContext(): BuiltinVariableSrv {
  const ctx = useContext(BuiltinVariableContext);
  if (ctx === undefined) {
    throw new Error('No BuiltinVariableContext found. Did you forget a Provider?');
  }
  return ctx;
}

export function useBuiltinVariableValues(names?: string[]): VariableStateMap {
  const { variables } = useBuiltinVariableContext();
  const states = useMemo(() => {
    const values: VariableStateMap = {};
    for (const variable of variables) {
      values[variable.spec.name] = { loading: false, value: variable.spec.value() };
    }
    return values;
  }, [variables]);

  const values = useMemo(() => {
    const values: VariableStateMap = {};
    names?.forEach((name) => {
      const s = states[name];
      if (s) {
        values[name] = s;
      }
    });
    return values;
  }, [names, states]);

  if (names === undefined) {
    return states;
  }

  return values;
}

export function useBuiltinVariableDefinitions(): BuiltinVariableDefinition[] {
  const { variables } = useBuiltinVariableContext();
  return variables;
}
