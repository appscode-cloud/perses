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
    DEFAULT_AREA_OPACITY: function() {
        return DEFAULT_AREA_OPACITY;
    },
    DEFAULT_CONNECT_NULLS: function() {
        return DEFAULT_CONNECT_NULLS;
    },
    DEFAULT_FORMAT: function() {
        return DEFAULT_FORMAT;
    },
    DEFAULT_LINE_WIDTH: function() {
        return DEFAULT_LINE_WIDTH;
    },
    DEFAULT_POINT_RADIUS: function() {
        return DEFAULT_POINT_RADIUS;
    },
    DEFAULT_VISUAL: function() {
        return DEFAULT_VISUAL;
    },
    DEFAULT_Y_AXIS: function() {
        return DEFAULT_Y_AXIS;
    },
    NEGATIVE_MIN_VALUE_MULTIPLIER: function() {
        return NEGATIVE_MIN_VALUE_MULTIPLIER;
    },
    POINT_SIZE_OFFSET: function() {
        return POINT_SIZE_OFFSET;
    },
    POSITIVE_MIN_VALUE_MULTIPLIER: function() {
        return POSITIVE_MIN_VALUE_MULTIPLIER;
    },
    STACK_CONFIG: function() {
        return STACK_CONFIG;
    },
    STACK_OPTIONS: function() {
        return STACK_OPTIONS;
    },
    THRESHOLD_PLOT_INTERVAL: function() {
        return THRESHOLD_PLOT_INTERVAL;
    },
    VISUAL_CONFIG: function() {
        return VISUAL_CONFIG;
    },
    Y_AXIS_CONFIG: function() {
        return Y_AXIS_CONFIG;
    },
    createInitialTimeSeriesChartOptions: function() {
        return createInitialTimeSeriesChartOptions;
    }
});
const DEFAULT_FORMAT = {
    unit: 'decimal',
    shortValues: true
};
const DEFAULT_Y_AXIS = {
    show: true,
    label: '',
    format: DEFAULT_FORMAT,
    min: undefined,
    max: undefined
};
const Y_AXIS_CONFIG = {
    show: {
        label: 'Show'
    },
    label: {
        label: 'Label'
    },
    unit: {
        label: 'Unit'
    },
    min: {
        label: 'Min'
    },
    max: {
        label: 'Max'
    }
};
const DEFAULT_LINE_WIDTH = 1.25;
const DEFAULT_AREA_OPACITY = 0;
const POINT_SIZE_OFFSET = 1.5;
const DEFAULT_POINT_RADIUS = DEFAULT_LINE_WIDTH + POINT_SIZE_OFFSET;
const DEFAULT_CONNECT_NULLS = false;
const DEFAULT_VISUAL = {
    lineWidth: DEFAULT_LINE_WIDTH,
    areaOpacity: DEFAULT_AREA_OPACITY,
    pointRadius: DEFAULT_POINT_RADIUS,
    connectNulls: DEFAULT_CONNECT_NULLS
};
const THRESHOLD_PLOT_INTERVAL = 15;
const VISUAL_CONFIG = {
    lineWidth: {
        label: 'Line Width',
        testId: 'slider-line-width',
        min: 0.25,
        max: 3,
        step: 0.25
    },
    pointRadius: {
        label: 'Point Radius',
        testId: 'slider-point-radius',
        min: 0,
        max: 6,
        step: 0.25
    },
    areaOpacity: {
        label: 'Area Opacity',
        testId: 'slider-area-opacity',
        min: 0,
        max: 1,
        step: 0.05
    },
    stack: {
        label: 'Stack Series'
    },
    connectNulls: {
        label: 'Connect Nulls'
    }
};
const STACK_CONFIG = {
    none: {
        label: 'None'
    },
    all: {
        label: 'All'
    }
};
const STACK_OPTIONS = Object.entries(STACK_CONFIG).map(([id, config])=>{
    return {
        id: id,
        ...config
    };
});
const POSITIVE_MIN_VALUE_MULTIPLIER = 0.8;
const NEGATIVE_MIN_VALUE_MULTIPLIER = 1.2;
function createInitialTimeSeriesChartOptions() {
    return {};
}
