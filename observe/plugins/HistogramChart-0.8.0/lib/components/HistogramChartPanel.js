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
import { jsx as _jsx } from "react/jsx-runtime";
import { Box, Stack, Typography } from '@mui/material';
import merge from 'lodash/merge';
import { useMemo } from 'react';
import { useChartsTheme } from '@perses-dev/components';
import { DEFAULT_FORMAT, DEFAULT_THRESHOLDS } from '../histogram-chart-model';
import { HistogramChart } from './HistogramChart';
const HISTOGRAM_MIN_WIDTH = 90;
export function HistogramChartPanel(props) {
    const { spec: pluginSpec, contentDimensions, queryResults } = props;
    const { min, max } = pluginSpec;
    const chartsTheme = useChartsTheme();
    // ensures all default format properties set if undef
    const format = merge({}, DEFAULT_FORMAT, pluginSpec.format);
    const thresholds = merge({}, DEFAULT_THRESHOLDS, pluginSpec.thresholds);
    const histogramData = useMemo(()=>{
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
        return /*#__PURE__*/ _jsx(Stack, {
            justifyContent: "center",
            height: "100%",
            children: /*#__PURE__*/ _jsx(Typography, {
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
    return /*#__PURE__*/ _jsx(Stack, {
        direction: "row",
        justifyContent: "center",
        alignItems: "center",
        sx: {
            // so scrollbar only shows when necessary
            overflowX: histogramData.length > 1 ? 'scroll' : 'auto'
        },
        children: histogramData.map((series, seriesIndex)=>{
            return /*#__PURE__*/ _jsx(Box, {
                children: /*#__PURE__*/ _jsx(HistogramChart, {
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

//# sourceMappingURL=HistogramChartPanel.js.map