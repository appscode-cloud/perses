// Copyright 2023 The Perses Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { DEFAULT_CALCULATION } from '@perses-dev/core';
export const DEFAULT_FORMAT = {
    unit: 'decimal',
    shortValues: true
};
export const DEFAULT_SORT = 'desc';
export const DEFAULT_MODE = 'value';
/**
 * Creates the initial/empty options for a BarChart panel.
 */ export function createInitialBarChartOptions() {
    return {
        calculation: DEFAULT_CALCULATION,
        format: DEFAULT_FORMAT,
        sort: DEFAULT_SORT,
        mode: DEFAULT_MODE
    };
}

//# sourceMappingURL=bar-chart-model.js.map