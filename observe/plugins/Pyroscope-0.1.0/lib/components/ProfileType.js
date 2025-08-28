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
import { Stack, TextField, MenuItem, CircularProgress } from '@mui/material';
import { useProfileTypes } from '../utils/use-query';
export function ProfileType(props) {
    const { datasource, value, onChange } = props;
    const { data: profileTypesOptions, isLoading: isProfileTypesOptionsLoading } = useProfileTypes(datasource);
    return /*#__PURE__*/ _jsx(Stack, {
        position: "relative",
        sx: {
            flexGrow: 1,
            maxWidth: '100%'
        },
        children: /*#__PURE__*/ _jsx(TextField, {
            select: true,
            label: "Profile Type",
            value: value,
            size: "small",
            onChange: (event)=>onChange?.(event.target.value),
            children: isProfileTypesOptionsLoading ? /*#__PURE__*/ _jsx(Stack, {
                width: "100%",
                sx: {
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                children: /*#__PURE__*/ _jsx(CircularProgress, {
                    color: "inherit",
                    size: 20
                })
            }) : profileTypesOptions?.profileTypes && profileTypesOptions?.profileTypes.map((type)=>/*#__PURE__*/ _jsx(MenuItem, {
                    value: type.ID,
                    children: type.name + '/' + type.sampleType
                }, type.ID))
        })
    });
}

//# sourceMappingURL=ProfileType.js.map