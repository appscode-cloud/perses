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
import { produce } from 'immer';
/**
 * Hook to manage `palette` state.
 */ export function usePaletteState(props) {
    const { onChange, value } = props;
    const handlePaletteChange = (newPalette)=>{
        onChange(produce(value, (draft)=>{
            draft.palette = newPalette;
        }));
    };
    return {
        handlePaletteChange
    };
}
/**
 * Hook to manage `showSettings` state.
 */ export function useShowSettingsState(props) {
    const { onChange, value } = props;
    const handleShowSettingsChange = (newValue)=>{
        onChange(produce(value, (draft)=>{
            draft.showSettings = newValue;
        }));
    };
    return {
        handleShowSettingsChange
    };
}
/**
 * Hook to manage `showSeries` state.
 */ export function useShowSeriesState(props) {
    const { onChange, value } = props;
    const handleShowSeriesChange = (newValue)=>{
        onChange(produce(value, (draft)=>{
            draft.showSeries = newValue;
        }));
    };
    return {
        handleShowSeriesChange
    };
}
/**
 * Hook to manage `showTable` state.
 */ export function useShowTableState(props) {
    const { onChange, value } = props;
    const handleShowTableChange = (newValue)=>{
        onChange(produce(value, (draft)=>{
            draft.showTable = newValue;
        }));
    };
    return {
        handleShowTableChange
    };
}
/**
 * Hook to manage `showFlameGraph` state.
 */ export function useShowFlameGraphState(props) {
    const { onChange, value } = props;
    const handleShowFlameGraphChange = (newValue)=>{
        onChange(produce(value, (draft)=>{
            draft.showFlameGraph = newValue;
        }));
    };
    return {
        handleShowFlameGraphChange
    };
}
/**
 * Reset all settings to their initial values
 */ export function resetSettings(props) {
    const { onChange, value } = props;
    onChange(produce(value, (draft)=>{
        draft.palette = 'package-name';
        draft.showSettings = true;
        draft.showSeries = false;
        draft.showTable = true;
        draft.showFlameGraph = true;
    }));
}

//# sourceMappingURL=utils.js.map