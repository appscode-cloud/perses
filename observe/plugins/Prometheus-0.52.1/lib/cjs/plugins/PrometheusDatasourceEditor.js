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
Object.defineProperty(exports, "PrometheusDatasourceEditor", {
    enumerable: true,
    get: function() {
        return PrometheusDatasourceEditor;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _pluginsystem = require("@perses-dev/plugin-system");
const _material = require("@mui/material");
const _react = /*#__PURE__*/ _interop_require_default(require("react"));
const _types = require("./types");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function PrometheusDatasourceEditor(props) {
    const { value, onChange, isReadonly } = props;
    const initialSpecDirect = {
        directUrl: ''
    };
    const initialSpecProxy = {
        proxy: {
            kind: 'HTTPProxy',
            spec: {
                allowedEndpoints: [
                    // list of standard endpoints suggested by default
                    {
                        endpointPattern: '/api/v1/labels',
                        method: 'POST'
                    },
                    {
                        endpointPattern: '/api/v1/series',
                        method: 'POST'
                    },
                    {
                        endpointPattern: '/api/v1/metadata',
                        method: 'GET'
                    },
                    {
                        endpointPattern: '/api/v1/query',
                        method: 'POST'
                    },
                    {
                        endpointPattern: '/api/v1/query_range',
                        method: 'POST'
                    },
                    {
                        endpointPattern: '/api/v1/label/([a-zA-Z0-9_-]+)/values',
                        method: 'GET'
                    },
                    {
                        endpointPattern: '/api/v1/parse_query',
                        method: 'POST'
                    }
                ],
                url: ''
            }
        }
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                variant: "h4",
                mb: 2,
                children: "General Settings"
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
                fullWidth: true,
                label: "Scrape Interval",
                value: value.scrapeInterval || '',
                placeholder: `Default: ${_types.DEFAULT_SCRAPE_INTERVAL}`,
                InputProps: {
                    readOnly: isReadonly
                },
                InputLabelProps: {
                    shrink: isReadonly ? true : undefined
                },
                onChange: (e)=>onChange({
                        ...value,
                        scrapeInterval: e.target.value
                    })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.HTTPSettingsEditor, {
                value: value,
                onChange: onChange,
                isReadonly: isReadonly,
                initialSpecDirect: initialSpecDirect,
                initialSpecProxy: initialSpecProxy
            })
        ]
    });
}
