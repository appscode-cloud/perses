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
Object.defineProperty(exports, "SimilarTab", {
    enumerable: true,
    get: function() {
        return SimilarTab;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _react = require("react");
const _MetricList = require("../../display/list/MetricList");
const _utils = require("../../utils");
function SimilarTab({ filters, datasource, isMetadataEnabled, onExplore, ...props }) {
    const filtersWithoutName = (0, _react.useMemo)(()=>{
        return filters.filter((filter)=>filter.label !== '__name__');
    }, [
        filters
    ]);
    const { data, isLoading } = (0, _utils.useLabelValues)('__name__', filtersWithoutName, datasource);
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
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_MetricList.MetricList, {
        metricNames: data?.data ?? [],
        datasource: datasource,
        filters: filtersWithoutName,
        isMetadataEnabled: isMetadataEnabled,
        onExplore: onExplore,
        ...props
    });
}
