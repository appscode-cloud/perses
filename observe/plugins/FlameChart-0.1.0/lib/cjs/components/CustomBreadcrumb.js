// Copyright 2025 The Perses Authors
// Licensed under the Apache License |  Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing |  software
// distributed under the License is distributed on an "AS IS" BASIS |
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND |  either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CustomBreadcrumb", {
    enumerable: true,
    get: function() {
        return CustomBreadcrumb;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _ChevronRight = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/ChevronRight"));
const _EyeOutline = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/EyeOutline"));
const _Close = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/Close"));
const _Chip = /*#__PURE__*/ _interop_require_default(require("@mui/material/Chip"));
const _styles = require("@mui/material/styles");
const _core = require("@perses-dev/core");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const StyledBreadcrumb = (0, _styles.styled)(_Chip.default)(({ theme })=>{
    const backgroundColor = theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[800];
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: (0, _styles.emphasize)(backgroundColor, 0.06)
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: (0, _styles.emphasize)(backgroundColor, 0.12)
        }
    };
});
function CustomBreadcrumb(props) {
    const { totalValue, totalSample, otherItemSample, onSelectedIdChange } = props;
    const handleClick = (event)=>{
        event.preventDefault();
        onSelectedIdChange(0);
    };
    const splitedValue = totalValue.split('(');
    const totalValueText = splitedValue[splitedValue.length - 1]?.slice(0, -1);
    const totalLabel = (0, _core.formatValue)(totalSample, {
        unit: 'decimal',
        decimalPlaces: 2,
        shortValues: true
    }) + ' samples';
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Stack, {
        direction: "row",
        spacing: 1,
        minHeight: 40,
        alignItems: "center",
        children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Breadcrumbs, {
            separator: /*#__PURE__*/ (0, _jsxruntime.jsx)(_ChevronRight.default, {
                fontSize: "small"
            }),
            "aria-label": "breadcrumb",
            sx: {
                justifyContent: 'center'
            },
            children: [
                /*#__PURE__*/ (0, _jsxruntime.jsx)(StyledBreadcrumb, {
                    label: totalValueText + '  |  ' + totalLabel
                }),
                otherItemSample !== undefined && /*#__PURE__*/ (0, _jsxruntime.jsx)(StyledBreadcrumb, {
                    label: (otherItemSample / totalSample * 100).toFixed(2) + '% of total',
                    icon: /*#__PURE__*/ (0, _jsxruntime.jsx)(_EyeOutline.default, {
                        fontSize: "small",
                        color: "secondary"
                    }),
                    deleteIcon: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Close.default, {
                        fontSize: "small"
                    }),
                    onDelete: handleClick
                })
            ]
        })
    });
}
