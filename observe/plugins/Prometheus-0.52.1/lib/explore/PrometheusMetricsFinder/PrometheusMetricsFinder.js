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
import { Button, Checkbox, CircularProgress, FormControlLabel, IconButton, InputAdornment, Menu, MenuItem, Stack, TextField, useMediaQuery, useTheme } from '@mui/material';
import { Fuzzy } from '@nexucis/fuzzy';
import { useExplorerQueryParams } from '@perses-dev/explore';
import ArrowLeftIcon from 'mdi-material-ui/ArrowLeft';
import CogIcon from 'mdi-material-ui/Cog';
import Magnify from 'mdi-material-ui/Magnify';
import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { DEFAULT_PROM } from '../../model';
import { MetricList } from './display/list/MetricList';
import { FinderFilters } from './filter/FinderFilters';
import { MetricOverview } from './overview/MetricOverview';
import { useLabelValues } from './utils';
const PERSES_METRICS_FINDER_SETTINGS = 'PERSES_METRICS_FINDER_SETTINGS';
export function SettingsMenu({ value, onChange }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event)=>{
        setAnchorEl(event.currentTarget);
    };
    const handleClose = ()=>{
        setAnchorEl(null);
    };
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            /*#__PURE__*/ _jsx(IconButton, {
                "aria-label": "settings",
                size: "large",
                onClick: handleClick,
                children: /*#__PURE__*/ _jsx(CogIcon, {})
            }),
            /*#__PURE__*/ _jsxs(Menu, {
                id: "finder-settings-menu",
                anchorEl: anchorEl,
                open: open,
                onClose: handleClose,
                children: [
                    /*#__PURE__*/ _jsx(MenuItem, {
                        onClick: (e)=>e.preventDefault(),
                        children: /*#__PURE__*/ _jsx(FormControlLabel, {
                            control: /*#__PURE__*/ _jsx(Checkbox, {}),
                            label: "Enable Metadata",
                            checked: value.isMetadataEnabled,
                            onClick: ()=>onChange({
                                    ...value,
                                    isMetadataEnabled: !value.isMetadataEnabled
                                })
                        })
                    }),
                    /*#__PURE__*/ _jsx(MenuItem, {
                        onClick: (e)=>e.preventDefault(),
                        children: /*#__PURE__*/ _jsx(FormControlLabel, {
                            control: /*#__PURE__*/ _jsx(Checkbox, {}),
                            label: "Enable Time Series Chart",
                            checked: value.isPanelEnabled,
                            onClick: ()=>onChange({
                                    ...value,
                                    isPanelEnabled: !value.isPanelEnabled
                                })
                        })
                    })
                ]
            })
        ]
    });
}
export function MetricNameExplorer({ datasource, filters, isMetadataEnabled, onExplore, ...props }) {
    const { data, isLoading, error } = useLabelValues('__name__', filters, datasource);
    const [search, setSearch] = useState('');
    const fuzzy = useMemo(()=>new Fuzzy({
            includeMatches: true,
            excludedChars: [
                ' '
            ]
        }), []);
    const filteredResults = useMemo(()=>{
        if (search && data?.data) {
            return fuzzy.filter(search, data.data).sort((a, b)=>b.score - a.score);
        }
        return undefined;
    }, [
        data,
        fuzzy,
        search
    ]);
    if (error) {
        return /*#__PURE__*/ _jsxs(Stack, {
            width: "100%",
            children: [
                "Error: ",
                error.message
            ]
        });
    }
    if (isLoading) {
        return /*#__PURE__*/ _jsx(Stack, {
            width: "100%",
            sx: {
                alignItems: 'center',
                justifyContent: 'center'
            },
            children: /*#__PURE__*/ _jsx(CircularProgress, {})
        });
    }
    return /*#__PURE__*/ _jsxs(Stack, {
        ...props,
        children: [
            /*#__PURE__*/ _jsx(TextField, {
                value: search,
                onChange: (e)=>setSearch(e.target.value),
                placeholder: "Search metric name...",
                InputProps: {
                    startAdornment: /*#__PURE__*/ _jsx(InputAdornment, {
                        position: "start",
                        children: /*#__PURE__*/ _jsx(Magnify, {})
                    })
                }
            }),
            /*#__PURE__*/ _jsx(MetricList, {
                metricNames: data?.data ?? [],
                filteredResults: filteredResults,
                datasource: datasource,
                filters: filters,
                isMetadataEnabled: isMetadataEnabled,
                onExplore: onExplore
            })
        ]
    });
}
export function PrometheusMetricsFinder({ value: { datasource = DEFAULT_PROM, filters = [], exploredMetric }, onChange, onExplore, ...props }) {
    const settingsStored = localStorage.getItem(PERSES_METRICS_FINDER_SETTINGS);
    const [settings, setSettings] = useState(settingsStored ? JSON.parse(settingsStored) : {
        isMetadataEnabled: true
    });
    function handleSettingsUpdate(value) {
        setSettings(value);
        localStorage.setItem(PERSES_METRICS_FINDER_SETTINGS, JSON.stringify(value));
    }
    const isMobileSize = useMediaQuery(useTheme().breakpoints.down('md'));
    // Remove duplicated filters and filters without label or labelValues
    const filteredFilters = useMemo(()=>{
        return filters.filter((filter)=>filter.label && filter.labelValues.length > 0);
    }, [
        filters
    ]);
    const searchParams = useExplorerQueryParams({
        data: {
            tab: 'finder',
            datasource,
            filters,
            exploredMetric: undefined
        }
    });
    function setDatasource(value) {
        onChange({
            datasource: value,
            filters,
            exploredMetric
        });
    }
    function setFilters(value) {
        onChange({
            datasource,
            filters: value,
            exploredMetric
        });
    }
    return /*#__PURE__*/ _jsxs(Stack, {
        ...props,
        gap: 1,
        children: [
            /*#__PURE__*/ _jsxs(Stack, {
                direction: isMobileSize ? 'column' : 'row',
                gap: 2,
                justifyContent: "space-between",
                children: [
                    /*#__PURE__*/ _jsx(FinderFilters, {
                        datasource: datasource ?? DEFAULT_PROM,
                        filters: filters ?? [],
                        filteredFilters: filteredFilters,
                        onDatasourceChange: setDatasource,
                        onFiltersChange: setFilters
                    }),
                    /*#__PURE__*/ _jsxs(Stack, {
                        direction: "row",
                        gap: 1,
                        alignItems: "center",
                        children: [
                            exploredMetric && /*#__PURE__*/ _jsx(Button, {
                                variant: "contained",
                                "aria-label": "back to metric explorer",
                                startIcon: /*#__PURE__*/ _jsx(ArrowLeftIcon, {}),
                                component: RouterLink,
                                to: `?${searchParams}`,
                                children: "Back"
                            }),
                            /*#__PURE__*/ _jsx(Stack, {
                                direction: "row",
                                sx: {
                                    width: isMobileSize ? '100%' : 'unset'
                                },
                                justifyContent: isMobileSize ? 'end' : 'unset',
                                alignItems: "center",
                                children: /*#__PURE__*/ _jsx(SettingsMenu, {
                                    value: settings,
                                    onChange: handleSettingsUpdate
                                })
                            })
                        ]
                    })
                ]
            }),
            exploredMetric ? /*#__PURE__*/ _jsx(MetricOverview, {
                metricName: exploredMetric,
                datasource: datasource ?? DEFAULT_PROM,
                filters: filteredFilters,
                isMetadataEnabled: settings.isMetadataEnabled,
                isPanelEnabled: settings.isPanelEnabled,
                onFiltersChange: setFilters,
                onExplore: onExplore
            }) : /*#__PURE__*/ _jsx(MetricNameExplorer, {
                datasource: datasource ?? DEFAULT_PROM,
                filters: filteredFilters,
                isMetadataEnabled: settings.isMetadataEnabled,
                onExplore: onExplore
            })
        ]
    });
}

//# sourceMappingURL=PrometheusMetricsFinder.js.map