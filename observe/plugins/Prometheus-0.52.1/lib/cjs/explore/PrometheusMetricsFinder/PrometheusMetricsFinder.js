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
    MetricNameExplorer: function() {
        return MetricNameExplorer;
    },
    PrometheusMetricsFinder: function() {
        return PrometheusMetricsFinder;
    },
    SettingsMenu: function() {
        return SettingsMenu;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _fuzzy = require("@nexucis/fuzzy");
const _explore = require("@perses-dev/explore");
const _ArrowLeft = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/ArrowLeft"));
const _Cog = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/Cog"));
const _Magnify = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/Magnify"));
const _react = require("react");
const _reactrouterdom = require("react-router-dom");
const _model = require("../../model");
const _MetricList = require("./display/list/MetricList");
const _FinderFilters = require("./filter/FinderFilters");
const _MetricOverview = require("./overview/MetricOverview");
const _utils = require("./utils");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const PERSES_METRICS_FINDER_SETTINGS = 'PERSES_METRICS_FINDER_SETTINGS';
function SettingsMenu({ value, onChange }) {
    const [anchorEl, setAnchorEl] = (0, _react.useState)(null);
    const open = Boolean(anchorEl);
    const handleClick = (event)=>{
        setAnchorEl(event.currentTarget);
    };
    const handleClose = ()=>{
        setAnchorEl(null);
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.IconButton, {
                "aria-label": "settings",
                size: "large",
                onClick: handleClick,
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Cog.default, {})
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Menu, {
                id: "finder-settings-menu",
                anchorEl: anchorEl,
                open: open,
                onClose: handleClose,
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.MenuItem, {
                        onClick: (e)=>e.preventDefault(),
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.FormControlLabel, {
                            control: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Checkbox, {}),
                            label: "Enable Metadata",
                            checked: value.isMetadataEnabled,
                            onClick: ()=>onChange({
                                    ...value,
                                    isMetadataEnabled: !value.isMetadataEnabled
                                })
                        })
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.MenuItem, {
                        onClick: (e)=>e.preventDefault(),
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.FormControlLabel, {
                            control: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Checkbox, {}),
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
function MetricNameExplorer({ datasource, filters, isMetadataEnabled, onExplore, ...props }) {
    const { data, isLoading, error } = (0, _utils.useLabelValues)('__name__', filters, datasource);
    const [search, setSearch] = (0, _react.useState)('');
    const fuzzy = (0, _react.useMemo)(()=>new _fuzzy.Fuzzy({
            includeMatches: true,
            excludedChars: [
                ' '
            ]
        }), []);
    const filteredResults = (0, _react.useMemo)(()=>{
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
        return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
            width: "100%",
            children: [
                "Error: ",
                error.message
            ]
        });
    }
    if (isLoading) {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Stack, {
            width: "100%",
            sx: {
                alignItems: 'center',
                justifyContent: 'center'
            },
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.CircularProgress, {})
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        ...props,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
                value: search,
                onChange: (e)=>setSearch(e.target.value),
                placeholder: "Search metric name...",
                InputProps: {
                    startAdornment: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.InputAdornment, {
                        position: "start",
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Magnify.default, {})
                    })
                }
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_MetricList.MetricList, {
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
function PrometheusMetricsFinder({ value: { datasource = _model.DEFAULT_PROM, filters = [], exploredMetric }, onChange, onExplore, ...props }) {
    const settingsStored = localStorage.getItem(PERSES_METRICS_FINDER_SETTINGS);
    const [settings, setSettings] = (0, _react.useState)(settingsStored ? JSON.parse(settingsStored) : {
        isMetadataEnabled: true
    });
    function handleSettingsUpdate(value) {
        setSettings(value);
        localStorage.setItem(PERSES_METRICS_FINDER_SETTINGS, JSON.stringify(value));
    }
    const isMobileSize = (0, _material.useMediaQuery)((0, _material.useTheme)().breakpoints.down('md'));
    // Remove duplicated filters and filters without label or labelValues
    const filteredFilters = (0, _react.useMemo)(()=>{
        return filters.filter((filter)=>filter.label && filter.labelValues.length > 0);
    }, [
        filters
    ]);
    const searchParams = (0, _explore.useExplorerQueryParams)({
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
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        ...props,
        gap: 1,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                direction: isMobileSize ? 'column' : 'row',
                gap: 2,
                justifyContent: "space-between",
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_FinderFilters.FinderFilters, {
                        datasource: datasource ?? _model.DEFAULT_PROM,
                        filters: filters ?? [],
                        filteredFilters: filteredFilters,
                        onDatasourceChange: setDatasource,
                        onFiltersChange: setFilters
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                        direction: "row",
                        gap: 1,
                        alignItems: "center",
                        children: [
                            exploredMetric && /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Button, {
                                variant: "contained",
                                "aria-label": "back to metric explorer",
                                startIcon: /*#__PURE__*/ (0, _jsxruntime.jsx)(_ArrowLeft.default, {}),
                                component: _reactrouterdom.Link,
                                to: `?${searchParams}`,
                                children: "Back"
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Stack, {
                                direction: "row",
                                sx: {
                                    width: isMobileSize ? '100%' : 'unset'
                                },
                                justifyContent: isMobileSize ? 'end' : 'unset',
                                alignItems: "center",
                                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(SettingsMenu, {
                                    value: settings,
                                    onChange: handleSettingsUpdate
                                })
                            })
                        ]
                    })
                ]
            }),
            exploredMetric ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_MetricOverview.MetricOverview, {
                metricName: exploredMetric,
                datasource: datasource ?? _model.DEFAULT_PROM,
                filters: filteredFilters,
                isMetadataEnabled: settings.isMetadataEnabled,
                isPanelEnabled: settings.isPanelEnabled,
                onFiltersChange: setFilters,
                onExplore: onExplore
            }) : /*#__PURE__*/ (0, _jsxruntime.jsx)(MetricNameExplorer, {
                datasource: datasource ?? _model.DEFAULT_PROM,
                filters: filteredFilters,
                isMetadataEnabled: settings.isMetadataEnabled,
                onExplore: onExplore
            })
        ]
    });
}
