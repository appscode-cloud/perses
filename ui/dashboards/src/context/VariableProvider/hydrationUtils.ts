

import { DEFAULT_ALL_VALUE, VariableValue, VariableDefinition } from '@perses-dev/core';
import { VariableStoreStateMap, VariableState } from '@perses-dev/plugin-system';
import { ExternalVariableDefinition } from '@perses-dev/dashboards';

// TODO: move to VariableProvider/utils.ts
function hydrateVariableState(variable: VariableDefinition, initialValue?: VariableValue): VariableState {
  const varState: VariableState = {
    value: null,
    loading: false,
    overriding: false,
    overridden: false,
  };
  switch (variable.kind) {
    case 'TextVariable':
      varState.value = initialValue ?? variable.spec.value;
      break;
    case 'ListVariable':
      varState.options = [];
      varState.value = initialValue ?? variable.spec.defaultValue ?? null;
      // TODO: smarter fallbacks for defaultValue when allowAllValue is true
      if (varState.options.length > 0 && !varState.value) {
        const firstOptionValue = varState.options[0]?.value ?? null;
        if (firstOptionValue !== null) {
          varState.value = variable.spec.allowMultiple ? [firstOptionValue] : firstOptionValue;
        }
      }

      // "all" variable handling assumes the value is not in an array. This is
      // handled properly during internal variable interactions, but it is possible
      // to end up in a buggy state if the variables are initialized with an "all"
      // value inside an array. When hydrating variables, normalize this to minimize
      // bugs.
      if (Array.isArray(varState.value) && varState.value.length === 1 && varState.value[0] === DEFAULT_ALL_VALUE) {
        varState.value = DEFAULT_ALL_VALUE;
      }

      break;
    default:
      break;
  }
  return varState;
}

/**
 * Build the local variable states according to the given definitions
 * @param localDefinitions local variable definitions. Dynamic part.
 * @param externalDefinitions external variables definitions. Static part.
 * @param initialValues values coming from query parameters
 */
export function hydrateVariableDefinitionStates(
  localDefinitions: VariableDefinition[],
  initialValues: Record<string, VariableValue>,
  externalDefinitions: ExternalVariableDefinition[] = []
): VariableStoreStateMap {
  const state: VariableStoreStateMap = new VariableStoreStateMap();

  // Collect the names used by local definitions
  let overridingNames: Record<string, boolean> = {};
  localDefinitions.forEach(
    (v) => {
      overridingNames[v.spec.name] = true;
    },
    {} as Record<string, boolean>
  );

  // Then populate the external variables state,
  // taking care of well flagging each name as used, so the overridden state can be filled accordingly.
  const overriddenNames: Record<string, boolean> = {};
  externalDefinitions.forEach(
    (externalDef) => {
      const source = externalDef.source;
      externalDef.definitions.forEach((v) => {
        const name = v.spec.name;
        const param = initialValues[name];
        const initialValue = param ? param : null;
        state.set(
          { source, name },
          {
            ...hydrateVariableState(v, initialValue),
            overridden: !!overridingNames[name],
          }
        );

        overridingNames[name] = true;
        overriddenNames[v.spec.name] = true;
      });
    },
    {} as Record<string, boolean>
  );

  // Then populate the local variables state,
  // taking care the overriding state is filled according to the names used in external variables.
  localDefinitions.forEach((v) => {
    const name = v.spec.name;
    const param = initialValues[name];
    const initialValue = param ? param : null;
    state.set(
      { name },
      {
        ...hydrateVariableState(v, initialValue),
        overriding: !!overriddenNames[name],
      }
    );
  });

  overridingNames = {};
  externalDefinitions
    .slice()
    .reverse()
    .forEach((externalDef) => {
      const source = externalDef.source;
      externalDef.definitions.forEach((v) => {
        const name = v.spec.name;
        const value = state.get({ source, name });
        if (value) {
          value.overriding = !!overridingNames[name];
        }
        overridingNames[name] = true;
      });
    });
  return state;
}
