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
Object.defineProperty(exports, "StatChartPanel", {
    enumerable: true,
    get: function() {
        return StatChartPanel;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _components = require("@perses-dev/components");
const _material = require("@mui/material");
const _react = require("react");
const _core = require("@perses-dev/core");
const _datatransform = require("./utils/data-transform");
const _calculatevalue = require("./utils/calculate-value");
const _getcolor = require("./utils/get-color");
const _StatChartBase = require("./StatChartBase");
const MIN_WIDTH = 100;
const SPACING = 2;
const StatChartPanel = (props)=>{
    const { spec, contentDimensions, queryResults } = props;
    const { format, sparkline, valueFontSize: valueFontSize } = spec;
    const chartsTheme = (0, _components.useChartsTheme)();
    const statChartData = useStatChartData(queryResults, spec, chartsTheme);
    const isMultiSeries = statChartData.length > 1;
    if (contentDimensions === undefined) return null;
    // Calculates chart width
    const spacing = SPACING * (statChartData.length - 1);
    let chartWidth = (contentDimensions.width - spacing) / statChartData.length;
    if (isMultiSeries && chartWidth < MIN_WIDTH) {
        chartWidth = MIN_WIDTH;
    }
    const noDataTextStyle = chartsTheme.noDataOption.title.textStyle;
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Stack, {
        height: contentDimensions.height,
        width: contentDimensions.width,
        spacing: `${SPACING}px`,
        direction: "row",
        justifyContent: isMultiSeries ? 'left' : 'center',
        alignItems: "center",
        sx: {
            overflowX: isMultiSeries ? 'scroll' : 'auto'
        },
        children: statChartData.length ? statChartData.map((series, index)=>{
            const sparklineConfig = (0, _datatransform.convertSparkline)(chartsTheme, series.color, sparkline);
            return /*#__PURE__*/ (0, _jsxruntime.jsx)(_StatChartBase.StatChartBase, {
                width: chartWidth,
                height: contentDimensions.height,
                data: series,
                format: format,
                sparkline: sparklineConfig,
                showSeriesName: isMultiSeries,
                valueFontSize: valueFontSize
            }, index);
        }) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
            sx: {
                ...noDataTextStyle
            },
            children: "No data"
        })
    });
};
const useStatChartData = (queryResults, spec, chartsTheme)=>{
    return (0, _react.useMemo)(()=>{
        const { calculation, mappings, metricLabel } = spec;
        const statChartData = [];
        for (const result of queryResults){
            for (const seriesData of result.data.series){
                const calculatedValue = (0, _calculatevalue.calculateValue)(calculation, seriesData);
                // get label metric value
                const labelValue = getLabelValue(metricLabel, seriesData.labels);
                // get actual value to display
                const displayValue = getValueOrLabel(calculatedValue, mappings, labelValue);
                const color = (0, _getcolor.getStatChartColor)(chartsTheme, spec, calculatedValue);
                const series = {
                    name: seriesData.formattedName ?? '',
                    values: seriesData.values
                };
                statChartData.push({
                    calculatedValue: displayValue,
                    seriesData: series,
                    color
                });
            }
        }
        return statChartData;
    }, [
        queryResults,
        spec,
        chartsTheme
    ]);
};
const getValueOrLabel = (value, mappings, label)=>{
    if (label) {
        return label;
    }
    if (mappings?.length && value !== undefined && value !== null) {
        return (0, _core.applyValueMapping)(value, mappings).value;
    } else {
        return value;
    }
};
const getLabelValue = (fieldLabel, labels)=>{
    if (!labels || !fieldLabel) {
        return undefined;
    }
    for (const [key, value] of Object.entries(labels)){
        const regex = (0, _core.createRegexFromString)(fieldLabel);
        if (regex.test(key)) {
            return value;
        }
    }
    return undefined;
};
