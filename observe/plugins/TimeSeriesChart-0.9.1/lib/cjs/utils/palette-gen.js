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
    getAutoPaletteColor: function() {
        return getAutoPaletteColor;
    },
    getCategoricalPaletteColor: function() {
        return getCategoricalPaletteColor;
    },
    getConsistentSeriesNameColor: function() {
        return getConsistentSeriesNameColor;
    },
    getSeriesColor: function() {
        return getSeriesColor;
    }
});
const _palette = require("./palette");
function getSeriesColor(props) {
    const { categoricalPalette, visual, muiPrimaryColor, seriesName, seriesIndex, querySettings, queryHasMultipleResults } = props;
    // Use color overrides defined in query settings in priority, if applicable
    if (querySettings) {
        if (querySettings.colorMode === 'fixed') {
            return querySettings.colorValue;
        } else if (querySettings.colorMode === 'fixed-single' && !queryHasMultipleResults) {
            return querySettings.colorValue;
        }
    }
    // Fallback is unlikely to set unless echarts theme palette in charts theme provider is undefined.
    const fallbackColor = Array.isArray(categoricalPalette) && categoricalPalette[0] ? categoricalPalette[0] // Needed since echarts color property isn't always an array.
     : muiPrimaryColor;
    // Explicit way to always cycle through classical palette instead of changing when based on number of series.
    if (visual.palette?.mode === 'categorical') {
        return getCategoricalPaletteColor(categoricalPalette, seriesIndex, fallbackColor);
    }
    return getAutoPaletteColor(seriesName, fallbackColor);
}
function getAutoPaletteColor(name, fallbackColor) {
    // corresponds to 'Auto' in palette.kind for generative color palette
    const generatedColor = getConsistentSeriesNameColor(name);
    return generatedColor ?? fallbackColor;
}
function getCategoricalPaletteColor(palette, seriesIndex, fallbackColor) {
    if (palette === undefined) {
        return fallbackColor;
    }
    // Loop through predefined static color palette
    const paletteTotalColors = palette.length ?? 1;
    const paletteIndex = seriesIndex % paletteTotalColors;
    // fallback color comes from echarts theme
    const seriesColor = palette[paletteIndex] ?? fallbackColor;
    return seriesColor;
}
function getConsistentSeriesNameColor(inputString) {
    return (0, _palette.getConsistentColor)(inputString, inputString.toLowerCase().includes('error'));
}
