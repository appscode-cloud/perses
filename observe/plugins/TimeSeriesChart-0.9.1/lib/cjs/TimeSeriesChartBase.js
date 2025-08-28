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
Object.defineProperty(exports, "TimeSeriesChartBase", {
    enumerable: true,
    get: function() {
        return TimeSeriesChartBase;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _react = require("react");
const _material = require("@mui/material");
const _merge = /*#__PURE__*/ _interop_require_default(require("lodash/merge"));
const _isEqual = /*#__PURE__*/ _interop_require_default(require("lodash/isEqual"));
const _datefnstz = require("date-fns-tz");
const _core = require("@perses-dev/core");
const _core1 = require("echarts/core");
const _charts = require("echarts/charts");
const _components = require("echarts/components");
const _renderers = require("echarts/renderers");
const _components1 = require("@perses-dev/components");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
(0, _core1.use)([
    _charts.LineChart,
    _charts.BarChart,
    _components.GridComponent,
    _components.DatasetComponent,
    _components.DataZoomComponent,
    _components.MarkAreaComponent,
    _components.MarkLineComponent,
    _components.MarkPointComponent,
    _components.TitleComponent,
    _components.ToolboxComponent,
    _components.TooltipComponent,
    _renderers.CanvasRenderer
]);
const TimeSeriesChartBase = /*#__PURE__*/ (0, _react.forwardRef)(function TimeChart({ height, data, seriesMapping, timeScale: timeScaleProp, yAxis, format, grid, isStackedBar = false, tooltipConfig = _components1.DEFAULT_TOOLTIP_CONFIG, noDataVariant = 'message', syncGroup, onDataZoom, onDoubleClick, __experimentalEChartsOptionsOverride }, ref) {
    const { chartsTheme, enablePinning, enableSyncGrouping, lastTooltipPinnedCoords, setLastTooltipPinnedCoords } = (0, _components1.useChartsContext)();
    const isPinningEnabled = tooltipConfig.enablePinning && enablePinning;
    const chartRef = (0, _react.useRef)();
    const [showTooltip, setShowTooltip] = (0, _react.useState)(true);
    const [tooltipPinnedCoords, setTooltipPinnedCoords] = (0, _react.useState)(null);
    const [pinnedCrosshair, setPinnedCrosshair] = (0, _react.useState)(null);
    const [isDragging, setIsDragging] = (0, _react.useState)(false);
    const [startX, setStartX] = (0, _react.useState)(0);
    const { timeZone } = (0, _components1.useTimeZone)();
    let timeScale;
    if (timeScaleProp === undefined) {
        const commonTimeScale = (0, _core.getCommonTimeScale)(data);
        if (commonTimeScale === undefined) {
            // set default to past 5 years
            const today = new Date();
            const pastDate = new Date(today);
            pastDate.setFullYear(today.getFullYear() - 5);
            const todayMs = today.getTime();
            const pastDateMs = pastDate.getTime();
            timeScale = {
                startMs: pastDateMs,
                endMs: todayMs,
                stepMs: 1,
                rangeMs: todayMs - pastDateMs
            };
        } else {
            timeScale = commonTimeScale;
        }
    } else {
        timeScale = timeScaleProp;
    }
    (0, _react.useImperativeHandle)(ref, ()=>{
        return {
            highlightSeries ({ name }) {
                if (!chartRef.current) {
                    // when chart undef, do not highlight series when hovering over legend
                    return;
                }
                chartRef.current.dispatchAction({
                    type: 'highlight',
                    seriesId: name
                });
            },
            clearHighlightedSeries: ()=>{
                if (!chartRef.current) {
                    // when chart undef, do not clear highlight series
                    return;
                }
                (0, _components1.clearHighlightedSeries)(chartRef.current);
            }
        };
    }, []);
    const handleEvents = (0, _react.useMemo)(()=>{
        return {
            datazoom: (params)=>{
                if (onDataZoom === undefined) {
                    setTimeout(()=>{
                        // workaround so unpin happens after click event
                        setTooltipPinnedCoords(null);
                    }, 10);
                }
                if (onDataZoom === undefined || params.batch[0] === undefined) return;
                const xAxisStartValue = params.batch[0].startValue;
                const xAxisEndValue = params.batch[0].endValue;
                if (xAxisStartValue !== undefined && xAxisEndValue !== undefined) {
                    const zoomEvent = {
                        start: xAxisStartValue,
                        end: xAxisEndValue
                    };
                    onDataZoom(zoomEvent);
                }
            },
            finished: ()=>{
                if (chartRef.current !== undefined) {
                    (0, _components1.enableDataZoom)(chartRef.current);
                }
            }
        };
    }, [
        onDataZoom,
        setTooltipPinnedCoords
    ]);
    const { noDataOption } = chartsTheme;
    const option = (0, _react.useMemo)(()=>{
        // The "chart" `noDataVariant` is only used when the `timeSeries` is an
        // empty array because a `null` value will throw an error.
        if (data === null || data.length === 0 && noDataVariant === 'message') return noDataOption;
        // Utilizes ECharts dataset so raw data is separate from series option style properties
        // https://apache.github.io/echarts-handbook/en/concepts/dataset/
        const dataset = [];
        const isLocalTimeZone = timeZone === 'local';
        data.map((d, index)=>{
            const values = d.values.map(([timestamp, value])=>{
                const val = value === null ? '-' : value; // echarts use '-' to represent null data
                return [
                    isLocalTimeZone ? timestamp : (0, _datefnstz.toZonedTime)(timestamp, timeZone),
                    val
                ];
            });
            dataset.push({
                id: index,
                source: [
                    ...values
                ],
                dimensions: [
                    'time',
                    'value'
                ]
            });
        });
        const updatedSeriesMapping = enablePinning && pinnedCrosshair !== null ? [
            ...seriesMapping,
            pinnedCrosshair
        ] : seriesMapping;
        const option = {
            dataset: dataset,
            series: updatedSeriesMapping,
            xAxis: {
                type: 'time',
                min: isLocalTimeZone ? timeScale.startMs : (0, _datefnstz.toZonedTime)(timeScale.startMs, timeZone),
                max: isLocalTimeZone ? timeScale.endMs : (0, _datefnstz.toZonedTime)(timeScale.endMs, timeZone),
                axisLabel: {
                    hideOverlap: true,
                    formatter: (0, _components1.getFormattedAxisLabel)(timeScale.rangeMs ?? 0)
                },
                axisPointer: {
                    snap: false
                }
            },
            yAxis: (0, _components1.getFormattedAxis)(yAxis, format),
            animation: false,
            tooltip: {
                show: true,
                // ECharts tooltip content hidden by default since we use custom tooltip instead.
                // Stacked bar uses ECharts tooltip so subgroup data shows correctly.
                showContent: isStackedBar,
                trigger: isStackedBar ? 'item' : 'axis',
                appendToBody: isStackedBar
            },
            // https://echarts.apache.org/en/option.html#axisPointer
            axisPointer: {
                type: 'line',
                z: 0,
                triggerEmphasis: false,
                triggerTooltip: false,
                snap: false
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        icon: null,
                        yAxisIndex: 'none'
                    }
                }
            },
            grid
        };
        if (__experimentalEChartsOptionsOverride) {
            return __experimentalEChartsOptionsOverride(option);
        }
        return option;
    }, [
        data,
        seriesMapping,
        timeScale,
        yAxis,
        format,
        grid,
        noDataOption,
        __experimentalEChartsOptionsOverride,
        noDataVariant,
        timeZone,
        isStackedBar,
        enablePinning,
        pinnedCrosshair
    ]);
    // Update adjacent charts so tooltip is unpinned when current chart is clicked.
    (0, _react.useEffect)(()=>{
        // Only allow pinning one tooltip at a time, subsequent tooltip click unpins previous.
        // Multiple tooltips can only be pinned if Ctrl or Cmd key is pressed while clicking.
        const multipleTooltipsPinned = tooltipPinnedCoords !== null && lastTooltipPinnedCoords !== null;
        if (multipleTooltipsPinned) {
            if (!(0, _isEqual.default)(lastTooltipPinnedCoords, tooltipPinnedCoords)) {
                setTooltipPinnedCoords(null);
                if (tooltipPinnedCoords !== null && pinnedCrosshair !== null) {
                    setPinnedCrosshair(null);
                }
            }
        }
    // tooltipPinnedCoords CANNOT be in dep array or tooltip pinning breaks in the current chart's onClick
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        lastTooltipPinnedCoords,
        seriesMapping
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Box, {
        style: {
            height
        },
        // onContextMenu={(e) => {
        //   // TODO: confirm tooltip pinning works correctly on Windows, should e.preventDefault() be added here
        //   e.preventDefault(); // Prevent the default behaviour when right clicked
        // }}
        onClick: (e)=>{
            // Allows user to opt-in to multi tooltip pinning when Ctrl or Cmd key held down
            const isControlKeyPressed = e.ctrlKey || e.metaKey;
            if (isControlKeyPressed) {
                e.preventDefault();
            }
            // Determine where on chart canvas to plot pinned crosshair as markLine.
            const pointInGrid = (0, _components1.getPointInGrid)(e.nativeEvent.offsetX, e.nativeEvent.offsetY, chartRef.current);
            if (pointInGrid === null) {
                return;
            }
            // Pin and unpin when clicking on chart canvas but not tooltip text.
            if (isPinningEnabled && e.target instanceof HTMLCanvasElement) {
                // Pin tooltip and update shared charts context to remember these coordinates.
                const pinnedPos = {
                    page: {
                        x: e.pageX,
                        y: e.pageY
                    },
                    client: {
                        x: e.clientX,
                        y: e.clientY
                    },
                    plotCanvas: {
                        x: e.nativeEvent.offsetX,
                        y: e.nativeEvent.offsetY
                    },
                    target: e.target
                };
                setTooltipPinnedCoords((current)=>{
                    if (current === null) {
                        return pinnedPos;
                    } else {
                        setPinnedCrosshair(null);
                        return null;
                    }
                });
                setPinnedCrosshair((current)=>{
                    // Only add pinned crosshair line series when there is not one already in seriesMapping.
                    if (current === null) {
                        const cursorX = pointInGrid[0];
                        // Only need to loop through first dataset source since getCommonTimeScale ensures xAxis timestamps are consistent
                        const firstTimeSeriesValues = data[0]?.values;
                        const closestTimestamp = (0, _components1.getClosestTimestamp)(firstTimeSeriesValues, cursorX);
                        // Crosshair snaps to nearest timestamp since cursor may be slightly to left or right
                        const pinnedCrosshair = (0, _merge.default)({}, _components1.DEFAULT_PINNED_CROSSHAIR, {
                            markLine: {
                                data: [
                                    {
                                        xAxis: closestTimestamp
                                    }
                                ]
                            }
                        });
                        return pinnedCrosshair;
                    } else {
                        // Clear previously set pinned crosshair
                        return null;
                    }
                });
                if (!isControlKeyPressed) {
                    setLastTooltipPinnedCoords(pinnedPos);
                }
            }
        },
        onMouseDown: (e)=>{
            const { clientX } = e;
            setIsDragging(true);
            setStartX(clientX);
        },
        onMouseMove: (e)=>{
            // Allow clicking inside tooltip to copy labels.
            if (!(e.target instanceof HTMLCanvasElement)) {
                return;
            }
            const { clientX } = e;
            if (isDragging) {
                const deltaX = clientX - startX;
                if (deltaX > 0) {
                    // Hide tooltip when user drags to zoom.
                    setShowTooltip(false);
                }
            }
        },
        onMouseUp: ()=>{
            setIsDragging(false);
            setStartX(0);
            setShowTooltip(true);
        },
        onMouseLeave: ()=>{
            if (tooltipPinnedCoords === null) {
                setShowTooltip(false);
            }
            if (chartRef.current !== undefined) {
                (0, _components1.clearHighlightedSeries)(chartRef.current);
            }
        },
        onMouseEnter: ()=>{
            setShowTooltip(true);
            if (chartRef.current !== undefined) {
                (0, _components1.enableDataZoom)(chartRef.current);
            }
        },
        onDoubleClick: (e)=>{
            setTooltipPinnedCoords(null);
            // either dispatch ECharts restore action to return to orig state or allow consumer to define behavior
            if (onDoubleClick === undefined) {
                if (chartRef.current !== undefined) {
                    (0, _components1.restoreChart)(chartRef.current);
                }
            } else {
                onDoubleClick(e);
            }
        },
        children: [
            showTooltip === true && option.tooltip?.showContent === false && tooltipConfig.hidden !== true && /*#__PURE__*/ (0, _jsxruntime.jsx)(_components1.TimeChartTooltip, {
                containerId: chartsTheme.tooltipPortalContainerId,
                chartRef: chartRef,
                data: data,
                seriesMapping: seriesMapping,
                wrapLabels: tooltipConfig.wrapLabels,
                enablePinning: isPinningEnabled,
                pinnedPos: tooltipPinnedCoords,
                format: format,
                onUnpinClick: ()=>{
                    // Unpins tooltip when clicking Pin icon in TooltipHeader.
                    setTooltipPinnedCoords(null);
                    // Clear previously set pinned crosshair.
                    setPinnedCrosshair(null);
                }
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components1.EChart, {
                sx: {
                    width: '100%',
                    height: '100%'
                },
                option: option,
                theme: chartsTheme.echartsTheme,
                onEvents: handleEvents,
                _instance: chartRef,
                syncGroup: enableSyncGrouping ? syncGroup : undefined
            })
        ]
    });
});
