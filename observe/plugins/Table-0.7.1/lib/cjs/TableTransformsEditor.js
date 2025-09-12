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
Object.defineProperty(exports, "TableTransformsEditor", {
    enumerable: true,
    get: function() {
        return TableTransformsEditor;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _components = require("@perses-dev/components");
function TableTransformsEditor({ value, onChange }) {
    function handleTransformsChange(transforms) {
        onChange({
            ...value,
            transforms: transforms
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.TransformsEditor, {
        value: value.transforms ?? [],
        onChange: handleTransformsChange
    });
}
