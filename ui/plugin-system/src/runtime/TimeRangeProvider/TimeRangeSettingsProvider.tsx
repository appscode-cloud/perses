

import { createContext, ReactElement, ReactNode, useContext, useMemo } from 'react';
import { buildRelativeTimeOption, TimeOption } from '@perses-dev/components';
import { DurationString } from '@perses-dev/core';

const DEFAULT_OPTIONS: DurationString[] = ['5m', '15m', '30m', '1h', '6h', '12h', '24h', '7d', '14d'];
const defaultTimeRangeSettings: TimeRangeSettings = {
  showCustom: true,
  showZoomButtons: true,
  options: DEFAULT_OPTIONS.map((duration) => buildRelativeTimeOption(duration)),
};

export interface TimeRangeSettingsProviderProps {
  showCustom?: boolean;
  showZoomButtons?: boolean;
  options?: TimeOption[];
  children: ReactNode;
}

export interface TimeRangeSettings {
  showCustom: boolean;
  showZoomButtons: boolean;
  options: TimeOption[];
}

export const TimeRangeSettingsContext = createContext<TimeRangeSettings>(defaultTimeRangeSettings);

export function useTimeRangeSettingsContext(): TimeRangeSettings {
  const ctx = useContext(TimeRangeSettingsContext);
  if (ctx === undefined) {
    throw new Error('No TimeRangeContext found. Did you forget a Provider?');
  }
  return ctx;
}

/**
 * Get and set the current resolved time range at runtime.
 */
export function useTimeRangeSettings(): TimeRangeSettings {
  return useTimeRangeSettingsContext();
}

/**
 * Get the current value of the showCustom setting.
 * @param override If set, the value of the provider will be overridden by this value.
 */
export function useShowCustomTimeRangeSetting(override?: boolean): boolean {
  const showCustomTimeRange = useTimeRangeSettings().showCustom;
  if (override !== undefined) {
    return override;
  }
  return showCustomTimeRange;
}

/**
 * Get the current value of the showZoomButtons setting.
 * @param override If set, the value of the provider will be overridden by this value.
 */
export function useShowZoomRangeSetting(override?: boolean): boolean {
  const showZoomTimeRange = useTimeRangeSettings().showZoomButtons;
  if (override !== undefined) {
    return override;
  }
  return showZoomTimeRange;
}

/**
 * Get the current value of the options setting.
 * @param override If set, the value of the provider will be overridden by this value.
 */
export function useTimeRangeOptionsSetting(override?: TimeOption[]): TimeOption[] {
  const showCustomTimeRange = useTimeRangeSettings().options;
  if (override !== undefined) {
    return override;
  }
  return showCustomTimeRange;
}

/**
 * Provider implementation that supplies the time range state at runtime.
 */
export function TimeRangeSettingsProvider(props: TimeRangeSettingsProviderProps): ReactElement {
  const ctx = useMemo(() => {
    return {
      showCustom: props.showCustom === undefined ? defaultTimeRangeSettings.showCustom : props.showCustom,
      showZoomButtons:
        props.showZoomButtons === undefined ? defaultTimeRangeSettings.showZoomButtons : props.showZoomButtons,
      options: props.options === undefined ? defaultTimeRangeSettings.options : props.options,
    };
  }, [props.showCustom, props.showZoomButtons, props.options]);

  return <TimeRangeSettingsContext.Provider value={ctx}>{props.children}</TimeRangeSettingsContext.Provider>;
}
