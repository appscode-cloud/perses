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
import { Box, IconButton, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import CloseIcon from 'mdi-material-ui/Close';
import { TraceAttributes } from './Attributes';
import { SpanEventList } from './SpanEvents';
/**
 * DetailPane renders a sidebar showing the span attributes etc.
 */ export function DetailPane(props) {
    const { attributeLinks, trace, span, onCloseBtnClick } = props;
    const [tab, setTab] = useState('attributes');
    // if the events tab is selected, and then a span without events is clicked,
    // we need to switch the current selected tab back to the attributes tab.
    if (tab === 'events' && span.events.length === 0) {
        setTab('attributes');
    }
    return /*#__PURE__*/ _jsxs(Box, {
        children: [
            /*#__PURE__*/ _jsx(IconButton, {
                sx: {
                    float: 'right'
                },
                onClick: onCloseBtnClick,
                children: /*#__PURE__*/ _jsx(CloseIcon, {})
            }),
            /*#__PURE__*/ _jsx(Typography, {
                sx: {
                    wordBreak: 'break-word'
                },
                children: span.resource.serviceName
            }),
            /*#__PURE__*/ _jsx(Typography, {
                variant: "h2",
                sx: {
                    wordBreak: 'break-word'
                },
                children: span.name
            }),
            /*#__PURE__*/ _jsx(Box, {
                sx: {
                    borderBottom: 1,
                    borderColor: 'divider'
                },
                children: /*#__PURE__*/ _jsxs(Tabs, {
                    value: tab,
                    onChange: (_, tab)=>setTab(tab),
                    children: [
                        /*#__PURE__*/ _jsx(Tab, {
                            sx: {
                                p: 0
                            },
                            value: "attributes",
                            label: "Attributes"
                        }),
                        span.events.length > 0 && /*#__PURE__*/ _jsx(Tab, {
                            value: "events",
                            label: "Events"
                        })
                    ]
                })
            }),
            tab === 'attributes' && /*#__PURE__*/ _jsx(TraceAttributes, {
                trace: trace,
                span: span,
                attributeLinks: attributeLinks
            }),
            tab === 'events' && /*#__PURE__*/ _jsx(SpanEventList, {
                trace: trace,
                span: span
            })
        ]
    });
}

//# sourceMappingURL=DetailPane.js.map