// Copyright 2024 The Perses Authors
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
import { jsx as _jsx } from "react/jsx-runtime";
import { NoDataOverlay, TextOverlay, useChartsTheme } from '@perses-dev/components';
import { Box } from '@mui/material';
import { TracingGanttChart } from './TracingGanttChart/TracingGanttChart';
export function TracingGanttChartPanel(props) {
    const { spec, queryResults, attributeLinks } = props;
    const chartsTheme = useChartsTheme();
    const contentPadding = chartsTheme.container.padding.default;
    if (queryResults.length > 1) {
        return /*#__PURE__*/ _jsx(TextOverlay, {
            message: "This panel does not support more than one query."
        });
    }
    const trace = queryResults[0]?.data.trace;
    if (!trace) {
        return /*#__PURE__*/ _jsx(NoDataOverlay, {
            resource: "trace"
        });
    }
    return /*#__PURE__*/ _jsx(Box, {
        sx: {
            height: '100%',
            padding: `${contentPadding}px`
        },
        children: /*#__PURE__*/ _jsx(TracingGanttChart, {
            options: spec,
            attributeLinks: attributeLinks,
            trace: trace
        })
    });
}

//# sourceMappingURL=TracingGanttChartPanel.js.map