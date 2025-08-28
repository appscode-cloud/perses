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
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MatcherEditor", {
    enumerable: true,
    get: function() {
        return MatcherEditor;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _immer = require("immer");
const _TrashCan = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/TrashCan"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function MatcherEditor({ matchers, onChange, isReadonly }) {
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        spacing: 1,
        mb: 2,
        children: [
            matchers.map((matcher, index)=>/*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Box, {
                    display: "flex",
                    children: [
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
                            fullWidth: true,
                            label: "Series Selector",
                            value: matcher,
                            InputProps: {
                                readOnly: isReadonly
                            },
                            onChange: (e)=>{
                                const newMatchers = (0, _immer.produce)(matchers, (draft)=>{
                                    draft[index] = e.target.value;
                                });
                                onChange(newMatchers);
                            }
                        }),
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.IconButton, {
                            onClick: ()=>{
                                const newMatchers = (0, _immer.produce)(matchers, (draft)=>{
                                    draft.splice(index, 1);
                                });
                                onChange(newMatchers);
                            },
                            disabled: isReadonly,
                            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_TrashCan.default, {})
                        })
                    ]
                }, index)),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Button, {
                    fullWidth: false,
                    color: "secondary",
                    variant: "outlined",
                    onClick: ()=>{
                        const newMatchers = (0, _immer.produce)(matchers, (draft)=>{
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
