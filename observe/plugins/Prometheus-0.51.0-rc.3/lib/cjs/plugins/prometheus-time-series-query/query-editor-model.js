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
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    useFormatState: function() {
        return useFormatState;
    },
    useMinStepState: function() {
        return useMinStepState;
    },
    useQueryState: function() {
        return useQueryState;
    }
});
const _react = require("react");
const _immer = require("immer");
function useQueryState(props) {
    const { onChange, value } = props;
    // Local copy of the query's value
    const [query, setQuery] = (0, _react.useState)(value.query);
    // This is basically "getDerivedStateFromProps" to make sure if spec's value changes external to this component,
    // we render with the latest value
    const [lastSyncedQuery, setLastSyncedQuery] = (0, _react.useState)(value.query);
    if (value.query !== lastSyncedQuery) {
        setQuery(value.query);
        setLastSyncedQuery(value.query);
    }
    // Update our local state's copy as the user types
    const handleQueryChange = (e)=>{
        setQuery(e);
    };
    // Propagate changes to the query's value when the input is blurred to avoid constantly re-running queries in the
    // PanelPreview
    const handleQueryBlur = ()=>{
        setLastSyncedQuery(query);
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.query = query;
        }));
    };
    return {
        query,
        handleQueryChange,
        handleQueryBlur
    };
}
function useFormatState(props) {
    const { onChange, value } = props;
    // TODO: reusable hook or helper util instead of duplicating from useQueryState
    const [format, setFormat] = (0, _react.useState)(value.seriesNameFormat);
    const [lastSyncedFormat, setLastSyncedFormat] = (0, _react.useState)(value.seriesNameFormat);
    if (value.seriesNameFormat !== lastSyncedFormat) {
        setFormat(value.seriesNameFormat);
        setLastSyncedFormat(value.seriesNameFormat);
    }
    // Update our local state as the user types
    const handleFormatChange = (e)=>{
        setFormat(e);
    };
    // Propagate changes to the panel preview component when seriesNameFormat TextField is blurred
    const handleFormatBlur = ()=>{
        setLastSyncedFormat(format);
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.seriesNameFormat = format;
        }));
    };
    return {
        format,
        handleFormatChange,
        handleFormatBlur
    };
}
function useMinStepState(props) {
    const { onChange, value } = props;
    // TODO: reusable hook or helper util instead of duplicating from useQueryState
    const [minStep, setMinStep] = (0, _react.useState)(value.minStep);
    const [lastSyncedMinStep, setLastSyncedMinStep] = (0, _react.useState)(value.minStep);
    if (value.minStep !== lastSyncedMinStep) {
        setMinStep(value.minStep);
        setLastSyncedMinStep(value.minStep);
    }
    // Update our local state as the user types
    const handleMinStepChange = (e)=>{
        setMinStep(e);
    };
    // Propagate changes to the panel preview component when minStep TextField is blurred
    const handleMinStepBlur = ()=>{
        setLastSyncedMinStep(minStep);
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.minStep = minStep;
        }));
    };
    return {
        minStep,
        handleMinStepChange,
        handleMinStepBlur
    };
}
