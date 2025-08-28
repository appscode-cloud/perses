// Copyright 2025 The Perses Authors
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
Object.defineProperty(exports, "PyroscopeDatasourceEditor", {
    enumerable: true,
    get: function() {
        return PyroscopeDatasourceEditor;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _pluginsystem = require("@perses-dev/plugin-system");
const _react = /*#__PURE__*/ _interop_require_default(require("react"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function PyroscopeDatasourceEditor(props) {
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
                        endpointPattern: '/pyroscope/render',
                        method: 'GET'
                    },
                    {
                        endpointPattern: '/querier.v1.QuerierService/ProfileTypes',
                        method: 'POST'
                    },
                    {
                        endpointPattern: '/querier.v1.QuerierService/LabelNames',
                        method: 'POST'
                    },
                    {
                        endpointPattern: '/querier.v1.QuerierService/LabelValues',
                        method: 'POST'
                    }
                ],
                url: ''
            }
        }
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.HTTPSettingsEditor, {
        value: value,
        onChange: onChange,
        isReadonly: isReadonly,
        initialSpecDirect: initialSpecDirect,
        initialSpecProxy: initialSpecProxy
    });
}
