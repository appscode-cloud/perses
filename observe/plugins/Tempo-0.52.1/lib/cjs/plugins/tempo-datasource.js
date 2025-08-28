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
Object.defineProperty(exports, "TempoDatasource", {
    enumerable: true,
    get: function() {
        return TempoDatasource;
    }
});
const _tempoclient = require("../model/tempo-client");
const _TempoDatasourceEditor = require("./TempoDatasourceEditor");
/**
 * Creates a TempoClient for a specific datasource spec.
 */ const createClient = (spec, options)=>{
    const { directUrl, proxy } = spec;
    const { proxyUrl } = options;
    // Use the direct URL if specified, but fallback to the proxyUrl by default if not specified
    const datasourceUrl = directUrl ?? proxyUrl;
    if (datasourceUrl === undefined) {
        throw new Error('No URL specified for Tempo client. You can use directUrl in the spec to configure it.');
    }
    const specHeaders = proxy?.spec.headers;
    return {
        options: {
            datasourceUrl
        },
        query: (params, headers)=>(0, _tempoclient.query)(params, {
                datasourceUrl,
                headers: headers ?? specHeaders
            }),
        search: (params, headers)=>(0, _tempoclient.search)(params, {
                datasourceUrl,
                headers: headers ?? specHeaders
            }),
        searchWithFallback: (params, headers)=>(0, _tempoclient.searchWithFallback)(params, {
                datasourceUrl,
                headers: headers ?? specHeaders
            }),
        searchTags: (params, headers)=>(0, _tempoclient.searchTags)(params, {
                datasourceUrl,
                headers: headers ?? specHeaders
            }),
        searchTagValues: (params, headers)=>(0, _tempoclient.searchTagValues)(params, {
                datasourceUrl,
                headers: headers ?? specHeaders
            })
    };
};
const TempoDatasource = {
    createClient,
    OptionsEditorComponent: _TempoDatasourceEditor.TempoDatasourceEditor,
    createInitialOptions: ()=>({
            directUrl: ''
        })
};
