

import { DurationString, parseDurationString, RelativeTimeRange } from '@perses-dev/core';
import { formatDuration } from 'date-fns';

export interface TimeOption {
  value: RelativeTimeRange;
  display: string;
}

export function buildRelativeTimeOption(duration: DurationString): TimeOption {
  return {
    value: { pastDuration: duration },
    display: `Last ${formatDuration(parseDurationString(duration), { delimiter: ', ' })}`,
  };
}
