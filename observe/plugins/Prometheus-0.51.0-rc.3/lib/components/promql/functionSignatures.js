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
import { valueType } from './ast';
export const functionSignatures = {
    abs: {
        name: 'abs',
        argTypes: [
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    absent: {
        name: 'absent',
        argTypes: [
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    absent_over_time: {
        name: 'absent_over_time',
        argTypes: [
            valueType.matrix
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    acos: {
        name: 'acos',
        argTypes: [
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    acosh: {
        name: 'acosh',
        argTypes: [
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    asin: {
        name: 'asin',
        argTypes: [
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    asinh: {
        name: 'asinh',
        argTypes: [
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    atan: {
        name: 'atan',
        argTypes: [
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    atanh: {
        name: 'atanh',
        argTypes: [
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    avg_over_time: {
        name: 'avg_over_time',
        argTypes: [
            valueType.matrix
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    ceil: {
        name: 'ceil',
        argTypes: [
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    changes: {
        name: 'changes',
        argTypes: [
            valueType.matrix
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    clamp: {
        name: 'clamp',
        argTypes: [
            valueType.vector,
            valueType.scalar,
            valueType.scalar
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    clamp_max: {
        name: 'clamp_max',
        argTypes: [
            valueType.vector,
            valueType.scalar
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    clamp_min: {
        name: 'clamp_min',
        argTypes: [
            valueType.vector,
            valueType.scalar
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    cos: {
        name: 'cos',
        argTypes: [
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    cosh: {
        name: 'cosh',
        argTypes: [
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    count_over_time: {
        name: 'count_over_time',
        argTypes: [
            valueType.matrix
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    day_of_month: {
        name: 'day_of_month',
        argTypes: [
            valueType.vector
        ],
        variadic: 1,
        returnType: valueType.vector
    },
    day_of_week: {
        name: 'day_of_week',
        argTypes: [
            valueType.vector
        ],
        variadic: 1,
        returnType: valueType.vector
    },
    day_of_year: {
        name: 'day_of_year',
        argTypes: [
            valueType.vector
        ],
        variadic: 1,
        returnType: valueType.vector
    },
    days_in_month: {
        name: 'days_in_month',
        argTypes: [
            valueType.vector
        ],
        variadic: 1,
        returnType: valueType.vector
    },
    deg: {
        name: 'deg',
        argTypes: [
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    delta: {
        name: 'delta',
        argTypes: [
            valueType.matrix
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    deriv: {
        name: 'deriv',
        argTypes: [
            valueType.matrix
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    exp: {
        name: 'exp',
        argTypes: [
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    floor: {
        name: 'floor',
        argTypes: [
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    histogram_avg: {
        name: 'histogram_avg',
        argTypes: [
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    histogram_count: {
        name: 'histogram_count',
        argTypes: [
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    histogram_fraction: {
        name: 'histogram_fraction',
        argTypes: [
            valueType.scalar,
            valueType.scalar,
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    histogram_quantile: {
        name: 'histogram_quantile',
        argTypes: [
            valueType.scalar,
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    histogram_stddev: {
        name: 'histogram_stddev',
        argTypes: [
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    histogram_stdvar: {
        name: 'histogram_stdvar',
        argTypes: [
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    histogram_sum: {
        name: 'histogram_sum',
        argTypes: [
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    double_exponential_smoothing: {
        name: 'double_exponential_smoothing',
        argTypes: [
            valueType.matrix,
            valueType.scalar,
            valueType.scalar
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    hour: {
        name: 'hour',
        argTypes: [
            valueType.vector
        ],
        variadic: 1,
        returnType: valueType.vector
    },
    idelta: {
        name: 'idelta',
        argTypes: [
            valueType.matrix
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    increase: {
        name: 'increase',
        argTypes: [
            valueType.matrix
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    irate: {
        name: 'irate',
        argTypes: [
            valueType.matrix
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    label_join: {
        name: 'label_join',
        argTypes: [
            valueType.vector,
            valueType.string,
            valueType.string,
            valueType.string
        ],
        variadic: -1,
        returnType: valueType.vector
    },
    label_replace: {
        name: 'label_replace',
        argTypes: [
            valueType.vector,
            valueType.string,
            valueType.string,
            valueType.string,
            valueType.string
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    last_over_time: {
        name: 'last_over_time',
        argTypes: [
            valueType.matrix
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    ln: {
        name: 'ln',
        argTypes: [
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    log10: {
        name: 'log10',
        argTypes: [
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    log2: {
        name: 'log2',
        argTypes: [
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    mad_over_time: {
        name: 'mad_over_time',
        argTypes: [
            valueType.matrix
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    max_over_time: {
        name: 'max_over_time',
        argTypes: [
            valueType.matrix
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    min_over_time: {
        name: 'min_over_time',
        argTypes: [
            valueType.matrix
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    minute: {
        name: 'minute',
        argTypes: [
            valueType.vector
        ],
        variadic: 1,
        returnType: valueType.vector
    },
    month: {
        name: 'month',
        argTypes: [
            valueType.vector
        ],
        variadic: 1,
        returnType: valueType.vector
    },
    pi: {
        name: 'pi',
        argTypes: [],
        variadic: 0,
        returnType: valueType.scalar
    },
    predict_linear: {
        name: 'predict_linear',
        argTypes: [
            valueType.matrix,
            valueType.scalar
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    present_over_time: {
        name: 'present_over_time',
        argTypes: [
            valueType.matrix
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    quantile_over_time: {
        name: 'quantile_over_time',
        argTypes: [
            valueType.scalar,
            valueType.matrix
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    rad: {
        name: 'rad',
        argTypes: [
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    rate: {
        name: 'rate',
        argTypes: [
            valueType.matrix
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    resets: {
        name: 'resets',
        argTypes: [
            valueType.matrix
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    round: {
        name: 'round',
        argTypes: [
            valueType.vector,
            valueType.scalar
        ],
        variadic: 1,
        returnType: valueType.vector
    },
    scalar: {
        name: 'scalar',
        argTypes: [
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.scalar
    },
    sgn: {
        name: 'sgn',
        argTypes: [
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    sin: {
        name: 'sin',
        argTypes: [
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    sinh: {
        name: 'sinh',
        argTypes: [
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    sort: {
        name: 'sort',
        argTypes: [
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    sort_by_label: {
        name: 'sort_by_label',
        argTypes: [
            valueType.vector,
            valueType.string
        ],
        variadic: -1,
        returnType: valueType.vector
    },
    sort_by_label_desc: {
        name: 'sort_by_label_desc',
        argTypes: [
            valueType.vector,
            valueType.string
        ],
        variadic: -1,
        returnType: valueType.vector
    },
    sort_desc: {
        name: 'sort_desc',
        argTypes: [
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    sqrt: {
        name: 'sqrt',
        argTypes: [
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    stddev_over_time: {
        name: 'stddev_over_time',
        argTypes: [
            valueType.matrix
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    stdvar_over_time: {
        name: 'stdvar_over_time',
        argTypes: [
            valueType.matrix
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    sum_over_time: {
        name: 'sum_over_time',
        argTypes: [
            valueType.matrix
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    tan: {
        name: 'tan',
        argTypes: [
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    tanh: {
        name: 'tanh',
        argTypes: [
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    time: {
        name: 'time',
        argTypes: [],
        variadic: 0,
        returnType: valueType.scalar
    },
    timestamp: {
        name: 'timestamp',
        argTypes: [
            valueType.vector
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    vector: {
        name: 'vector',
        argTypes: [
            valueType.scalar
        ],
        variadic: 0,
        returnType: valueType.vector
    },
    year: {
        name: 'year',
        argTypes: [
            valueType.vector
        ],
        variadic: 1,
        returnType: valueType.vector
    }
};

//# sourceMappingURL=functionSignatures.js.map