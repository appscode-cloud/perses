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
// Forked from https://github.com/prometheus/prometheus/blob/65f610353919b1c7b42d3776c3a95b68046a6bba/web/ui/mantine-ui/src/promql/functionSignatures.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "functionSignatures", {
    enumerable: true,
    get: function() {
        return functionSignatures;
    }
});
const _ast = require("./ast");
const functionSignatures = {
    abs: {
        name: 'abs',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    absent: {
        name: 'absent',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    absent_over_time: {
        name: 'absent_over_time',
        argTypes: [
            _ast.valueType.matrix
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    acos: {
        name: 'acos',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    acosh: {
        name: 'acosh',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    asin: {
        name: 'asin',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    asinh: {
        name: 'asinh',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    atan: {
        name: 'atan',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    atanh: {
        name: 'atanh',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    avg_over_time: {
        name: 'avg_over_time',
        argTypes: [
            _ast.valueType.matrix
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    ceil: {
        name: 'ceil',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    changes: {
        name: 'changes',
        argTypes: [
            _ast.valueType.matrix
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    clamp: {
        name: 'clamp',
        argTypes: [
            _ast.valueType.vector,
            _ast.valueType.scalar,
            _ast.valueType.scalar
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    clamp_max: {
        name: 'clamp_max',
        argTypes: [
            _ast.valueType.vector,
            _ast.valueType.scalar
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    clamp_min: {
        name: 'clamp_min',
        argTypes: [
            _ast.valueType.vector,
            _ast.valueType.scalar
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    cos: {
        name: 'cos',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    cosh: {
        name: 'cosh',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    count_over_time: {
        name: 'count_over_time',
        argTypes: [
            _ast.valueType.matrix
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    day_of_month: {
        name: 'day_of_month',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 1,
        returnType: _ast.valueType.vector
    },
    day_of_week: {
        name: 'day_of_week',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 1,
        returnType: _ast.valueType.vector
    },
    day_of_year: {
        name: 'day_of_year',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 1,
        returnType: _ast.valueType.vector
    },
    days_in_month: {
        name: 'days_in_month',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 1,
        returnType: _ast.valueType.vector
    },
    deg: {
        name: 'deg',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    delta: {
        name: 'delta',
        argTypes: [
            _ast.valueType.matrix
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    deriv: {
        name: 'deriv',
        argTypes: [
            _ast.valueType.matrix
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    exp: {
        name: 'exp',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    floor: {
        name: 'floor',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    histogram_avg: {
        name: 'histogram_avg',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    histogram_count: {
        name: 'histogram_count',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    histogram_fraction: {
        name: 'histogram_fraction',
        argTypes: [
            _ast.valueType.scalar,
            _ast.valueType.scalar,
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    histogram_quantile: {
        name: 'histogram_quantile',
        argTypes: [
            _ast.valueType.scalar,
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    histogram_stddev: {
        name: 'histogram_stddev',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    histogram_stdvar: {
        name: 'histogram_stdvar',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    histogram_sum: {
        name: 'histogram_sum',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    double_exponential_smoothing: {
        name: 'double_exponential_smoothing',
        argTypes: [
            _ast.valueType.matrix,
            _ast.valueType.scalar,
            _ast.valueType.scalar
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    hour: {
        name: 'hour',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 1,
        returnType: _ast.valueType.vector
    },
    idelta: {
        name: 'idelta',
        argTypes: [
            _ast.valueType.matrix
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    increase: {
        name: 'increase',
        argTypes: [
            _ast.valueType.matrix
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    irate: {
        name: 'irate',
        argTypes: [
            _ast.valueType.matrix
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    label_join: {
        name: 'label_join',
        argTypes: [
            _ast.valueType.vector,
            _ast.valueType.string,
            _ast.valueType.string,
            _ast.valueType.string
        ],
        variadic: -1,
        returnType: _ast.valueType.vector
    },
    label_replace: {
        name: 'label_replace',
        argTypes: [
            _ast.valueType.vector,
            _ast.valueType.string,
            _ast.valueType.string,
            _ast.valueType.string,
            _ast.valueType.string
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    last_over_time: {
        name: 'last_over_time',
        argTypes: [
            _ast.valueType.matrix
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    ln: {
        name: 'ln',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    log10: {
        name: 'log10',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    log2: {
        name: 'log2',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    mad_over_time: {
        name: 'mad_over_time',
        argTypes: [
            _ast.valueType.matrix
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    max_over_time: {
        name: 'max_over_time',
        argTypes: [
            _ast.valueType.matrix
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    min_over_time: {
        name: 'min_over_time',
        argTypes: [
            _ast.valueType.matrix
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    minute: {
        name: 'minute',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 1,
        returnType: _ast.valueType.vector
    },
    month: {
        name: 'month',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 1,
        returnType: _ast.valueType.vector
    },
    pi: {
        name: 'pi',
        argTypes: [],
        variadic: 0,
        returnType: _ast.valueType.scalar
    },
    predict_linear: {
        name: 'predict_linear',
        argTypes: [
            _ast.valueType.matrix,
            _ast.valueType.scalar
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    present_over_time: {
        name: 'present_over_time',
        argTypes: [
            _ast.valueType.matrix
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    quantile_over_time: {
        name: 'quantile_over_time',
        argTypes: [
            _ast.valueType.scalar,
            _ast.valueType.matrix
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    rad: {
        name: 'rad',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    rate: {
        name: 'rate',
        argTypes: [
            _ast.valueType.matrix
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    resets: {
        name: 'resets',
        argTypes: [
            _ast.valueType.matrix
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    round: {
        name: 'round',
        argTypes: [
            _ast.valueType.vector,
            _ast.valueType.scalar
        ],
        variadic: 1,
        returnType: _ast.valueType.vector
    },
    scalar: {
        name: 'scalar',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.scalar
    },
    sgn: {
        name: 'sgn',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    sin: {
        name: 'sin',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    sinh: {
        name: 'sinh',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    sort: {
        name: 'sort',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    sort_by_label: {
        name: 'sort_by_label',
        argTypes: [
            _ast.valueType.vector,
            _ast.valueType.string
        ],
        variadic: -1,
        returnType: _ast.valueType.vector
    },
    sort_by_label_desc: {
        name: 'sort_by_label_desc',
        argTypes: [
            _ast.valueType.vector,
            _ast.valueType.string
        ],
        variadic: -1,
        returnType: _ast.valueType.vector
    },
    sort_desc: {
        name: 'sort_desc',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    sqrt: {
        name: 'sqrt',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    stddev_over_time: {
        name: 'stddev_over_time',
        argTypes: [
            _ast.valueType.matrix
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    stdvar_over_time: {
        name: 'stdvar_over_time',
        argTypes: [
            _ast.valueType.matrix
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    sum_over_time: {
        name: 'sum_over_time',
        argTypes: [
            _ast.valueType.matrix
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    tan: {
        name: 'tan',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    tanh: {
        name: 'tanh',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    time: {
        name: 'time',
        argTypes: [],
        variadic: 0,
        returnType: _ast.valueType.scalar
    },
    timestamp: {
        name: 'timestamp',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    vector: {
        name: 'vector',
        argTypes: [
            _ast.valueType.scalar
        ],
        variadic: 0,
        returnType: _ast.valueType.vector
    },
    year: {
        name: 'year',
        argTypes: [
            _ast.valueType.vector
        ],
        variadic: 1,
        returnType: _ast.valueType.vector
    }
};
