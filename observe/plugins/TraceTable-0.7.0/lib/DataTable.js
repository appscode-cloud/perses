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
import { Avatar, Box, Chip, Link, Tooltip, Typography, useTheme } from '@mui/material';
import { formatDuration, msToPrometheusDuration } from '@perses-dev/core';
import { Link as RouterLink } from 'react-router-dom';
import InformationIcon from 'mdi-material-ui/Information';
import { useChartsTheme } from '@perses-dev/components';
import { DataGrid } from '@mui/x-data-grid';
import { useCallback, useMemo } from 'react';
import { getServiceColor } from './utils/utils';
const DATE_FORMATTER = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'long',
    timeStyle: 'medium'
}).format;
const UTC_DATE_FORMATTER = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'long',
    timeStyle: 'long',
    timeZone: 'UTC'
}).format;
export function DataTable(props) {
    const { options, result, traceLink } = props;
    const muiTheme = useTheme();
    const chartsTheme = useChartsTheme();
    const paletteMode = options.visual?.palette?.mode;
    const serviceColorGenerator = useCallback((serviceName)=>getServiceColor(muiTheme, chartsTheme, paletteMode, serviceName), [
        muiTheme,
        chartsTheme,
        paletteMode
    ]);
    const rows = [];
    for (const query of result){
        for (const trace of query.data?.searchResult || []){
            rows.push({
                ...trace,
                id: trace.traceId,
                traceLink: traceLink?.({
                    query: query.definition,
                    traceId: trace.traceId
                })
            });
        }
    }
    const columns = useMemo(()=>[
            {
                field: 'name',
                headerName: 'Trace name',
                type: 'string',
                flex: 4,
                display: 'flex',
                valueGetter: (_, trace)=>`${trace.rootServiceName}: ${trace.rootTraceName}`,
                renderCell: ({ row })=>/*#__PURE__*/ _jsxs(Box, {
                        sx: {
                            my: 1
                        },
                        children: [
                            /*#__PURE__*/ _jsx(TraceName, {
                                row: row
                            }),
                            /*#__PURE__*/ _jsx("br", {}),
                            Object.entries(row.serviceStats).map(([serviceName, stats])=>/*#__PURE__*/ _jsx(ServiceChip, {
                                    serviceName: serviceName,
                                    stats: stats,
                                    serviceColor: serviceColorGenerator(serviceName)
                                }, serviceName))
                        ]
                    })
            },
            {
                field: 'spanCount',
                headerName: 'Spans',
                type: 'number',
                headerAlign: 'left',
                align: 'left',
                flex: 2,
                minWidth: 145,
                display: 'flex',
                valueGetter: (_, trace)=>Object.values(trace.serviceStats).reduce((acc, val)=>acc + val.spanCount, 0),
                renderCell: ({ row })=>{
                    let totalSpanCount = 0;
                    let totalErrorCount = 0;
                    for (const stats of Object.values(row.serviceStats)){
                        totalSpanCount += stats.spanCount;
                        totalErrorCount += stats.errorCount ?? 0;
                    }
                    return /*#__PURE__*/ _jsxs(_Fragment, {
                        children: [
                            /*#__PURE__*/ _jsxs(Typography, {
                                display: "inline",
                                children: [
                                    totalSpanCount,
                                    " spans"
                                ]
                            }),
                            totalErrorCount > 0 && /*#__PURE__*/ _jsx(Chip, {
                                label: `${totalErrorCount} error${totalErrorCount === 1 ? '' : 's'}`,
                                sx: {
                                    marginLeft: '5px'
                                },
                                icon: /*#__PURE__*/ _jsx(InformationIcon, {}),
                                variant: "outlined",
                                size: "small",
                                color: "error"
                            })
                        ]
                    });
                }
            },
            {
                field: 'durationMs',
                headerName: 'Duration',
                type: 'number',
                headerAlign: 'left',
                align: 'left',
                flex: 1,
                minWidth: 70,
                display: 'flex',
                renderCell: ({ row })=>/*#__PURE__*/ _jsx(Typography, {
                        display: "inline",
                        children: row.durationMs < 1 ? '<1ms' : formatDuration(msToPrometheusDuration(row.durationMs))
                    })
            },
            {
                field: 'startTimeUnixMs',
                headerName: 'Start time',
                type: 'number',
                headerAlign: 'left',
                align: 'left',
                flex: 3,
                minWidth: 240,
                display: 'flex',
                renderCell: ({ row })=>/*#__PURE__*/ _jsx(Tooltip, {
                        title: UTC_DATE_FORMATTER(new Date(row.startTimeUnixMs)),
                        placement: "top",
                        arrow: true,
                        children: /*#__PURE__*/ _jsx(Typography, {
                            display: "inline",
                            children: DATE_FORMATTER(new Date(row.startTimeUnixMs))
                        }, `st-${row.traceId}`)
                    })
            }
        ], [
        serviceColorGenerator
    ]);
    return /*#__PURE__*/ _jsx(DataGrid, {
        sx: {
            borderWidth: 0
        },
        columns: columns,
        rows: rows,
        getRowHeight: ()=>'auto',
        getEstimatedRowHeight: ()=>66,
        disableRowSelectionOnClick: true,
        pageSizeOptions: [
            10,
            20,
            50,
            100
        ],
        initialState: {
            pagination: {
                paginationModel: {
                    pageSize: 20
                }
            }
        }
    });
}
function TraceName({ row: trace }) {
    if (trace.traceLink) {
        return /*#__PURE__*/ _jsxs(Link, {
            variant: "body1",
            color: "inherit",
            underline: "hover",
            component: RouterLink,
            to: trace.traceLink,
            children: [
                /*#__PURE__*/ _jsxs("strong", {
                    children: [
                        trace.rootServiceName,
                        ":"
                    ]
                }),
                " ",
                trace.rootTraceName
            ]
        });
    }
    return /*#__PURE__*/ _jsxs(Typography, {
        display: "inline",
        children: [
            /*#__PURE__*/ _jsxs("strong", {
                children: [
                    trace.rootServiceName,
                    ":"
                ]
            }),
            " ",
            trace.rootTraceName
        ]
    });
}
function ServiceChip({ serviceName, stats, serviceColor }) {
    return /*#__PURE__*/ _jsx(Chip, {
        label: serviceName,
        variant: "outlined",
        size: "small",
        style: {
            ['--service-color']: serviceColor
        },
        sx: {
            marginTop: '5px',
            marginRight: '5px',
            borderColor: 'var(--service-color)'
        },
        avatar: /*#__PURE__*/ _jsx(Avatar, {
            sx: {
                minWidth: 'fit-content',
                padding: '6px',
                backgroundColor: 'var(--service-color)',
                fontSize: '0.65rem',
                fontWeight: 'bold',
                textShadow: '0 0 5px #fff'
            },
            children: stats.spanCount
        })
    });
}

//# sourceMappingURL=DataTable.js.map