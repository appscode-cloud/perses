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
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DEFAULT_PROM: function() {
        return DEFAULT_PROM;
    },
    PROM_DATASOURCE_KIND: function() {
        return PROM_DATASOURCE_KIND;
    },
    isDefaultPromSelector: function() {
        return isDefaultPromSelector;
    },
    isPrometheusDatasourceSelector: function() {
        return isPrometheusDatasourceSelector;
    }
});
const _pluginsystem = require("@perses-dev/plugin-system");
const PROM_DATASOURCE_KIND = 'PrometheusDatasource';
const DEFAULT_PROM = {
    kind: PROM_DATASOURCE_KIND
};
function isDefaultPromSelector(datasourceSelectValue) {
    return !(0, _pluginsystem.isVariableDatasource)(datasourceSelectValue) && datasourceSelectValue.name === undefined;
}
function isPrometheusDatasourceSelector(datasourceSelectValue) {
    return (0, _pluginsystem.isVariableDatasource)(datasourceSelectValue) || datasourceSelectValue.kind === PROM_DATASOURCE_KIND;
}
