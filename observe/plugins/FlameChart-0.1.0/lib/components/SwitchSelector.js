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
import { jsx as _jsx } from "react/jsx-runtime";
import { OptionsEditorControl } from '@perses-dev/components';
import { Switch } from '@mui/material';
export function SwitchSelector({ onChange, value, label }) {
    const handleValuesChange = (_, checked)=>{
        onChange(checked);
    };
    return /*#__PURE__*/ _jsx(OptionsEditorControl, {
        label: label,
        control: /*#__PURE__*/ _jsx(Switch, {
            checked: value,
            onChange: handleValuesChange
        })
    });
}

//# sourceMappingURL=SwitchSelector.js.map