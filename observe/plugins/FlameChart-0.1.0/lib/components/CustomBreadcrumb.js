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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Stack, Breadcrumbs } from '@mui/material';
import ChevronRightIcon from 'mdi-material-ui/ChevronRight';
import EyeIcon from 'mdi-material-ui/EyeOutline';
import CloseIcon from 'mdi-material-ui/Close';
import Chip from '@mui/material/Chip';
import { emphasize, styled } from '@mui/material/styles';
import { formatValue } from '@perses-dev/core';
const StyledBreadcrumb = styled(Chip)(({ theme })=>{
    const backgroundColor = theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[800];
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: emphasize(backgroundColor, 0.06)
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12)
        }
    };
});
export function CustomBreadcrumb(props) {
    const { totalValue, totalSample, otherItemSample, onSelectedIdChange } = props;
    const handleClick = (event)=>{
        event.preventDefault();
        onSelectedIdChange(0);
    };
    const splitedValue = totalValue.split('(');
    const totalValueText = splitedValue[splitedValue.length - 1]?.slice(0, -1);
    const totalLabel = formatValue(totalSample, {
        unit: 'decimal',
        decimalPlaces: 2,
        shortValues: true
    }) + ' samples';
    return /*#__PURE__*/ _jsx(Stack, {
        direction: "row",
        spacing: 1,
        minHeight: 40,
        alignItems: "center",
        children: /*#__PURE__*/ _jsxs(Breadcrumbs, {
            separator: /*#__PURE__*/ _jsx(ChevronRightIcon, {
                fontSize: "small"
            }),
            "aria-label": "breadcrumb",
            sx: {
                justifyContent: 'center'
            },
            children: [
                /*#__PURE__*/ _jsx(StyledBreadcrumb, {
                    label: totalValueText + '  |  ' + totalLabel
                }),
                otherItemSample !== undefined && /*#__PURE__*/ _jsx(StyledBreadcrumb, {
                    label: (otherItemSample / totalSample * 100).toFixed(2) + '% of total',
                    icon: /*#__PURE__*/ _jsx(EyeIcon, {
                        fontSize: "small",
                        color: "secondary"
                    }),
                    deleteIcon: /*#__PURE__*/ _jsx(CloseIcon, {
                        fontSize: "small"
                    }),
                    onDelete: handleClick
                })
            ]
        })
    });
}

//# sourceMappingURL=CustomBreadcrumb.js.map