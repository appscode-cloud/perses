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
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "HistogramChartPanel", {
    enumerable: true,
    get: function() {
        return HistogramChartPanel;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _merge = /*#__PURE__*/ _interop_require_default(require("lodash/merge"));
const _react = require("react");
const _components = require("@perses-dev/components");
const _histogramchartmodel = require("../histogram-chart-model");
const _HistogramChart = require("./HistogramChart");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const HISTOGRAM_MIN_WIDTH = 90;
function HistogramChartPanel(props) {
    const { spec: pluginSpec, contentDimensions, queryResults } = props;
    const { min, max } = pluginSpec;
    const chartsTheme = (0, _components.useChartsTheme)();
    // ensures all default format properties set if undef
    const format = (0, _merge.default)({}, _histogramchartmodel.DEFAULT_FORMAT, pluginSpec.format);
    const thresholds = (0, _merge.default)({}, _histogramchartmodel.DEFAULT_THRESHOLDS, pluginSpec.thresholds);
    const histogramData = (0, _react.useMemo)(()=>{
        const histograms = [];
        for (const result of queryResults){
            for (const timeSeries of result.data.series){
                if (!timeSeries.histograms || timeSeries.histograms.length === 0) {
                    continue;
                }
                const [, histoBuckets] = timeSeries.histograms[0];
                if (histoBuckets && histoBuckets.buckets) {
                    histograms.push({
                        buckets: histoBuckets.buckets
                    });
                }
            }
        }
        return histograms;
    }, [
        queryResults
    ]);
    // no data message handled inside chart component
    if (histogramData.length === 0) {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Stack, {
            justifyContent: "center",
            height: "100%",
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                variant: "body2",
                textAlign: "center",
                children: "No data available (only native histograms are supported for now)"
            })
        });
    }
    if (contentDimensions === undefined) return null;
    // accounts for showing a separate chart for each time series
    let chartWidth = contentDimensions.width / histogramData.length - chartsTheme.container.padding.default;
    if (chartWidth < HISTOGRAM_MIN_WIDTH && histogramData.length > 1) {
        // enables horizontal scroll when charts overflow outside of panel
        chartWidth = HISTOGRAM_MIN_WIDTH;
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Stack, {
        direction: "row",
        justifyContent: "center",
        alignItems: "center",
        sx: {
            // so scrollbar only shows when necessary
            overflowX: histogramData.length > 1 ? 'scroll' : 'auto'
        },
        children: histogramData.map((series, seriesIndex)=>{
            return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_HistogramChart.HistogramChart, {
                    width: chartWidth,
                    height: contentDimensions.height,
                    data: series,
                    format: format,
                    min: min,
                    max: max,
                    thresholds: thresholds
                })
            }, `histogram-series-${seriesIndex}`);
        })
    });
}
