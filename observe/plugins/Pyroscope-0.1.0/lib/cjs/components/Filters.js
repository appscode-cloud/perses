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
Object.defineProperty(exports, "Filters", {
    enumerable: true,
    get: function() {
        return Filters;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _FilterItem = require("./FilterItem");
const _AddFilterItem = require("./AddFilterItem");
function Filters(props) {
    const theme = (0, _material.useTheme)();
    const { datasource, value, onChange } = props;
    const addFilterItem = ()=>{
        const newItem = {
            labelName: '',
            labelValue: '',
            operator: '='
        };
        const updatedFilters = [
            ...value,
            newItem
        ];
        onChange?.(updatedFilters);
    };
    const updateFilter = (index, newValue)=>{
        const nextFilters = [
            ...value
        ];
        nextFilters[index] = newValue;
        onChange?.(nextFilters);
    };
    const deleteFilter = (index)=>{
        const nextFilters = [
            ...value
        ];
        nextFilters.splice(index, 1);
        if (nextFilters.length === 0) {
            onChange?.([
                {
                    labelName: '',
                    labelValue: '',
                    operator: '='
                }
            ]); // keep at least one empty filter
        } else {
            onChange?.(nextFilters);
        }
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        position: "relative",
        direction: "row",
        spacing: 0,
        sx: {
            flexWrap: 'wrap',
            rowGap: 1,
            gap: 1,
            padding: '10px',
            border: `1px solid ${theme.palette.action.disabled}`,
            borderRadius: `${theme.shape.borderRadius}px`,
            '&:hover': {
                borderColor: theme.palette.text.primary
            }
        },
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.InputLabel, {
                shrink: true,
                sx: {
                    position: 'absolute',
                    top: '-6px',
                    left: '10px',
                    padding: '0 4px',
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.default,
                    zIndex: 1
                },
                children: "Filters"
            }),
            value.map((filter, index)=>/*#__PURE__*/ (0, _jsxruntime.jsx)(_FilterItem.FilterItem, {
                    datasource: datasource,
                    value: filter,
                    onChange: (newValue)=>updateFilter(index, newValue),
                    deleteItem: ()=>deleteFilter(index)
                }, `${filter.labelName}:${filter.operator}:${filter.labelValue}`)),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_AddFilterItem.AddFilterItem, {
                onClick: addFilterItem
            })
        ]
    });
}
