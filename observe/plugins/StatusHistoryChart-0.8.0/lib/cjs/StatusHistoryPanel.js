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
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "StatusHistoryPanel", {
    enumerable: true,
    get: function() {
        return StatusHistoryPanel;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _components = require("@perses-dev/components");
const _pluginsystem = require("@perses-dev/plugin-system");
const _lodash = require("lodash");
const _react = require("react");
const _datatransform = require("./utils/data-transform");
const _StatusHistoryChartBase = require("./StatusHistoryChartBase");
function StatusHistoryPanel(props) {
    const { spec, contentDimensions, queryResults } = props;
    const legend = (0, _react.useMemo)(()=>{
        return spec.legend && (0, _pluginsystem.validateLegendSpec)(spec.legend) ? (0, _lodash.merge)({}, spec.legend) : undefined;
    }, [
        spec.legend
    ]);
    const chartsTheme = (0, _components.useChartsTheme)();
    const PADDING = chartsTheme.container.padding.default;
    const { statusHistoryData, yAxisCategories, xAxisCategories, legendItems, timeScale, colors } = (0, _datatransform.useStatusHistoryDataModel)(queryResults, chartsTheme.echartsTheme.color, spec);
    const adjustedContentDimensions = contentDimensions ? {
        width: contentDimensions.width - PADDING * 2,
        height: contentDimensions.height - PADDING * 2
    } : undefined;
    if (!statusHistoryData || statusHistoryData.length === 0) {
        return null;
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
        sx: {
            padding: `${PADDING}px`
        },
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.ContentWithLegend, {
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
                return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                    sx: {
                        height,
                        width
                    },
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_StatusHistoryChartBase.StatusHistoryChartBase, {
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
