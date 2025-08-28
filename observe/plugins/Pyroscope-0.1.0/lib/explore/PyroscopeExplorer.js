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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Stack } from '@mui/material';
import { DataQueriesProvider, MultiQueryEditor } from '@perses-dev/plugin-system';
import { Panel } from '@perses-dev/dashboards';
import { useExplorerManagerContext } from '@perses-dev/explore';
const initialSpec = {
    palette: 'package-name',
    showSettings: true,
    showSeries: true,
    showTable: true,
    showFlameGraph: true
};
function FlameGraphPanel({ queries }) {
    return /*#__PURE__*/ _jsx(Panel, {
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
export function PyroscopeExplorer() {
    const { data: { queries = [] }, setData } = useExplorerManagerContext();
    // map ProfileQueryDefinition to Definition<UnknownSpec>
    const definitions = queries.length ? queries.map((query)=>{
        return {
            kind: query.spec.plugin.kind,
            spec: query.spec.plugin.spec
        };
    }) : [];
    return /*#__PURE__*/ _jsxs(Stack, {
        gap: 2,
        sx: {
            width: '100%'
        },
        children: [
            /*#__PURE__*/ _jsx(MultiQueryEditor, {
                queryTypes: [
                    'ProfileQuery'
                ],
                onChange: (newQueries)=>setData({
                        queries: newQueries
                    }),
                queries: queries
            }),
            /*#__PURE__*/ _jsx(DataQueriesProvider, {
                definitions: definitions,
                children: /*#__PURE__*/ _jsx(Box, {
                    height: 980,
                    children: /*#__PURE__*/ _jsx(FlameGraphPanel, {
                        queries: queries
                    })
                })
            })
        ]
    });
}

//# sourceMappingURL=PyroscopeExplorer.js.map