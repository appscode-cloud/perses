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
    AttributeList: function() {
        return AttributeList;
    },
    TraceAttributes: function() {
        return TraceAttributes;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _react = require("react");
const _material = require("@mui/material");
const _reactrouterdom = require("react-router-dom");
const _utils = require("../utils");
function TraceAttributes(props) {
    const { trace, span, attributeLinks } = props;
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.List, {
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(AttributeItem, {
                        name: "span ID",
                        value: span.spanId
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(AttributeItem, {
                        name: "start",
                        value: (0, _utils.formatDuration)(span.startTimeUnixMs - trace.startTimeUnixMs)
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(AttributeItem, {
                        name: "duration",
                        value: (0, _utils.formatDuration)(span.endTimeUnixMs - span.startTimeUnixMs)
                    })
                ]
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Divider, {}),
            span.attributes.length > 0 && /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(AttributeList, {
                        attributeLinks: attributeLinks,
                        attributes: span.attributes
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Divider, {})
                ]
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(AttributeList, {
                attributeLinks: attributeLinks,
                attributes: span.resource.attributes
            })
        ]
    });
}
function AttributeList(props) {
    const { attributeLinks, attributes } = props;
    const attributesMap = (0, _react.useMemo)(()=>Object.fromEntries(attributes.map((attr)=>[
                attr.key,
                attr.value
            ])), [
        attributes
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.List, {
        children: attributes.sort((a, b)=>a.key.localeCompare(b.key)).map((attribute, i)=>/*#__PURE__*/ (0, _jsxruntime.jsx)(AttributeItem, {
                name: attribute.key,
                value: renderAttributeValue(attribute.value),
                link: attributeLinks?.[attribute.key]?.(attributesMap)
            }, i))
    });
}
function AttributeItem(props) {
    const { name, value, link } = props;
    const valueComponent = link ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Link, {
        component: _reactrouterdom.Link,
        to: link,
        children: value
    }) : value;
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.ListItem, {
        disablePadding: true,
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.ListItemText, {
            primary: name,
            secondary: valueComponent,
            slotProps: {
                primary: {
                    variant: 'h5'
                },
                secondary: {
                    variant: 'body1',
                    sx: {
                        wordBreak: 'break-word'
                    }
                }
            }
        })
    });
}
function renderAttributeValue(value) {
    if ('stringValue' in value) return value.stringValue.length > 0 ? value.stringValue : '<empty string>';
    if ('intValue' in value) return value.intValue;
    if ('boolValue' in value) return value.boolValue.toString();
    if ('arrayValue' in value) return value.arrayValue.values.map(renderAttributeValue).join(', ');
    return 'unknown';
}
