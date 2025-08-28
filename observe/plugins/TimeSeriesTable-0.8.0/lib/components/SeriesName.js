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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSnackbar } from '@perses-dev/components';
import { Typography } from '@mui/material';
/*
 * Display a series with labels in bold and with a copy to clipboard feature if isFormatted is enabled
 * Else it will only display the series in plain text (mostly use for performance reasons)
 */ export function SeriesName({ name, labels, formattedName, isFormatted }) {
    if (isFormatted && labels && Object.keys(labels).length > 0) {
        return /*#__PURE__*/ _jsx(FormatedSeriesName, {
            labels: labels
        });
    }
    return /*#__PURE__*/ _jsx(Typography, {
        sx: {
            textWrap: 'auto'
        },
        children: formattedName ?? name
    });
}
function FormatedSeriesName({ labels }) {
    const { infoSnackbar } = useSnackbar();
    const labelNodes = [];
    let first = true;
    function copyToClipboard(e) {
        const copyText = e.currentTarget.innerText || '';
        navigator.clipboard.writeText(copyText.trim()).then(()=>{
            infoSnackbar(`Copied label matcher: ${copyText}`);
        }).catch((reason)=>{
            console.error(`unable to copy text: ${reason}`);
        });
    }
    for(const label in labels){
        if (label === '__name__') {
            continue;
        }
        labelNodes.push(/*#__PURE__*/ _jsxs("span", {
            children: [
                !first && ', ',
                /*#__PURE__*/ _jsxs(Typography, {
                    display: "inline",
                    component: "span",
                    sx: {
                        '&:hover': {
                            cursor: 'pointer',
                            textDecoration: 'underline'
                        }
                    },
                    onClick: copyToClipboard,
                    title: "Click to copy label matcher",
                    children: [
                        /*#__PURE__*/ _jsx("strong", {
                            children: label
                        }),
                        "=",
                        /*#__PURE__*/ _jsxs("span", {
                            children: [
                                '"',
                                labels[label],
                                '"'
                            ]
                        })
                    ]
                })
            ]
        }, label));
        if (first) {
            first = false;
        }
    }
    return /*#__PURE__*/ _jsxs(Typography, {
        sx: {
            textWrap: 'auto'
        },
        children: [
            labels ? labels.__name__ : '',
            '{',
            labelNodes,
            '}'
        ]
    });
}

//# sourceMappingURL=SeriesName.js.map