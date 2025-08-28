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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo } from 'react';
import { Divider, Link, List, ListItem, ListItemText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { formatDuration } from '../utils';
export function TraceAttributes(props) {
    const { trace, span, attributeLinks } = props;
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            /*#__PURE__*/ _jsxs(List, {
                children: [
                    /*#__PURE__*/ _jsx(AttributeItem, {
                        name: "span ID",
                        value: span.spanId
                    }),
                    /*#__PURE__*/ _jsx(AttributeItem, {
                        name: "start",
                        value: formatDuration(span.startTimeUnixMs - trace.startTimeUnixMs)
                    }),
                    /*#__PURE__*/ _jsx(AttributeItem, {
                        name: "duration",
                        value: formatDuration(span.endTimeUnixMs - span.startTimeUnixMs)
                    })
                ]
            }),
            /*#__PURE__*/ _jsx(Divider, {}),
            span.attributes.length > 0 && /*#__PURE__*/ _jsxs(_Fragment, {
                children: [
                    /*#__PURE__*/ _jsx(AttributeList, {
                        attributeLinks: attributeLinks,
                        attributes: span.attributes
                    }),
                    /*#__PURE__*/ _jsx(Divider, {})
                ]
            }),
            /*#__PURE__*/ _jsx(AttributeList, {
                attributeLinks: attributeLinks,
                attributes: span.resource.attributes
            })
        ]
    });
}
export function AttributeList(props) {
    const { attributeLinks, attributes } = props;
    const attributesMap = useMemo(()=>Object.fromEntries(attributes.map((attr)=>[
                attr.key,
                attr.value
            ])), [
        attributes
    ]);
    return /*#__PURE__*/ _jsx(List, {
        children: attributes.sort((a, b)=>a.key.localeCompare(b.key)).map((attribute, i)=>/*#__PURE__*/ _jsx(AttributeItem, {
                name: attribute.key,
                value: renderAttributeValue(attribute.value),
                link: attributeLinks?.[attribute.key]?.(attributesMap)
            }, i))
    });
}
function AttributeItem(props) {
    const { name, value, link } = props;
    const valueComponent = link ? /*#__PURE__*/ _jsx(Link, {
        component: RouterLink,
        to: link,
        children: value
    }) : value;
    return /*#__PURE__*/ _jsx(ListItem, {
        disablePadding: true,
        children: /*#__PURE__*/ _jsx(ListItemText, {
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

//# sourceMappingURL=Attributes.js.map