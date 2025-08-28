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
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DataTable: function() {
        return DataTable;
    },
    bucketRangeString: function() {
        return bucketRangeString;
    },
    histogramTable: function() {
        return histogramTable;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _react = require("react");
const _material = require("@mui/material");
const _SeriesName = require("./SeriesName");
const _EmbeddedPanel = require("./EmbeddedPanel");
const MAX_FORMATABLE_SERIES = 1000;
const DataTable = ({ queryResults })=>{
    const series = (0, _react.useMemo)(()=>queryResults.flatMap((d)=>d.data).flatMap((d)=>d?.series || []), [
        queryResults
    ]);
    const rows = (0, _react.useMemo)(()=>buildRows(series, queryResults), [
        series,
        queryResults
    ]);
    if (!queryResults) {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
            children: "No data"
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
            series.length >= MAX_FORMATABLE_SERIES && /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Alert, {
                severity: "warning",
                children: [
                    "Showing more than ",
                    MAX_FORMATABLE_SERIES,
                    " series, turning off label formatting for performance reasons."
                ]
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Table, {
                className: "data-table",
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableBody, {
                    children: rows
                })
            })
        ]
    });
};
function buildRows(series, queryResults) {
    const isFormatted = series.length < MAX_FORMATABLE_SERIES; // only format series names if we have less than 1000 series for performance reasons
    return series.map((s, seriesIdx)=>{
        const displayTimeStamps = (s.values?.length ?? 0) > 1;
        const valuesAndTimes = s.values ? s.values.map((v, valIdx)=>{
            return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Typography, {
                children: [
                    v[1],
                    " ",
                    displayTimeStamps && /*#__PURE__*/ (0, _jsxruntime.jsxs)("span", {
                        children: [
                            "@",
                            v[0]
                        ]
                    })
                ]
            }, valIdx);
        }) : [];
        let histogramsAndTimes = null;
        if (s.histograms && s.histograms.length > 0) {
            // Query results contains multiple series, create a new query result with only the current series
            const seriesQueryResult = {
                ...queryResults[0],
                data: {
                    ...queryResults[0].data,
                    series: [
                        queryResults[0].data.series[seriesIdx]
                    ]
                }
            };
            histogramsAndTimes = s.histograms.map((h, hisIdx)=>{
                return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                    alignItems: "center",
                    children: [
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                            width: 400,
                            height: 200,
                            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_EmbeddedPanel.EmbeddedPanel, {
                                kind: "HistogramChart",
                                spec: {
                                    unit: 'decimal',
                                    width: 400,
                                    height: 200
                                },
                                queryResults: [
                                    seriesQueryResult
                                ]
                            })
                        }),
                        /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                            children: [
                                /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Typography, {
                                    children: [
                                        "Total count: ",
                                        h[1].count
                                    ]
                                }),
                                /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Typography, {
                                    children: [
                                        "Sum: ",
                                        h[1].sum
                                    ]
                                })
                            ]
                        }),
                        histogramTable(h[1])
                    ]
                }, -hisIdx);
            });
        }
        return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.TableRow, {
            style: {
                whiteSpace: 'pre'
            },
            children: [
                /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableCell, {
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_SeriesName.SeriesName, {
                        name: s.name,
                        formattedName: s.formattedName,
                        labels: s.labels,
                        isFormatted: isFormatted
                    })
                }),
                /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableCell, {
                    children: s.histograms ? histogramsAndTimes : valuesAndTimes
                })
            ]
        }, seriesIdx);
    });
}
const leftDelim = (br)=>br === 3 || br === 1 ? '[' : '(';
const rightDelim = (br)=>br === 3 || br === 0 ? ']' : ')';
const bucketRangeString = ([boundaryRule, leftBoundary, rightBoundary])=>{
    return `${leftDelim(boundaryRule)}${leftBoundary} -> ${rightBoundary}${rightDelim(boundaryRule)}`;
};
const histogramTable = (h)=>/*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Table, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableHead, {
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableRow, {
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableCell, {
                        style: {
                            textAlign: 'center'
                        },
                        colSpan: 2,
                        children: "Histogram Sample"
                    })
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.TableBody, {
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.TableRow, {
                        children: [
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableCell, {
                                children: "Range"
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableCell, {
                                children: "Count"
                            })
                        ]
                    }),
                    h.buckets?.map((b, i)=>/*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.TableRow, {
                            children: [
                                /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableCell, {
                                    children: bucketRangeString(b)
                                }),
                                /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableCell, {
                                    children: b[3]
                                })
                            ]
                        }, i))
                ]
            })
        ]
    });
