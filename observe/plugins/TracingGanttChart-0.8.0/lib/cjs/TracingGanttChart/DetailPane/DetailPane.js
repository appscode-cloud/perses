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
Object.defineProperty(exports, "DetailPane", {
    enumerable: true,
    get: function() {
        return DetailPane;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _react = require("react");
const _Close = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/Close"));
const _Attributes = require("./Attributes");
const _SpanEvents = require("./SpanEvents");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function DetailPane(props) {
    const { attributeLinks, trace, span, onCloseBtnClick } = props;
    const [tab, setTab] = (0, _react.useState)('attributes');
    // if the events tab is selected, and then a span without events is clicked,
    // we need to switch the current selected tab back to the attributes tab.
    if (tab === 'events' && span.events.length === 0) {
        setTab('attributes');
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Box, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.IconButton, {
                sx: {
                    float: 'right'
                },
                onClick: onCloseBtnClick,
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Close.default, {})
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                sx: {
                    wordBreak: 'break-word'
                },
                children: span.resource.serviceName
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                variant: "h2",
                sx: {
                    wordBreak: 'break-word'
                },
                children: span.name
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                sx: {
                    borderBottom: 1,
                    borderColor: 'divider'
                },
                children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Tabs, {
                    value: tab,
                    onChange: (_, tab)=>setTab(tab),
                    children: [
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Tab, {
                            sx: {
                                p: 0
                            },
                            value: "attributes",
                            label: "Attributes"
                        }),
                        span.events.length > 0 && /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Tab, {
                            value: "events",
                            label: "Events"
                        })
                    ]
                })
            }),
            tab === 'attributes' && /*#__PURE__*/ (0, _jsxruntime.jsx)(_Attributes.TraceAttributes, {
                trace: trace,
                span: span,
                attributeLinks: attributeLinks
            }),
            tab === 'events' && /*#__PURE__*/ (0, _jsxruntime.jsx)(_SpanEvents.SpanEventList, {
                trace: trace,
                span: span
            })
        ]
    });
}
