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
import { Stack } from '@mui/material';
import { LabelName } from './LabelName';
import { Operator } from './Operator';
import { LabelValue } from './LabelValue';
import { DeleteFilterItem } from './DeleteFilterItem';
export function FilterItem(props) {
    const { datasource, value, onChange, deleteItem } = props;
    const handleLabelNameChange = (label)=>{
        onChange?.({
            labelName: label,
            labelValue: '',
            operator: value.operator
        });
    };
    const handleOperatorChange = (op)=>{
        onChange?.({
            labelName: value.labelName,
            labelValue: value.labelValue,
            operator: op
        });
    };
    const handleLabelValueChange = (val)=>{
        onChange?.({
            labelName: value.labelName,
            labelValue: val,
            operator: value.operator
        });
    };
    const handleDeleteClick = ()=>{
        deleteItem?.();
    };
    return /*#__PURE__*/ _jsxs(Stack, {
        direction: "row",
        spacing: 0,
        sx: {
            flexWrap: 'wrap',
            maxWidth: '100%'
        },
        children: [
            /*#__PURE__*/ _jsx(LabelName, {
                datasource: datasource,
                value: value.labelName,
                onChange: handleLabelNameChange
            }),
            /*#__PURE__*/ _jsx(Operator, {
                value: value.operator,
                onChange: handleOperatorChange
            }),
            /*#__PURE__*/ _jsx(LabelValue, {
                datasource: datasource,
                value: value.labelValue,
                labelName: value.labelName,
                onChange: handleLabelValueChange
            }),
            /*#__PURE__*/ _jsx(DeleteFilterItem, {
                onClick: handleDeleteClick
            })
        ]
    });
}

//# sourceMappingURL=FilterItem.js.map