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
Object.defineProperty(exports, "PyroscopeExplorer", {
    enumerable: true,
    get: function() {
        return PyroscopeExplorer;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _pluginsystem = require("@perses-dev/plugin-system");
const _dashboards = require("@perses-dev/dashboards");
const _explore = require("@perses-dev/explore");
const initialSpec = {
    palette: 'package-name',
    showSettings: true,
    showSeries: true,
    showTable: true,
    showFlameGraph: true
};
function FlameGraphPanel({ queries }) {
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_dashboards.Panel, {
        panelOptions: {
            hideHeader: true
        },
        definition: {
            kind: 'Panel',
            spec: {
                queries,
                display: {
                    name: ''
                },
                plugin: {
                    kind: 'FlameChart',
                    spec: initialSpec
                }
            }
        }
    });
}
function PyroscopeExplorer() {
    const { data: { queries = [] }, setData } = (0, _explore.useExplorerManagerContext)();
    // map ProfileQueryDefinition to Definition<UnknownSpec>
    const definitions = queries.length ? queries.map((query)=>{
        return {
            kind: query.spec.plugin.kind,
            spec: query.spec.plugin.spec
        };
    }) : [];
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        gap: 2,
        sx: {
            width: '100%'
        },
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.MultiQueryEditor, {
                queryTypes: [
                    'ProfileQuery'
                ],
                onChange: (newQueries)=>setData({
                        queries: newQueries
                    }),
                queries: queries
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.DataQueriesProvider, {
                definitions: definitions,
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                    height: 980,
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(FlameGraphPanel, {
                        queries: queries
                    })
                })
            })
        ]
    });
}
