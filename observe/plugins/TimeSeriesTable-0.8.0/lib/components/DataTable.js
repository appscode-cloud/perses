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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo } from 'react';
import { Alert, Box, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { SeriesName } from './SeriesName';
import { EmbeddedPanel } from './EmbeddedPanel';
const MAX_FORMATABLE_SERIES = 1000;
/**
 * Designed to display timeseries data in a prometheus like table format.
 * The first column will contain the metric name and label combination, and the second column will contain the values.
 * This is inspired by prometheus DataTable.
 * https://github.com/prometheus/prometheus/blob/2524a915915d7eb1b1207152d2e0ce5771193404/web/ui/react-app/src/pages/graph/DataTable.tsx
 * @param result timeseries query result
 * @constructor
 */ export const DataTable = ({ queryResults })=>{
    const series = useMemo(()=>queryResults.flatMap((d)=>d.data).flatMap((d)=>d?.series || []), [
        queryResults
    ]);
    const rows = useMemo(()=>buildRows(series, queryResults), [
        series,
        queryResults
    ]);
    if (!queryResults) {
        return /*#__PURE__*/ _jsx(Typography, {
            children: "No data"
        });
    }
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            series.length >= MAX_FORMATABLE_SERIES && /*#__PURE__*/ _jsxs(Alert, {
                severity: "warning",
                children: [
                    "Showing more than ",
                    MAX_FORMATABLE_SERIES,
                    " series, turning off label formatting for performance reasons."
                ]
            }),
            /*#__PURE__*/ _jsx(Table, {
                className: "data-table",
                children: /*#__PURE__*/ _jsx(TableBody, {
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
            return /*#__PURE__*/ _jsxs(Typography, {
                children: [
                    v[1],
                    " ",
                    displayTimeStamps && /*#__PURE__*/ _jsxs("span", {
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
                return /*#__PURE__*/ _jsxs(Stack, {
                    alignItems: "center",
                    children: [
                        /*#__PURE__*/ _jsx(Box, {
                            width: 400,
                            height: 200,
                            children: /*#__PURE__*/ _jsx(EmbeddedPanel, {
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
                        /*#__PURE__*/ _jsxs(Stack, {
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                            children: [
                                /*#__PURE__*/ _jsxs(Typography, {
                                    children: [
                                        "Total count: ",
                                        h[1].count
                                    ]
                                }),
                                /*#__PURE__*/ _jsxs(Typography, {
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
        return /*#__PURE__*/ _jsxs(TableRow, {
            style: {
                whiteSpace: 'pre'
            },
            children: [
                /*#__PURE__*/ _jsx(TableCell, {
                    children: /*#__PURE__*/ _jsx(SeriesName, {
                        name: s.name,
                        formattedName: s.formattedName,
                        labels: s.labels,
                        isFormatted: isFormatted
                    })
                }),
                /*#__PURE__*/ _jsx(TableCell, {
                    children: s.histograms ? histogramsAndTimes : valuesAndTimes
                })
            ]
        }, seriesIdx);
    });
}
const leftDelim = (br)=>br === 3 || br === 1 ? '[' : '(';
const rightDelim = (br)=>br === 3 || br === 0 ? ']' : ')';
export const bucketRangeString = ([boundaryRule, leftBoundary, rightBoundary])=>{
    return `${leftDelim(boundaryRule)}${leftBoundary} -> ${rightBoundary}${rightDelim(boundaryRule)}`;
};
export const histogramTable = (h)=>/*#__PURE__*/ _jsxs(Table, {
        children: [
            /*#__PURE__*/ _jsx(TableHead, {
                children: /*#__PURE__*/ _jsx(TableRow, {
                    children: /*#__PURE__*/ _jsx(TableCell, {
                        style: {
                            textAlign: 'center'
                        },
                        colSpan: 2,
                        children: "Histogram Sample"
                    })
                })
            }),
            /*#__PURE__*/ _jsxs(TableBody, {
                children: [
                    /*#__PURE__*/ _jsxs(TableRow, {
                        children: [
                            /*#__PURE__*/ _jsx(TableCell, {
                                children: "Range"
                            }),
                            /*#__PURE__*/ _jsx(TableCell, {
                                children: "Count"
                            })
                        ]
                    }),
                    h.buckets?.map((b, i)=>/*#__PURE__*/ _jsxs(TableRow, {
                            children: [
                                /*#__PURE__*/ _jsx(TableCell, {
                                    children: bucketRangeString(b)
                                }),
                                /*#__PURE__*/ _jsx(TableCell, {
                                    children: b[3]
                                })
                            ]
                        }, i))
                ]
            })
        ]
    });

//# sourceMappingURL=DataTable.js.map