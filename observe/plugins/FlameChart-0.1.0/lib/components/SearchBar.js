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
import { TextField, InputAdornment, Chip } from '@mui/material';
import Magnify from 'mdi-material-ui/Magnify';
export function SearchBar(props) {
    const { searchValue, onSearchValueChange } = props;
    return /*#__PURE__*/ _jsx(TextField, {
        size: "small",
        variant: "outlined",
        placeholder: "Search...",
        fullWidth: true,
        value: searchValue,
        onChange: (event)=>onSearchValueChange(event.target.value),
        slotProps: {
            input: {
                startAdornment: /*#__PURE__*/ _jsx(InputAdornment, {
                    position: "start",
                    children: /*#__PURE__*/ _jsx(Magnify, {
                        fontSize: "small"
                    })
                }),
                endAdornment: searchValue !== '' && /*#__PURE__*/ _jsx(InputAdornment, {
                    position: "end",
                    children: /*#__PURE__*/ _jsx(Chip, {
                        label: "Clear",
                        size: "small",
                        onClick: ()=>onSearchValueChange('')
                    })
                })
            }
        }
    });
}

//# sourceMappingURL=SearchBar.js.map