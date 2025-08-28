// Copyright 2024 The Perses Authors
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
    JobList: function() {
        return JobList;
    },
    JobSection: function() {
        return JobSection;
    },
    JobTab: function() {
        return JobTab;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _react = require("react");
const _MetricList = require("../../display/list/MetricList");
const _utils = require("../../utils");
function JobList({ job, filters, datasource, isMetadataEnabled, onExplore, ...props }) {
    const filtersWithJobWithoutName = (0, _react.useMemo)(()=>{
        const result = filters.filter((filter)=>filter.label !== '__name__' && filter.label !== 'job');
        result.push({
            label: 'job',
            labelValues: [
                job
            ],
            operator: '='
        });
        return result;
    }, [
        filters,
        job
    ]);
    const { data, isLoading } = (0, _utils.useLabelValues)('__name__', filtersWithJobWithoutName, datasource);
    if (isLoading) {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Stack, {
            width: "100%",
            sx: {
                alignItems: 'center',
                justifyContent: 'center'
            },
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.CircularProgress, {})
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_MetricList.MetricList, {
        metricNames: data?.data ?? [],
        datasource: datasource,
        filters: filtersWithJobWithoutName,
        isMetadataEnabled: isMetadataEnabled,
        onExplore: onExplore,
        ...props
    });
}
function JobSection({ jobs, filters, datasource, isMetadataEnabled, onExplore, ...props }) {
    const [currentJob, setCurrentJob] = (0, _react.useState)(jobs[0] ?? '');
    if (!currentJob) {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
            children: "Something went wrong..."
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        gap: 2,
        ...props,
        children: [
            jobs.length > 2 && /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.FormControl, {
                fullWidth: true,
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.InputLabel, {
                        id: "job-select-label",
                        children: "Job"
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Select, {
                        labelId: "job-select-label",
                        id: "job-select",
                        label: "Job",
                        variant: "outlined",
                        value: currentJob,
                        onChange: (e)=>setCurrentJob(e.target.value),
                        children: jobs.map((job)=>/*#__PURE__*/ (0, _jsxruntime.jsx)(_material.MenuItem, {
                                value: job,
                                children: job
                            }, job))
                    })
                ]
            }),
            currentJob && /*#__PURE__*/ (0, _jsxruntime.jsx)(JobList, {
                job: currentJob,
                filters: filters,
                datasource: datasource,
                isMetadataEnabled: isMetadataEnabled,
                onExplore: onExplore
            })
        ]
    });
}
function JobTab({ filters, datasource, isMetadataEnabled, onExplore, ...props }) {
    const { data: jobData, isLoading: isJobLoading } = (0, _utils.useLabelValues)('job', filters, datasource);
    if (isJobLoading) {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Stack, {
            width: "100%",
            sx: {
                alignItems: 'center',
                justifyContent: 'center'
            },
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.CircularProgress, {})
        });
    }
    if (!jobData?.data || jobData.data.length === 0) {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Stack, {
            ...props,
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                children: "No jobs found"
            })
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(JobSection, {
        jobs: jobData.data,
        filters: filters,
        datasource: datasource,
        isMetadataEnabled: isMetadataEnabled,
        onExplore: onExplore,
        ...props
    });
}
