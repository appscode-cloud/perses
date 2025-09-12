// Copyright 2025 The Perses Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// You may not use this file except in compliance with the License.
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
Object.defineProperty(exports, "LogRow", {
    enumerable: true,
    get: function() {
        return LogRow;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard(require("react"));
const _material = require("@mui/material");
const _ChevronRight = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/ChevronRight"));
const _LogTimestamp = require("./LogTimestamp");
const _LogsStyles = require("./LogsStyles");
const _LogDetailsTable = require("./LogDetailsTable");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const LogRow = /*#__PURE__*/ (0, _react.memo)(({ log, isExpanded, index, onToggle, isExpandable = true, time = false, wrap = false })=>{
    const theme = (0, _material.useTheme)();
    const severityColor = theme.palette.text.secondary;
    const handleToggle = (0, _react.useCallback)(()=>{
        if (isExpandable) {
            onToggle(index);
        }
    }, [
        isExpandable,
        onToggle,
        index
    ]);
    if (!log) return null;
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_LogsStyles.LogRowContainer, {
        severityColor: severityColor,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_LogsStyles.LogRowContent, {
                onClick: handleToggle,
                isExpandable: isExpandable,
                time: time,
                children: [
                    isExpandable && /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                        sx: {
                            display: 'flex',
                            alignItems: 'center',
                            width: '16px',
                            justifyContent: 'center'
                        },
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_LogsStyles.ExpandButton, {
                            size: "small",
                            isExpanded: isExpanded,
                            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_ChevronRight.default, {
                                sx: {
                                    fontSize: '12px'
                                }
                            })
                        })
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_LogTimestamp.LogTimestamp, {
                        timestamp: log?.timestamp
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                        sx: {
                            display: 'flex',
                            gap: '10px',
                            marginLeft: '36px'
                        },
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_LogsStyles.LogText, {
                            variant: "body2",
                            wrap: wrap,
                            children: log?.line
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Collapse, {
                in: isExpanded,
                timeout: 200,
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                    sx: {
                        padding: '8px'
                    },
                    children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Box, {
                        sx: {
                            display: 'grid',
                            gridTemplateColumns: !time ? '1fr' : '8px minmax(160px, max-content) 1fr',
                            gap: '12px'
                        },
                        children: [
                            time && /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {}),
                                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {})
                                ]
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_LogDetailsTable.LogDetailsTable, {
                                    log: log.labels
                                })
                            })
                        ]
                    })
                })
            })
        ]
    });
});
LogRow.displayName = 'LogRow';
