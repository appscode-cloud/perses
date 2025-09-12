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
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    QuerySettingsEditor: function() {
        return QuerySettingsEditor;
    },
    QuerySettingsInput: function() {
        return QuerySettingsInput;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _components = require("@perses-dev/components");
const _react = require("react");
const _DeleteOutline = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/DeleteOutline"));
const _Plus = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/Plus"));
const _immer = require("immer");
const _pluginsystem = require("@perses-dev/plugin-system");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const DEFAULT_COLOR_MODE = 'fixed';
const DEFAULT_COLOR_VALUE = '#555';
const NO_INDEX_AVAILABLE = -1; // invalid array index value used to represent the fact that no query index is available
function QuerySettingsEditor({ querySettingsList, onChange }) {
    // Every time a new query settings input is added, we want to focus the recently added input
    const recentlyAddedInputRef = (0, _react.useRef)(null);
    const focusRef = (0, _react.useRef)(false);
    (0, _react.useEffect)(()=>{
        if (!recentlyAddedInputRef.current || !focusRef.current) return;
        recentlyAddedInputRef.current?.focus();
        focusRef.current = false;
    }, [
        querySettingsList?.length
    ]);
    const handleQueryIndexChange = (e, i)=>{
        if (querySettingsList !== undefined) {
            onChange((0, _immer.produce)(querySettingsList, (draft)=>{
                const querySettings = draft?.[i];
                if (querySettings) {
                    querySettings.queryIndex = parseInt(e.target.value);
                }
            }));
        }
    };
    const handleColorModeChange = (e, i)=>{
        if (querySettingsList !== undefined) {
            onChange((0, _immer.produce)(querySettingsList, (draft)=>{
                if (draft !== undefined) {
                    const querySettings = draft[i];
                    if (querySettings) {
                        querySettings.colorMode = e.target.value;
                    }
                }
            }));
        }
    };
    const handleColorValueChange = (colorValue, i)=>{
        if (querySettingsList !== undefined) {
            onChange((0, _immer.produce)(querySettingsList, (draft)=>{
                if (draft !== undefined) {
                    const querySettings = draft[i];
                    if (querySettings) {
                        querySettings.colorValue = colorValue;
                    }
                }
            }));
        }
    };
    const deleteQuerySettingsInput = (i)=>{
        if (querySettingsList !== undefined) {
            const updatedQuerySettingsList = (0, _immer.produce)(querySettingsList, (draft)=>{
                draft.splice(i, 1);
            });
            onChange(updatedQuerySettingsList);
        }
    };
    const queryCount = (0, _pluginsystem.useQueryCountContext)();
    // Compute the list of query indexes for which query settings are not already defined.
    // This is to avoid already-booked indexes to still be selectable in the dropdown(s)
    const availableQueryIndexes = (0, _react.useMemo)(()=>{
        const bookedQueryIndexes = querySettingsList?.map((querySettings)=>querySettings.queryIndex) ?? [];
        const allQueryIndexes = Array.from({
            length: queryCount
        }, (_, i)=>i);
        return allQueryIndexes.filter((_, queryIndex)=>!bookedQueryIndexes.includes(queryIndex));
    }, [
        querySettingsList,
        queryCount
    ]);
    const firstAvailableQueryIndex = (0, _react.useMemo)(()=>{
        return availableQueryIndexes[0] ?? NO_INDEX_AVAILABLE;
    }, [
        availableQueryIndexes
    ]);
    const defaultQuerySettings = {
        queryIndex: firstAvailableQueryIndex,
        colorMode: DEFAULT_COLOR_MODE,
        colorValue: DEFAULT_COLOR_VALUE
    };
    const addQuerySettingsInput = ()=>{
        focusRef.current = true;
        if (querySettingsList === undefined) {
            onChange([
                defaultQuerySettings
            ]);
        } else {
            onChange((0, _immer.produce)(querySettingsList, (draft)=>{
                draft.push(defaultQuerySettings);
            }));
        }
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorGroup, {
        title: "Query settings",
        icon: firstAvailableQueryIndex !== NO_INDEX_AVAILABLE ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.InfoTooltip, {
            description: "Add query settings",
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.IconButton, {
                size: "small",
                "aria-label": "add query settings",
                onClick: addQuerySettingsInput,
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Plus.default, {})
            })
        }) : null,
        children: querySettingsList && querySettingsList.length > 0 ? querySettingsList.map((querySettings, i)=>/*#__PURE__*/ (0, _jsxruntime.jsx)(QuerySettingsInput, {
                inputRef: i === querySettingsList.length - 1 ? recentlyAddedInputRef : undefined,
                querySettings: querySettings,
                availableQueryIndexes: availableQueryIndexes,
                onQueryIndexChange: (e)=>{
                    handleQueryIndexChange(e, i);
                },
                onColorModeChange: (e)=>handleColorModeChange(e, i),
                onColorValueChange: (color)=>handleColorValueChange(color, i),
                onDelete: ()=>{
                    deleteQuerySettingsInput(i);
                }
            }, i)) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
            mb: 2,
            fontStyle: "italic",
            children: "No query settings defined"
        })
    });
}
function QuerySettingsInput({ querySettings: { queryIndex, colorMode, colorValue }, availableQueryIndexes, onQueryIndexChange, onColorModeChange, onColorValueChange, onDelete, inputRef }) {
    // current query index should also be selectable
    const selectableQueryIndexes = availableQueryIndexes.concat(queryIndex).sort((a, b)=>a - b);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        flex: 1,
        direction: "row",
        alignItems: "center",
        justifyContent: "space-between",
        spacing: 1,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
                select: true,
                inputRef: inputRef,
                value: queryIndex,
                label: "Query",
                onChange: onQueryIndexChange,
                sx: {
                    minWidth: '75px'
                },
                children: selectableQueryIndexes.map((queryIndex)=>/*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.MenuItem, {
                        value: queryIndex,
                        children: [
                            "#",
                            queryIndex + 1
                        ]
                    }, `query-${queryIndex}`))
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.TextField, {
                select: true,
                value: colorMode,
                fullWidth: true,
                label: "Color mode",
                onChange: onColorModeChange,
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.MenuItem, {
                        value: "fixed-single",
                        children: "Fixed (single)"
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.MenuItem, {
                        value: "fixed",
                        children: "Fixed"
                    })
                ]
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsColorPicker, {
                label: 'Query n°' + queryIndex,
                color: colorValue,
                onColorChange: onColorValueChange
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.IconButton, {
                "aria-label": `delete settings for query n°${queryIndex + 1}`,
                size: "small",
                onClick: onDelete,
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_DeleteOutline.default, {})
            })
        ]
    });
}
