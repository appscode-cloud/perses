// Copyright 2025 The Perses Authors
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
export const DEFAULT_FORMAT = {
    unit: 'decimal'
};
export const DEFAULT_THRESHOLDS = {
    defaultColor: '#56b4e9'
};
export const DEFAULT_MIN_PERCENT = 0;
export const DEFAULT_MAX_PERCENT = 100;
export const DEFAULT_MIN_PERCENT_DECIMAL = 0;
export const DEFAULT_MAX_PERCENT_DECIMAL = 1;
/**
 * Creates the initial/empty options for a HistogramChart panel.
 */ export function createInitialHistogramChartOptions() {
    return {
        format: DEFAULT_FORMAT
    };
}

//# sourceMappingURL=histogram-chart-model.js.map