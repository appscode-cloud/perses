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
Object.defineProperty(exports, "FlameChartPanel", {
    enumerable: true,
    get: function() {
        return FlameChartPanel;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _components = require("@perses-dev/components");
const _material = require("@mui/material");
const _react = require("react");
const _FlameChart = require("./FlameChart");
const _Settings = require("./Settings");
const _TableChart = require("./TableChart");
const _SeriesChart = require("./SeriesChart");
const LARGE_PANEL_TRESHOLD = 600;
const DEFAULT_SERIES_CHART_HEIGHT = 200;
const FlameChartPanel = (props)=>{
    const { contentDimensions, queryResults, spec } = props;
    const isMobileSize = (0, _material.useMediaQuery)((0, _material.useTheme)().breakpoints.down('sm'));
    // selectedId equals 0 => Flame Graph is not zoomed in
    // selectedId different from 0 => Flame Graph is zoomed in
    const [selectedId, setSelectedId] = (0, _react.useState)(0);
    const [searchValue, setSearchValue] = (0, _react.useState)('');
    // This spec is used to manage settings temporarily
    const [liveSpec, setLiveSpec] = (0, _react.useState)(spec);
    // keep liveSpec up to date
    (0, _react.useEffect)(()=>{
        setLiveSpec(spec);
        setSelectedId(0);
        setSearchValue('');
    }, [
        spec
    ]);
    const chartsTheme = (0, _components.useChartsTheme)();
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
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Stack, {
        height: contentDimensions.height,
        width: contentDimensions.width,
        justifyContent: "center",
        alignItems: "center",
        children: queryResults.length > 1 ? // display a message if there is more than one query
        /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
            sx: {
                ...noDataTextStyle
            },
            children: "There is more than one query. Please make sure that you provided only one query."
        }) : flameChartData ? /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
            gap: 2,
            sx: {
                overflowY: 'auto',
                scrollbarGutter: 'stable both-edges',
                paddingTop: liveSpec.showSeries ? 0 : 1
            },
            children: [
                liveSpec.showSeries && /*#__PURE__*/ (0, _jsxruntime.jsx)(_SeriesChart.SeriesChart, {
                    width: contentDimensions.width,
                    height: SERIES_CHART_HEIGHT,
                    data: flameChartData.data
                }),
                liveSpec.showSettings && /*#__PURE__*/ (0, _jsxruntime.jsx)(_Settings.Settings, {
                    onSelectedIdChange: setSelectedId,
                    onChangePalette: onChangePalette,
                    onDisplayChange: onDisplayChange,
                    value: liveSpec,
                    selectedId: selectedId
                }),
                /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                    direction: isMobileSize ? 'column' : 'row',
                    justifyContent: "center",
                    alignItems: isMobileSize ? 'center' : 'top',
                    children: [
                        liveSpec.showTable && /*#__PURE__*/ (0, _jsxruntime.jsx)(_TableChart.TableChart, {
                            width: TABLE_CHART_WIDTH,
                            height: TABLE_FLAME_CHART_HEIGHT,
                            data: flameChartData.data,
                            searchValue: searchValue,
                            onSearchValueChange: setSearchValue,
                            onSelectedIdChange: setSelectedId
                        }),
                        liveSpec.showFlameGraph && /*#__PURE__*/ (0, _jsxruntime.jsx)(_FlameChart.FlameChart, {
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
        }) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
            sx: {
                ...noDataTextStyle
            },
            children: "No data"
        })
    });
};
