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
Object.defineProperty(exports, "LogDetailsTable", {
    enumerable: true,
    get: function() {
        return LogDetailsTable;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_default(require("react"));
const _material = require("@mui/material");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const LogDetailsTable = ({ log })=>{
    const theme = (0, _material.useTheme)();
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Table, {
        size: "small",
        sx: {
            border: `1px solid ${theme.palette.divider}`,
            '& .MuiTableCell-root': {
                border: 'none',
                padding: '6px 8px',
                fontSize: '12px'
            }
        },
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableBody, {
            children: Object.entries(log).map(([key, value])=>/*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.TableRow, {
                    sx: {
                        '&:hover': {
                            backgroundColor: (0, _material.alpha)(theme.palette.action.hover, 0.04)
                        }
                    },
                    children: [
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableCell, {
                            sx: {
                                color: theme.palette.text.secondary,
                                fontWeight: 500,
                                width: '33%'
                            },
                            children: key
                        }),
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableCell, {
                            sx: {
                                color: theme.palette.text.primary,
                                wordBreak: 'break-word',
                                width: '67%'
                            },
                            children: value !== undefined && value !== null && value !== '' ? value : '--'
                        })
                    ]
                }, key))
        })
    });
};
