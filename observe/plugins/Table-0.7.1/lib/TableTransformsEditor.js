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
import { jsx as _jsx } from "react/jsx-runtime";
import { TransformsEditor } from '@perses-dev/components';
export function TableTransformsEditor({ value, onChange }) {
    function handleTransformsChange(transforms) {
        onChange({
            ...value,
            transforms: transforms
        });
    }
    return /*#__PURE__*/ _jsx(TransformsEditor, {
        value: value.transforms ?? [],
        onChange: handleTransformsChange
    });
}

//# sourceMappingURL=TableTransformsEditor.js.map