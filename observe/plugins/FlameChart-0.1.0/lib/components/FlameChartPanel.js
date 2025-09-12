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
import { useChartsTheme } from '@perses-dev/components';
import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import { FlameChart } from './FlameChart';
import { Settings } from './Settings';
import { TableChart } from './TableChart';
import { SeriesChart } from './SeriesChart';
const LARGE_PANEL_TRESHOLD = 600;
const DEFAULT_SERIES_CHART_HEIGHT = 200;
export const FlameChartPanel = (props)=>{
    const { contentDimensions, queryResults, spec } = props;
    const isMobileSize = useMediaQuery(useTheme().breakpoints.down('sm'));
    // selectedId equals 0 => Flame Graph is not zoomed in
    // selectedId different from 0 => Flame Graph is zoomed in
    const [selectedId, setSelectedId] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    // This spec is used to manage settings temporarily
    const [liveSpec, setLiveSpec] = useState(spec);
    // keep liveSpec up to date
    useEffect(()=>{
        setLiveSpec(spec);
        setSelectedId(0);
        setSearchValue('');
    }, [
        spec
    ]);
    const chartsTheme = useChartsTheme();
    const flameChartData = queryResults[0];
    if (contentDimensions === undefined) return null;
    const noDataTextStyle = chartsTheme.noDataOption.title.textStyle;
    const onChangePalette = (newPalette)=>{
        setLiveSpec((prev)=>{
            return {
                ...prev,
                palette: newPalette
            };
        });
    };
    const onDisplayChange = (value)=>{
        let showTable = true;
        let showFlameGraph = true;
        if (value === 'table') {
            showFlameGraph = false;
        } else if (value === 'flame-graph') {
            showTable = false;
        }
        setLiveSpec((prev)=>{
            return {
                ...prev,
                showTable: showTable,
                showFlameGraph: showFlameGraph
            };
        });
    };
    const PADDING = liveSpec.showSeries && liveSpec.showSettings ? 32 : liveSpec.showSeries || liveSpec.showSettings ? 16 : 0;
    const SETTINGS_HEIGHT = liveSpec.showSettings ? 30 : 0;
    const SERIES_CHART_HEIGHT = liveSpec.showSeries ? contentDimensions.height < DEFAULT_SERIES_CHART_HEIGHT ? contentDimensions.height : DEFAULT_SERIES_CHART_HEIGHT : 0;
    const TABLE_FLAME_CHART_HEIGHT = contentDimensions.height - (contentDimensions.height > LARGE_PANEL_TRESHOLD ? SERIES_CHART_HEIGHT + SETTINGS_HEIGHT + PADDING : 0);
    const TABLE_CHART_WIDTH = isMobileSize ? contentDimensions.width : liveSpec.showFlameGraph ? 0.4 * contentDimensions.width : contentDimensions.width;
    const FLAME_CHART_WIDTH = isMobileSize ? contentDimensions.width : liveSpec.showTable ? 0.6 * contentDimensions.width : contentDimensions.width;
    return /*#__PURE__*/ _jsx(Stack, {
        height: contentDimensions.height,
        width: contentDimensions.width,
        justifyContent: "center",
        alignItems: "center",
        children: queryResults.length > 1 ? // display a message if there is more than one query
        /*#__PURE__*/ _jsx(Typography, {
            sx: {
                ...noDataTextStyle
            },
            children: "There is more than one query. Please make sure that you provided only one query."
        }) : flameChartData ? /*#__PURE__*/ _jsxs(Stack, {
            gap: 2,
            sx: {
                overflowY: 'auto',
                scrollbarGutter: 'stable both-edges',
                paddingTop: liveSpec.showSeries ? 0 : 1
            },
            children: [
                liveSpec.showSeries && /*#__PURE__*/ _jsx(SeriesChart, {
                    width: contentDimensions.width,
                    height: SERIES_CHART_HEIGHT,
                    data: flameChartData.data
                }),
                liveSpec.showSettings && /*#__PURE__*/ _jsx(Settings, {
                    onSelectedIdChange: setSelectedId,
                    onChangePalette: onChangePalette,
                    onDisplayChange: onDisplayChange,
                    value: liveSpec,
                    selectedId: selectedId
                }),
                /*#__PURE__*/ _jsxs(Stack, {
                    direction: isMobileSize ? 'column' : 'row',
                    justifyContent: "center",
                    alignItems: isMobileSize ? 'center' : 'top',
                    children: [
                        liveSpec.showTable && /*#__PURE__*/ _jsx(TableChart, {
                            width: TABLE_CHART_WIDTH,
                            height: TABLE_FLAME_CHART_HEIGHT,
                            data: flameChartData.data,
                            searchValue: searchValue,
                            onSearchValueChange: setSearchValue,
                            onSelectedIdChange: setSelectedId
                        }),
                        liveSpec.showFlameGraph && /*#__PURE__*/ _jsx(FlameChart, {
                            width: FLAME_CHART_WIDTH,
                            height: TABLE_FLAME_CHART_HEIGHT,
                            data: flameChartData.data,
                            palette: liveSpec.palette,
                            selectedId: selectedId,
                            searchValue: searchValue,
                            onSelectedIdChange: setSelectedId
                        })
                    ]
                })
            ]
        }) : /*#__PURE__*/ _jsx(Typography, {
            sx: {
                ...noDataTextStyle
            },
            children: "No data"
        })
    });
};

//# sourceMappingURL=FlameChartPanel.js.map