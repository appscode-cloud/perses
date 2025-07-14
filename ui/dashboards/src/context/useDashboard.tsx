

import {
  createPanelRef,
  DashboardResource,
  EphemeralDashboardResource,
  GridDefinition,
  PanelGroupId,
} from '@perses-dev/core';
import { PanelGroupDefinition, useDashboardStore } from './DashboardProvider';
import { useVariableDefinitionActions, useVariableDefinitions } from './VariableProvider';

export function useDashboard(): {
  dashboard: DashboardResource | EphemeralDashboardResource;
  setDashboard: (dashboardResource: DashboardResource | EphemeralDashboardResource) => void;
} {
  const {
    panels,
    panelGroups,
    panelGroupOrder,
    setDashboard: setDashboardResource,
    kind,
    metadata,
    display,
    duration,
    refreshInterval,
    datasources,
    ttl,
  } = useDashboardStore(
    ({
      panels,
      panelGroups,
      panelGroupOrder,
      setDashboard,
      kind,
      metadata,
      display,
      duration,
      refreshInterval,
      datasources,
      ttl,
    }) => ({
      panels,
      panelGroups,
      panelGroupOrder,
      setDashboard,
      kind,
      metadata,
      display,
      duration,
      refreshInterval,
      datasources,
      ttl,
    })
  );
  const { setVariableDefinitions } = useVariableDefinitionActions();
  const variables = useVariableDefinitions();
  const layouts = convertPanelGroupsToLayouts(panelGroups, panelGroupOrder);

  const dashboard =
    kind === 'Dashboard'
      ? ({
          kind,
          metadata,
          spec: {
            display,
            panels,
            layouts,
            variables,
            duration,
            refreshInterval,
            datasources,
          },
        } as DashboardResource)
      : ({
          kind,
          metadata,
          spec: {
            display,
            panels,
            layouts,
            variables,
            duration,
            refreshInterval,
            datasources,
            ttl,
          },
        } as EphemeralDashboardResource);

  const setDashboard = (dashboardResource: DashboardResource | EphemeralDashboardResource): void => {
    setVariableDefinitions(dashboardResource.spec.variables);
    setDashboardResource(dashboardResource);
  };

  return {
    dashboard,
    setDashboard,
  };
}

function convertPanelGroupsToLayouts(
  panelGroups: Record<number, PanelGroupDefinition>,
  panelGroupOrder: PanelGroupId[]
): GridDefinition[] {
  const layouts: GridDefinition[] = [];
  panelGroupOrder.map((groupOrderId) => {
    const group = panelGroups[groupOrderId];
    if (group === undefined) {
      throw new Error('panel group not found');
    }
    const { title, isCollapsed, itemLayouts, itemPanelKeys } = group;
    let display = undefined;
    if (title) {
      display = {
        title,
        collapse: {
          open: !isCollapsed,
        },
      };
    }
    const layout: GridDefinition = {
      kind: 'Grid',
      spec: {
        display,
        items: itemLayouts.map((layout) => {
          const panelKey = itemPanelKeys[layout.i];
          if (panelKey === undefined) {
            throw new Error(`Missing panel key of layout ${layout.i}`);
          }
          return {
            x: layout.x,
            y: layout.y,
            width: layout.w,
            height: layout.h,
            content: createPanelRef(panelKey),
          };
        }),
      },
    };
    layouts.push(layout);
  });

  return layouts;
}
