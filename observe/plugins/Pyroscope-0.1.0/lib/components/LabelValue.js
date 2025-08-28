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
import { jsx as _jsx } from "react/jsx-runtime";
import { Select, MenuItem, CircularProgress, Stack } from '@mui/material';
import { useLabelValues } from '../utils/use-query';
export function LabelValue(props) {
    const { datasource, value, labelName, onChange } = props;
    const { data: labelValuesOptions, isLoading: isLabelValuesOptionsLoading } = useLabelValues(datasource, labelName);
    return /*#__PURE__*/ _jsx(Select, {
        sx: {
            borderRadius: '0'
        },
        value: value,
        size: "small",
        onChange: (event)=>onChange?.(event.target.value),
        displayEmpty: true,
        disabled: !labelName || labelName === '',
        renderValue: (selected)=>{
            if (selected === '') {
                return 'Select label value';
            }
            return selected;
        },
        children: isLabelValuesOptionsLoading ? /*#__PURE__*/ _jsx(Stack, {
            width: "100%",
            sx: {
                alignItems: 'center',
                justifyContent: 'center'
            },
            children: /*#__PURE__*/ _jsx(CircularProgress, {
                color: "inherit",
                size: 20
            })
        }) : labelValuesOptions?.names && labelValuesOptions?.names.map((labelValue)=>/*#__PURE__*/ _jsx(MenuItem, {
                value: labelValue,
                children: labelValue
            }, labelValue))
    });
}

//# sourceMappingURL=LabelValue.js.map