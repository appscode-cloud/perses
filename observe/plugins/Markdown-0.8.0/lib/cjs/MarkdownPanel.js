// Copyright 2023 The Perses Authors
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
Object.defineProperty(exports, "MarkdownPanel", {
    enumerable: true,
    get: function() {
        return MarkdownPanel;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _components = require("@perses-dev/components");
const _pluginsystem = require("@perses-dev/plugin-system");
const _dompurify = /*#__PURE__*/ _interop_require_default(require("dompurify"));
const _marked = require("marked");
const _react = /*#__PURE__*/ _interop_require_wildcard(require("react"));
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
function createMarkdownPanelStyles(theme, chartsTheme) {
    return {
        padding: `${chartsTheme.container.padding.default}px`,
        // Make the content scrollable
        height: '100%',
        overflowY: 'auto',
        // Ignore top margin on the first element.
        '& :first-of-type': {
            marginTop: 0
        },
        // Styles for headers
        '& h1': {
            fontSize: '2em'
        },
        // Styles for <code>
        '& code': {
            fontSize: '0.85em'
        },
        '& :not(pre) code': {
            padding: '0.2em 0.4em',
            backgroundColor: theme.palette.grey[100],
            borderRadius: '4px'
        },
        '& pre': {
            padding: '1.2em',
            backgroundColor: theme.palette.grey[100],
            borderRadius: '4px'
        },
        // Styles for <table>
        '& table, & th, & td': {
            padding: '0.6em',
            border: `1px solid ${theme.palette.grey[300]}`,
            borderCollapse: 'collapse'
        },
        // Styles for <li>
        '& li + li': {
            marginTop: '0.25em'
        },
        // Styles for <a>
        '& a': {
            color: theme.palette.primary.main
        }
    };
}
// Convert markdown to HTML
// Supports original markdown and GitHub Flavored markdown
function markdownToHTML(text) {
    return _marked.marked.parse(text, {
        gfm: true,
        async: false
    });
}
// Prevent XSS attacks by removing the vectors for attacks
function sanitizeHTML(html) {
    return _dompurify.default.sanitize(html);
}
function MarkdownPanel(props) {
    const { spec: { text } } = props;
    const chartsTheme = (0, _components.useChartsTheme)();
    const textAfterVariableReplacement = (0, _pluginsystem.useReplaceVariablesInString)(text);
    const html = (0, _react.useMemo)(()=>markdownToHTML(textAfterVariableReplacement ?? ''), [
        textAfterVariableReplacement
    ]);
    const sanitizedHTML = (0, _react.useMemo)(()=>sanitizeHTML(html), [
        html
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
        sx: (theme)=>createMarkdownPanelStyles(theme, chartsTheme),
        dangerouslySetInnerHTML: {
            __html: sanitizedHTML
        }
    });
}
