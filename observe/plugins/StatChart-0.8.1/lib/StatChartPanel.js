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
import { jsx as _jsx } from "react/jsx-runtime";
import { useChartsTheme } from '@perses-dev/components';
import { Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { applyValueMapping, createRegexFromString } from '@perses-dev/core';
import { convertSparkline } from './utils/data-transform';
import { calculateValue } from './utils/calculate-value';
import { getStatChartColor } from './utils/get-color';
import { StatChartBase } from './StatChartBase';
const MIN_WIDTH = 100;
const SPACING = 2;
export const StatChartPanel = (props)=>{
    const { spec, contentDimensions, queryResults } = props;
    const { format, sparkline, valueFontSize: valueFontSize } = spec;
    const chartsTheme = useChartsTheme();
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
    return /*#__PURE__*/ _jsx(Stack, {
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
            const sparklineConfig = convertSparkline(chartsTheme, series.color, sparkline);
            return /*#__PURE__*/ _jsx(StatChartBase, {
                width: chartWidth,
                height: contentDimensions.height,
                data: series,
                format: format,
                sparkline: sparklineConfig,
                showSeriesName: isMultiSeries,
                valueFontSize: valueFontSize
            }, index);
        }) : /*#__PURE__*/ _jsx(Typography, {
            sx: {
                ...noDataTextStyle
            },
            children: "No data"
        })
    });
};
const useStatChartData = (queryResults, spec, chartsTheme)=>{
    return useMemo(()=>{
        const { calculation, mappings, metricLabel } = spec;
        const statChartData = [];
        for (const result of queryResults){
            for (const seriesData of result.data.series){
                const calculatedValue = calculateValue(calculation, seriesData);
                // get label metric value
                const labelValue = getLabelValue(metricLabel, seriesData.labels);
                // get actual value to display
                const displayValue = getValueOrLabel(calculatedValue, mappings, labelValue);
                const color = getStatChartColor(chartsTheme, spec, calculatedValue);
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
        return applyValueMapping(value, mappings).value;
    } else {
        return value;
    }
};
const getLabelValue = (fieldLabel, labels)=>{
    if (!labels || !fieldLabel) {
        return undefined;
    }
    for (const [key, value] of Object.entries(labels)){
        const regex = createRegexFromString(fieldLabel);
        if (regex.test(key)) {
            return value;
        }
    }
    return undefined;
};

//# sourceMappingURL=StatChartPanel.js.map