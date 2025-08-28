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
    formatDuration: function() {
        return formatDuration;
    },
    getServiceColor: function() {
        return getServiceColor;
    },
    getSpanColor: function() {
        return getSpanColor;
    },
    minSpanWidthPx: function() {
        return minSpanWidthPx;
    },
    rowHeight: function() {
        return rowHeight;
    },
    spanHasError: function() {
        return spanHasError;
    }
});
const _core = require("@perses-dev/core");
const _palette = require("./palette");
const minSpanWidthPx = 2;
const rowHeight = '2rem';
const spanHasError = (span)=>span.status?.code === _core.otlptracev1.StatusCodeError;
function getServiceColor(muiTheme, chartsTheme, paletteMode, serviceName, error = false) {
    switch(paletteMode){
        case 'categorical':
            {
                // ECharts type for color is not always an array but it is always an array in ChartsProvider
                const categoricalPalette = chartsTheme.echartsTheme.color;
                const errorPalette = [
                    muiTheme.palette.error.light,
                    muiTheme.palette.error.main,
                    muiTheme.palette.error.dark
                ];
                return (0, _palette.getConsistentCategoricalColor)(serviceName, error, categoricalPalette, errorPalette);
            }
        default:
            return (0, _palette.getConsistentColor)(serviceName, error);
    }
}
function getSpanColor(muiTheme, chartsTheme, paletteMode, span) {
    return getServiceColor(muiTheme, chartsTheme, paletteMode, span.resource.serviceName ?? '', spanHasError(span));
}
function formatDuration(timeMs) {
    if (timeMs < 1) {
        return `${Math.round(timeMs * 1000)}μs`;
    }
    if (timeMs < 1000) {
        return `${+timeMs.toFixed(2)}ms`;
    }
    return `${+(timeMs / 1000).toFixed(2)}s`;
}
