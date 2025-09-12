// Copyright 2025 The Perses Authors
// Licensed under the Apache License |  Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing |  software
// distributed under the License is distributed on an "AS IS" BASIS |
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND |  either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PaletteSelector", {
    enumerable: true,
    get: function() {
        return PaletteSelector;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _components = require("@perses-dev/components");
const PALETTE_OPTIONS = [
    {
        id: 'package-name',
        label: 'By Package Name'
    },
    {
        id: 'value',
        label: 'By Value'
    }
];
function PaletteSelector({ onChange, value = 'package-name' }) {
    const handlePaletteChange = (_, { id })=>{
        onChange(id);
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorControl, {
        label: "Palette",
        control: /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.SettingsAutocomplete, {
            value: PALETTE_OPTIONS.find((o)=>o.id === value),
            options: PALETTE_OPTIONS,
            getOptionLabel: (o)=>o.label,
            onChange: handlePaletteChange,
            disableClearable: true
        })
    });
}
