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
    useFiltersState: function() {
        return useFiltersState;
    },
    useMaxNodesState: function() {
        return useMaxNodesState;
    },
    useProfileTypeState: function() {
        return useProfileTypeState;
    },
    useServiceState: function() {
        return useServiceState;
    }
});
const _react = require("react");
const _immer = require("immer");
function useMaxNodesState(props) {
    const { onChange, value } = props;
    const [maxNodes, setMaxNodes] = (0, _react.useState)(value.maxNodes ? value.maxNodes.toString() : '');
    const [lastSyncedMaxNodes, setLastSyncedMaxNodes] = (0, _react.useState)(value.maxNodes);
    if (value.maxNodes !== lastSyncedMaxNodes) {
        setMaxNodes(value.maxNodes ? value.maxNodes.toString() : '');
        setLastSyncedMaxNodes(value.maxNodes);
    }
    // maxNodes must be empty or an integer between 0 and max_flamegraph_nodes_max (0 < maxNodes <= max_flamegraph_nodes_max)
    // what is the actual value of max_flamegraph_nodes_max?
    // todo: add a constraint to the maxNodes related to max_flamegraph_nodes_max
    const maxNodesHasError = !(maxNodes === '' || /^[0-9]+$/.test(maxNodes) && parseInt(maxNodes) > 0);
    // Update our local state as the user types
    const handleMaxNodesChange = (e)=>{
        setMaxNodes(e);
        // Propagate changes to the panel immediately
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.maxNodes = e === '' ? undefined : parseInt(e);
        }));
    };
    return {
        maxNodes,
        handleMaxNodesChange,
        maxNodesHasError
    };
}
function useProfileTypeState(props) {
    const { onChange, value } = props;
    const [profileType, setProfileType] = (0, _react.useState)(value.profileType ? value.profileType : '');
    const [lastSyncedProfileType, setLastSyncedProfileType] = (0, _react.useState)(value.profileType);
    if (value.profileType !== lastSyncedProfileType) {
        setProfileType(value.profileType);
        setLastSyncedProfileType(value.profileType);
    }
    // Update our local state as the user types
    const handleProfileTypeChange = (e)=>{
        setProfileType(e);
        // Propagate changes to the panel immediately
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.profileType = e;
        }));
    };
    return {
        profileType,
        handleProfileTypeChange
    };
}
function useServiceState(props) {
    const { onChange, value } = props;
    const [service, setService] = (0, _react.useState)(value.service ? value.service : '');
    const [lastSyncedService, setLastSyncedService] = (0, _react.useState)(value.service);
    if (value.service !== lastSyncedService) {
        setService(value.service || '');
        setLastSyncedService(value.service);
    }
    // Update our local state as the user types
    const handleServiceChange = (e)=>{
        setService(e);
        // Propagate changes to the panel immediately
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.service = e;
        }));
    };
    return {
        service,
        handleServiceChange
    };
}
function useFiltersState(props) {
    const { onChange, value } = props;
    const [filters, setFilters] = (0, _react.useState)(value.filters ? value.filters : []);
    const handleFiltersChange = (f)=>{
        setFilters(f);
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.filters = f;
        }));
    };
    return {
        filters,
        handleFiltersChange
    };
}
