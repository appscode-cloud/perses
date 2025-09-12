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
import { Box } from '@mui/material';
import { ContentWithLegend, useChartsTheme } from '@perses-dev/components';
import { validateLegendSpec } from '@perses-dev/plugin-system';
import { merge } from 'lodash';
import { useMemo } from 'react';
import { useStatusHistoryDataModel } from './utils/data-transform';
import { StatusHistoryChartBase } from './StatusHistoryChartBase';
export function StatusHistoryPanel(props) {
    const { spec, contentDimensions, queryResults } = props;
    const legend = useMemo(()=>{
        return spec.legend && validateLegendSpec(spec.legend) ? merge({}, spec.legend) : undefined;
    }, [
        spec.legend
    ]);
    const chartsTheme = useChartsTheme();
    const PADDING = chartsTheme.container.padding.default;
    const { statusHistoryData, yAxisCategories, xAxisCategories, legendItems, timeScale, colors } = useStatusHistoryDataModel(queryResults, chartsTheme.echartsTheme.color, spec);
    const adjustedContentDimensions = contentDimensions ? {
        width: contentDimensions.width - PADDING * 2,
        height: contentDimensions.height - PADDING * 2
    } : undefined;
    if (!statusHistoryData || statusHistoryData.length === 0) {
        return null;
    }
    return /*#__PURE__*/ _jsx(Box, {
        sx: {
            padding: `${PADDING}px`
        },
        children: /*#__PURE__*/ _jsx(ContentWithLegend, {
            width: adjustedContentDimensions?.width ?? 400,
            height: adjustedContentDimensions?.height ?? 1000,
            legendSize: legend?.size,
            legendProps: legend && {
                options: legend,
                data: legendItems || [],
                selectedItems: 'ALL',
                onSelectedItemsChange: ()=>null
            },
            children: ({ height, width })=>{
                return /*#__PURE__*/ _jsx(Box, {
                    sx: {
                        height,
                        width
                    },
                    children: /*#__PURE__*/ _jsx(StatusHistoryChartBase, {
                        xAxisCategories: xAxisCategories,
                        yAxisCategories: yAxisCategories,
                        data: statusHistoryData,
                        timeScale: timeScale,
                        height: height,
                        colors: colors
                    })
                });
            }
        })
    });
}

//# sourceMappingURL=StatusHistoryPanel.js.map