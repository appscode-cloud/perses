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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { HTTPSettingsEditor } from '@perses-dev/plugin-system';
import { TextField, Typography } from '@mui/material';
import React from 'react';
import { DEFAULT_SCRAPE_INTERVAL } from './types';
export function PrometheusDatasourceEditor(props) {
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
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            /*#__PURE__*/ _jsx(Typography, {
                variant: "h4",
                mb: 2,
                children: "General Settings"
            }),
            /*#__PURE__*/ _jsx(TextField, {
                fullWidth: true,
                label: "Scrape Interval",
                value: value.scrapeInterval || '',
                placeholder: `Default: ${DEFAULT_SCRAPE_INTERVAL}`,
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
            /*#__PURE__*/ _jsx(HTTPSettingsEditor, {
                value: value,
                onChange: onChange,
                isReadonly: isReadonly,
                initialSpecDirect: initialSpecDirect,
                initialSpecProxy: initialSpecProxy
            })
        ]
    });
}

//# sourceMappingURL=PrometheusDatasourceEditor.js.map