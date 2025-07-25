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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { Box, Typography, styled } from '@mui/material';
import merge from 'lodash/merge';
import { use } from 'echarts/core';
import { LineChart as EChartsLineChart } from 'echarts/charts';
import { GridComponent, DatasetComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { EChart, useChartsTheme } from '@perses-dev/components';
import { useOptimalFontSize } from './utils/calculate-font-size';
import { formatStatChartValue } from './utils/format-stat-chart-value';
use([
    EChartsLineChart,
    GridComponent,
    DatasetComponent,
    TitleComponent,
    TooltipComponent,
    CanvasRenderer
]);
const LINE_HEIGHT = 1.2;
const SERIES_NAME_MAX_FONT_SIZE = 30;
const SERIES_NAME_FONT_WEIGHT = 400;
const VALUE_FONT_WEIGHT = 700;
export const StatChartBase = (props)=>{
    const { width, height, data, sparkline, showSeriesName, format, valueFontSize } = props;
    const chartsTheme = useChartsTheme();
    const color = data.color;
    const formattedValue = formatStatChartValue(data.calculatedValue, format);
    const containerPadding = chartsTheme.container.padding.default;
    // calculate series name font size and height
    let seriesNameFontSize = useOptimalFontSize({
        text: data?.seriesData?.name ?? '',
        fontWeight: SERIES_NAME_FONT_WEIGHT,
        width,
        height: height * 0.125,
        lineHeight: LINE_HEIGHT,
        maxSize: SERIES_NAME_MAX_FONT_SIZE
    });
    const seriesNameHeight = showSeriesName ? seriesNameFontSize * LINE_HEIGHT + containerPadding : 0;
    // calculate value font size and height
    const availableWidth = width - containerPadding * 2;
    const availableHeight = height - seriesNameHeight;
    const optimalValueFontSize = useOptimalFontSize({
        text: formattedValue,
        // override the font size if user selects it in the settings
        fontSizeOverride: valueFontSize,
        fontWeight: VALUE_FONT_WEIGHT,
        // without sparkline, use only 50% of the available width so it looks better for multiseries
        width: sparkline ? availableWidth : availableWidth * 0.5,
        // with sparkline, use only 25% of available height to leave room for chart
        // without sparkline, value should take up 90% of available space
        height: sparkline ? availableHeight * 0.25 : availableHeight * 0.9,
        lineHeight: LINE_HEIGHT
    });
    const valueFontHeight = optimalValueFontSize * LINE_HEIGHT;
    // make sure the series name font size is slightly smaller than value font size
    seriesNameFontSize = Math.min(optimalValueFontSize * 0.7, seriesNameFontSize);
    const option = useMemo(()=>{
        if (data.seriesData === undefined) return chartsTheme.noDataOption;
        const series = data.seriesData;
        const statSeries = [];
        if (sparkline !== undefined) {
            const lineSeries = {
                type: 'line',
                name: series.name,
                data: series.values,
                zlevel: 1,
                symbol: 'none',
                animation: false,
                silent: true
            };
            const mergedSeries = merge(lineSeries, sparkline);
            statSeries.push(mergedSeries);
        }
        const option = {
            title: {
                show: false
            },
            grid: {
                show: false,
                top: '35%',
                right: 0,
                bottom: 0,
                left: 0,
                containLabel: false
            },
            xAxis: {
                type: 'time',
                show: false,
                boundaryGap: false
            },
            yAxis: {
                type: 'value',
                show: false,
                min: (value)=>{
                    if (value.min >= 0 && value.min <= 1) {
                        // helps with percent-decimal units, or datasets that return 0 or 1 booleans
                        return 0;
                    }
                    return value.min;
                }
            },
            tooltip: {
                show: false
            },
            series: statSeries
        };
        return option;
    }, [
        data,
        chartsTheme,
        sparkline
    ]);
    const textAlignment = sparkline ? 'auto' : 'center';
    const textStyles = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: textAlignment,
        alignItems: textAlignment
    };
    return /*#__PURE__*/ _jsxs(Box, {
        sx: {
            height: '100%',
            width: '100%',
            ...textStyles
        },
        children: [
            showSeriesName && /*#__PURE__*/ _jsx(SeriesName, {
                padding: containerPadding,
                fontSize: seriesNameFontSize,
                children: data.seriesData?.name
            }),
            /*#__PURE__*/ _jsx(Value, {
                variant: "h3",
                color: color,
                fontSize: optimalValueFontSize,
                padding: containerPadding,
                children: formattedValue
            }),
            sparkline !== undefined && /*#__PURE__*/ _jsx(EChart, {
                sx: {
                    width: '100%'
                },
                style: {
                    // ECharts rounds the height to the nearest integer by default.
                    // This can cause unneccessary scrollbars when the total height of this chart exceeds the 'height' prop.
                    height: Math.floor(height - seriesNameHeight - valueFontHeight)
                },
                option: option,
                theme: chartsTheme.echartsTheme,
                renderer: "svg"
            })
        ]
    });
};
const SeriesName = styled(Typography, {
    shouldForwardProp: (prop)=>prop !== 'padding' && prop !== 'fontSize'
})(({ theme, padding, fontSize })=>({
        color: theme.palette.text.secondary,
        padding: `${padding}px`,
        fontSize: `${fontSize}px`,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    }));
const Value = styled(Typography, {
    shouldForwardProp: (prop)=>prop !== 'color' && prop !== 'padding' && prop !== 'fontSize' && prop !== 'sparkline'
})(({ theme, color, padding, fontSize, sparkline })=>({
        color: color ?? theme.palette.text.primary,
        fontSize: `${fontSize}px`,
        padding: sparkline ? `${padding}px ${padding}px 0 ${padding}px` : ` 0 ${padding}px`,
        whiteSpace: 'nowrap',
        lineHeight: LINE_HEIGHT
    }));

//# sourceMappingURL=StatChartBase.js.map