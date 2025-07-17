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
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo } from 'react';
import { Link, List, ListItem, ListItemText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
export function AttributeList(props) {
    const { attributeLinks, attributes } = props;
    const attributesMap = useMemo(()=>Object.fromEntries(attributes.map((attr)=>[
                attr.key,
                attr.value
            ])), [
        attributes
    ]);
    return /*#__PURE__*/ _jsx(_Fragment, {
        children: /*#__PURE__*/ _jsx(List, {
            children: attributes.sort((a, b)=>a.key.localeCompare(b.key)).map((attribute, i)=>/*#__PURE__*/ _jsx(AttributeItem, {
                    attribute: attribute,
                    linkTo: attributeLinks?.[attribute.key]?.(attributesMap)
                }, i))
        })
    });
}
function AttributeItem(props) {
    const { attribute, linkTo } = props;
    const value = linkTo ? /*#__PURE__*/ _jsx(Link, {
        component: RouterLink,
        to: linkTo,
        children: renderAttributeValue(attribute.value)
    }) : renderAttributeValue(attribute.value);
    return /*#__PURE__*/ _jsx(ListItem, {
        disablePadding: true,
        children: /*#__PURE__*/ _jsx(ListItemText, {
            primary: attribute.key,
            secondary: value,
            primaryTypographyProps: {
                variant: 'h5'
            },
            secondaryTypographyProps: {
                variant: 'body1',
                sx: {
                    wordBreak: 'break-word'
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