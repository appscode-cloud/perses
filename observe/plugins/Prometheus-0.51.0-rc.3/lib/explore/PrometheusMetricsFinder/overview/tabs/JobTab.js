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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { MetricList } from '../../display/list/MetricList';
import { useLabelValues } from '../../utils';
export function JobList({ job, filters, datasource, isMetadataEnabled, onExplore, ...props }) {
    const filtersWithJobWithoutName = useMemo(()=>{
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
    const { data, isLoading } = useLabelValues('__name__', filtersWithJobWithoutName, datasource);
    if (isLoading) {
        return /*#__PURE__*/ _jsx(Stack, {
            width: "100%",
            sx: {
                alignItems: 'center',
                justifyContent: 'center'
            },
            children: /*#__PURE__*/ _jsx(CircularProgress, {})
        });
    }
    return /*#__PURE__*/ _jsx(MetricList, {
        metricNames: data?.data ?? [],
        datasource: datasource,
        filters: filtersWithJobWithoutName,
        isMetadataEnabled: isMetadataEnabled,
        onExplore: onExplore,
        ...props
    });
}
export function JobSection({ jobs, filters, datasource, isMetadataEnabled, onExplore, ...props }) {
    const [currentJob, setCurrentJob] = useState(jobs[0] ?? '');
    if (!currentJob) {
        return /*#__PURE__*/ _jsx(Typography, {
            children: "Something went wrong..."
        });
    }
    return /*#__PURE__*/ _jsxs(Stack, {
        gap: 2,
        ...props,
        children: [
            jobs.length > 2 && /*#__PURE__*/ _jsxs(FormControl, {
                fullWidth: true,
                children: [
                    /*#__PURE__*/ _jsx(InputLabel, {
                        id: "job-select-label",
                        children: "Job"
                    }),
                    /*#__PURE__*/ _jsx(Select, {
                        labelId: "job-select-label",
                        id: "job-select",
                        label: "Job",
                        variant: "outlined",
                        value: currentJob,
                        onChange: (e)=>setCurrentJob(e.target.value),
                        children: jobs.map((job)=>/*#__PURE__*/ _jsx(MenuItem, {
                                value: job,
                                children: job
                            }, job))
                    })
                ]
            }),
            currentJob && /*#__PURE__*/ _jsx(JobList, {
                job: currentJob,
                filters: filters,
                datasource: datasource,
                isMetadataEnabled: isMetadataEnabled,
                onExplore: onExplore
            })
        ]
    });
}
export function JobTab({ filters, datasource, isMetadataEnabled, onExplore, ...props }) {
    const { data: jobData, isLoading: isJobLoading } = useLabelValues('job', filters, datasource);
    if (isJobLoading) {
        return /*#__PURE__*/ _jsx(Stack, {
            width: "100%",
            sx: {
                alignItems: 'center',
                justifyContent: 'center'
            },
            children: /*#__PURE__*/ _jsx(CircularProgress, {})
        });
    }
    if (!jobData?.data || jobData.data.length === 0) {
        return /*#__PURE__*/ _jsx(Stack, {
            ...props,
            children: /*#__PURE__*/ _jsx(Typography, {
                children: "No jobs found"
            })
        });
    }
    return /*#__PURE__*/ _jsx(JobSection, {
        jobs: jobData.data,
        filters: filters,
        datasource: datasource,
        isMetadataEnabled: isMetadataEnabled,
        onExplore: onExplore,
        ...props
    });
}

//# sourceMappingURL=JobTab.js.map