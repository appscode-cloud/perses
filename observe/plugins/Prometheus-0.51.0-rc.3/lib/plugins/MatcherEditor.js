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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Stack, TextField, Button, Box, IconButton } from '@mui/material';
import { produce } from 'immer';
import TrashIcon from 'mdi-material-ui/TrashCan';
export function MatcherEditor({ matchers, onChange, isReadonly }) {
    return /*#__PURE__*/ _jsxs(Stack, {
        spacing: 1,
        mb: 2,
        children: [
            matchers.map((matcher, index)=>/*#__PURE__*/ _jsxs(Box, {
                    display: "flex",
                    children: [
                        /*#__PURE__*/ _jsx(TextField, {
                            fullWidth: true,
                            label: "Series Selector",
                            value: matcher,
                            InputProps: {
                                readOnly: isReadonly
                            },
                            onChange: (e)=>{
                                const newMatchers = produce(matchers, (draft)=>{
                                    draft[index] = e.target.value;
                                });
                                onChange(newMatchers);
                            }
                        }),
                        /*#__PURE__*/ _jsx(IconButton, {
                            onClick: ()=>{
                                const newMatchers = produce(matchers, (draft)=>{
                                    draft.splice(index, 1);
                                });
                                onChange(newMatchers);
                            },
                            disabled: isReadonly,
                            children: /*#__PURE__*/ _jsx(TrashIcon, {})
                        })
                    ]
                }, index)),
            /*#__PURE__*/ _jsx(Box, {
                children: /*#__PURE__*/ _jsx(Button, {
                    fullWidth: false,
                    color: "secondary",
                    variant: "outlined",
                    onClick: ()=>{
                        const newMatchers = produce(matchers, (draft)=>{
                            draft.push('');
                        });
                        onChange(newMatchers);
                    },
                    disabled: isReadonly,
                    children: "Add Series Selector"
                })
            })
        ]
    });
}

//# sourceMappingURL=MatcherEditor.js.map