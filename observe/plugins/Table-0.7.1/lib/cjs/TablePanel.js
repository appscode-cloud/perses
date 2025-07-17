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
    TablePanel: function() {
        return TablePanel;
    },
    getTablePanelQueryOptions: function() {
        return getTablePanelQueryOptions;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _components = require("@perses-dev/components");
const _react = require("react");
const _core = require("@perses-dev/core");
const _EmbeddedPanel = require("./EmbeddedPanel");
function generateCellContentConfig(column) {
    const plugin = column.plugin;
    if (plugin !== undefined) {
        return {
            cell: (ctx)=>{
                const panelData = ctx.getValue();
                if (!panelData) return /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {});
                return /*#__PURE__*/ (0, _jsxruntime.jsx)(_EmbeddedPanel.EmbeddedPanel, {
                    kind: plugin.kind,
                    spec: plugin.spec,
                    queryResults: [
                        panelData
                    ]
                });
            },
            cellDescription: column.cellDescription ? ()=>`${column.cellDescription}` : ()=>''
        };
    }
    return {
        cell: (ctx)=>{
            const cellValue = ctx.getValue();
            return typeof cellValue === 'number' && column.format ? (0, _core.formatValue)(cellValue, column.format) : cellValue;
        },
        cellDescription: column.cellDescription ? ()=>`${column.cellDescription}` : undefined
    };
}
/*
 * Generate column config from column definitions, if a column has multiple definitions, the first one will be used.
 * If column is hidden, return undefined.
 * If column do not have a definition, return a default column config.
 */ function generateColumnConfig(name, columnSettings) {
    for (const column of columnSettings){
        if (column.name === name) {
            if (column.hide) {
                return undefined;
            }
            return {
                accessorKey: name,
                header: column.header ?? name,
                headerDescription: column.headerDescription,
                enableSorting: column.enableSorting,
                width: column.width,
                align: column.align,
                ...generateCellContentConfig(column)
            };
        }
    }
    return {
        accessorKey: name,
        header: name
    };
}
function generateCellConfig(value, settings) {
    for (const setting of settings){
        if (setting.condition.kind === 'Value' && setting.condition.spec?.value === String(value)) {
            return {
                text: setting.text,
                textColor: setting.textColor,
                backgroundColor: setting.backgroundColor
            };
        }
        if (setting.condition.kind === 'Range' && !Number.isNaN(Number(value))) {
            const numericValue = Number(value);
            if (setting.condition.spec?.min !== undefined && setting.condition.spec?.max !== undefined && numericValue >= +setting.condition.spec?.min && numericValue <= +setting.condition.spec?.max) {
                return {
                    text: setting.text,
                    textColor: setting.textColor,
                    backgroundColor: setting.backgroundColor
                };
            }
            if (setting.condition.spec?.min !== undefined && numericValue >= +setting.condition.spec?.min) {
                return {
                    text: setting.text,
                    textColor: setting.textColor,
                    backgroundColor: setting.backgroundColor
                };
            }
            if (setting.condition.spec?.max !== undefined && numericValue <= +setting.condition.spec?.max) {
                return {
                    text: setting.text,
                    textColor: setting.textColor,
                    backgroundColor: setting.backgroundColor
                };
            }
        }
        if (setting.condition.kind === 'Regex' && setting.condition.spec?.expr) {
            const regex = new RegExp(setting.condition.spec?.expr);
            if (regex.test(String(value))) {
                return {
                    text: setting.text,
                    textColor: setting.textColor,
                    backgroundColor: setting.backgroundColor
                };
            }
        }
        if (setting.condition.kind === 'Misc' && setting.condition.spec?.value) {
            if (setting.condition.spec?.value === 'empty' && value === '') {
                return {
                    text: setting.text,
                    textColor: setting.textColor,
                    backgroundColor: setting.backgroundColor
                };
            }
            if (setting.condition.spec?.value === 'null' && (value === null || value === undefined)) {
                return {
                    text: setting.text,
                    textColor: setting.textColor,
                    backgroundColor: setting.backgroundColor
                };
            }
            if (setting.condition.spec?.value === 'NaN' && Number.isNaN(value)) {
                return {
                    text: setting.text,
                    textColor: setting.textColor,
                    backgroundColor: setting.backgroundColor
                };
            }
            if (setting.condition.spec?.value === 'true' && value === true) {
                return {
                    text: setting.text,
                    textColor: setting.textColor,
                    backgroundColor: setting.backgroundColor
                };
            }
            if (setting.condition.spec?.value === 'false' && value === false) {
                return {
                    text: setting.text,
                    textColor: setting.textColor,
                    backgroundColor: setting.backgroundColor
                };
            }
        }
    }
    return undefined;
}
function getTablePanelQueryOptions(spec) {
    // if any cell renders a panel plugin, perform a range query instead of an instant query
    return {
        mode: (spec.columnSettings ?? []).some((c)=>c.plugin) ? 'range' : 'instant'
    };
}
function TablePanel({ contentDimensions, spec, queryResults }) {
    // TODO: handle other query types
    const queryMode = getTablePanelQueryOptions(spec).mode;
    const rawData = (0, _react.useMemo)(()=>{
        // Transform query results to a tabular format:
        // [ { timestamp: 123, value: 456, labelName1: labelValue1 }, ... ]
        return queryResults.flatMap((data, queryIndex)=>data.data.series.map((ts)=>({
                    data,
                    ts,
                    queryIndex
                }))).map(({ data, ts, queryIndex })=>{
            if (ts.values[0] === undefined) {
                return {
                    ...ts.labels
                };
            }
            // If there are multiple queries, we need to add the query index to the value key and label key to avoid conflicts
            const valueColumnName = queryResults.length === 1 ? 'value' : `value #${queryIndex + 1}`;
            const labels = queryResults.length === 1 ? ts.labels : Object.entries(ts.labels ?? {}).reduce((acc, [key, value])=>{
                if (key) acc[`${key} #${queryIndex + 1}`] = value;
                return acc;
            }, {});
            // If the cell visualization is a panel plugin, filter the data by the current series
            const columnValue = (spec.columnSettings ?? []).find((x)=>x.name === valueColumnName)?.plugin ? {
                ...data,
                data: {
                    ...data.data,
                    series: data.data.series.filter((s)=>s === ts)
                }
            } : ts.values[0][1];
            if (queryMode === 'instant') {
                // Timestamp is not indexed as it will be the same for all queries
                return {
                    timestamp: ts.values[0][0],
                    [valueColumnName]: columnValue,
                    ...labels
                };
            } else {
                // Don't add a timestamp for range queries
                return {
                    [valueColumnName]: columnValue,
                    ...labels
                };
            }
        });
    }, [
        queryResults,
        queryMode,
        spec.columnSettings
    ]);
    // Transform will be applied by their orders on the original data
    const data = (0, _core.useTransformData)(rawData, spec.transforms ?? []);
    const keys = (0, _react.useMemo)(()=>{
        const result = [];
        for (const entry of data){
            for (const key of Object.keys(entry)){
                if (!result.includes(key)) {
                    result.push(key);
                }
            }
        }
        return result;
    }, [
        data
    ]);
    const columns = (0, _react.useMemo)(()=>{
        const columns = [];
        // Taking the customized columns first for the ordering of the columns in the table
        const customizedColumns = spec.columnSettings?.map((column)=>column.name).filter((name)=>keys.includes(name)) ?? [];
        const defaultColumns = keys.filter((key)=>!customizedColumns.includes(key));
        for (const key of customizedColumns){
            const columnConfig = generateColumnConfig(key, spec.columnSettings ?? []);
            if (columnConfig !== undefined) {
                columns.push(columnConfig);
            }
        }
        for (const key of defaultColumns){
            const columnConfig = generateColumnConfig(key, spec.columnSettings ?? []);
            if (columnConfig !== undefined) {
                columns.push(columnConfig);
            }
        }
        return columns;
    }, [
        keys,
        spec.columnSettings
    ]);
    // Generate cell settings that will be used by the table to render cells (text color, background color, ...)
    const cellConfigs = (0, _react.useMemo)(()=>{
        // If there is no cell settings, return an empty array
        if (spec.cellSettings === undefined) {
            return {};
        }
        const result = {};
        let index = 0;
        for (const row of data){
            // Transforming key to object to extend the row with undefined values if the key is not present
            // for checking the cell config "Misc" condition with "null"
            const keysAsObj = keys.reduce((acc, key)=>{
                acc[key] = undefined;
                return acc;
            }, {});
            const extendRow = {
                ...keysAsObj,
                ...row
            };
            for (const [key, value] of Object.entries(extendRow)){
                const cellConfig = generateCellConfig(value, spec.cellSettings ?? []);
                if (cellConfig) {
                    result[`${index}_${key}`] = cellConfig;
                }
            }
            index++;
        }
        return result;
    }, [
        data,
        keys,
        spec.cellSettings
    ]);
    function generateDefaultSortingState() {
        return spec.columnSettings?.filter((column)=>column.sort !== undefined).map((column)=>{
            return {
                id: column.name,
                desc: column.sort === 'desc'
            };
        }) ?? [];
    }
    const [sorting, setSorting] = (0, _react.useState)(generateDefaultSortingState());
    const [pagination, setPagination] = (0, _react.useState)(spec.pagination ? {
        pageIndex: 0,
        pageSize: 10
    } : undefined);
    (0, _react.useEffect)(()=>{
        // If the pagination setting changes from no pagination to pagination, but the pagination state is undefined, update the pagination state
        if (spec.pagination && !pagination) {
            setPagination({
                pageIndex: 0,
                pageSize: 10
            });
        } else if (!spec.pagination && pagination) {
            setPagination(undefined);
        }
    }, [
        spec.pagination,
        pagination
    ]);
    if (contentDimensions === undefined) {
        return null;
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.Table, {
        data: data,
        columns: columns,
        cellConfigs: cellConfigs,
        height: contentDimensions.height,
        width: contentDimensions.width,
        density: spec.density,
        defaultColumnWidth: spec.defaultColumnWidth,
        defaultColumnHeight: spec.defaultColumnHeight,
        sorting: sorting,
        onSortingChange: setSorting,
        pagination: pagination,
        onPaginationChange: setPagination
    });
}
