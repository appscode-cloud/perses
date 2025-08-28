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
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    GaugeChartLoading: function() {
        return GaugeChartLoading;
    },
    GaugeChartPanel: function() {
        return GaugeChartPanel;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _components = require("@perses-dev/components");
const _core = require("@perses-dev/core");
const _merge = /*#__PURE__*/ _interop_require_default(require("lodash/merge"));
const _react = require("react");
const _gaugechartmodel = require("./gauge-chart-model");
const _thresholds = require("./thresholds");
const _GaugeChartBase = require("./GaugeChartBase");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const EMPTY_GAUGE_SERIES = {
    label: '',
    value: undefined
};
const GAUGE_MIN_WIDTH = 90;
const PANEL_PADDING_OFFSET = 20;
function GaugeChartPanel(props) {
    const { spec: pluginSpec, contentDimensions, queryResults } = props;
    const { calculation, max } = pluginSpec;
    const { thresholds: thresholdsColors } = (0, _components.useChartsTheme)();
    // ensures all default format properties set if undef
    const format = (0, _merge.default)({}, _gaugechartmodel.DEFAULT_FORMAT, pluginSpec.format);
    const thresholds = pluginSpec.thresholds ?? _thresholds.defaultThresholdInput;
    const gaugeData = (0, _react.useMemo)(()=>{
        if (queryResults[0]?.data === undefined) {
            return [];
        }
        if (_core.CalculationsMap[calculation] === undefined) {
            console.warn(`Invalid GaugeChart panel calculation ${calculation}, fallback to ${_core.DEFAULT_CALCULATION}`);
        }
        const calculate = _core.CalculationsMap[calculation] ?? _core.CalculationsMap[_core.DEFAULT_CALCULATION];
        const seriesData = [];
        for (const timeSeries of queryResults[0].data.series){
            const series = {
                value: calculate(timeSeries.values),
                label: timeSeries.formattedName ?? ''
            };
            seriesData.push(series);
        }
        return seriesData;
    }, [
        queryResults,
        calculation
    ]);
    if (contentDimensions === undefined) return null;
    // needed for end value of last threshold color segment
    let thresholdMax = max;
    if (thresholdMax === undefined) {
        if (format.unit === 'percent') {
            thresholdMax = _gaugechartmodel.DEFAULT_MAX_PERCENT;
        } else {
            thresholdMax = _gaugechartmodel.DEFAULT_MAX_PERCENT_DECIMAL;
        }
    }
    const axisLineColors = (0, _thresholds.convertThresholds)(thresholds, format, thresholdMax, thresholdsColors);
    const axisLine = {
        show: true,
        lineStyle: {
            width: 5,
            color: axisLineColors
        }
    };
    // no data message handled inside chart component
    if (gaugeData.length === 0) {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_GaugeChartBase.GaugeChartBase, {
            width: contentDimensions.width,
            height: contentDimensions.height,
            data: EMPTY_GAUGE_SERIES,
            format: format,
            axisLine: axisLine,
            max: thresholdMax
        });
    }
    // accounts for showing a separate chart for each time series
    let chartWidth = contentDimensions.width / gaugeData.length - PANEL_PADDING_OFFSET;
    if (chartWidth < GAUGE_MIN_WIDTH && gaugeData.length > 1) {
        // enables horizontal scroll when charts overflow outside of panel
        chartWidth = GAUGE_MIN_WIDTH;
    }
    const hasMultipleCharts = gaugeData.length > 1;
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Stack, {
        direction: "row",
        spacing: hasMultipleCharts ? 2 : 0,
        justifyContent: hasMultipleCharts ? 'left' : 'center',
        alignItems: "center",
        sx: {
            // so scrollbar only shows when necessary
            overflowX: gaugeData.length > 1 ? 'scroll' : 'auto'
        },
        children: gaugeData.map((series, seriesIndex)=>{
            return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_GaugeChartBase.GaugeChartBase, {
                    width: chartWidth,
                    height: contentDimensions.height,
                    data: series,
                    format: format,
                    axisLine: axisLine,
                    max: thresholdMax
                })
            }, `gauge-series-${seriesIndex}`);
        })
    });
}
function GaugeChartLoading({ contentDimensions }) {
    if (contentDimensions === undefined) return null;
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Skeleton, {
        sx: {
            margin: '0 auto'
        },
        variant: "circular",
        width: contentDimensions.width > contentDimensions.height ? contentDimensions.height : contentDimensions.width,
        height: contentDimensions.height
    });
}
