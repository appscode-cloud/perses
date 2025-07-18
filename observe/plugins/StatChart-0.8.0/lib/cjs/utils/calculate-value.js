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
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "calculateValue", {
    enumerable: true,
    get: function() {
        return calculateValue;
    }
});
const _core = require("@perses-dev/core");
const calculateValue = (calculation, seriesData)=>{
    if (_core.CalculationsMap[calculation] === undefined) {
        console.warn(`Invalid StatChart panel calculation ${calculation}, fallback to ${_core.DEFAULT_CALCULATION}`);
    }
    const calculate = _core.CalculationsMap[calculation] ?? _core.CalculationsMap[_core.DEFAULT_CALCULATION];
    return calculate(seriesData.values);
};
