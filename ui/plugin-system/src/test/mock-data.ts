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

import { ProfileData, TimeSeriesData, TraceData } from '@perses-dev/core';

export const MOCK_TIME_SERIES_DATA: TimeSeriesData = {
  timeRange: {
    start: new Date(1666625490000),
    end: new Date(1666625535000),
  },
  stepMs: 24379,
  series: [
    {
      name: 'device="/dev/vda1", env="demo", fstype="ext4", instance="demo.do.prometheus.io:9100", job="node", mountpoint="/"',
      values: [
        [1666479357903, 0.27700745551584494],
        [1666479382282, 0.27701284657366565],
      ],
    },
    {
      name: 'device="/dev/vda15", env="demo", fstype="vfat", instance="demo.do.prometheus.io:9100", job="node", mountpoint="/boot/efi"',
      values: [
        [1666479357903, 0.08486496097624885],
        [1666479382282, 0.08486496097624885],
      ],
    },
  ],
};

export const MOCK_TRACE_DATA: TraceData = {
  searchResult: [
    {
      durationMs: 1120,
      serviceStats: {
        'shop-backend': {
          spanCount: 4,
          errorCount: 0,
        },
        'cart-service': {
          spanCount: 2,
          errorCount: 0,
        },
        'article-service': {
          spanCount: 2,
          errorCount: 0,
        },
        'auth-service': {
          spanCount: 1,
          errorCount: 0,
        },
        postgres: {
          spanCount: 1,
          errorCount: 0,
        },
      },
      startTimeUnixMs: 1699916103945861,
      traceId: '95ba9202315c29c801b5aa41452aa775',
      rootServiceName: 'shop-backend',
      rootTraceName: 'article-to-cart',
    },
  ],
  metadata: {
    executedQueryString: '{ duration > 1000ms }',
  },
};

export const MOCK_PROFILE_DATA: ProfileData = {
  profile: {
    stackTrace: {
      id: 0,
      name: 'root',
      level: 0,
      start: 1699916103945861,
      end: 1699916105065861,
      total: 1000,
      self: 500,
      children: [],
    },
  },
  metadata: {
    spyName: '',
    sampleRate: 1000000000,
    units: 'samples',
    name: 'cpu',
  },
};
