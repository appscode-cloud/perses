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
Object.defineProperty(exports, "useOptimalFontSize", {
    enumerable: true,
    get: function() {
        return useOptimalFontSize;
    }
});
const _components = require("@perses-dev/components");
let canvasContext;
function getGlobalCanvasContext() {
    if (!canvasContext) {
        canvasContext = document.createElement('canvas').getContext('2d');
        if (canvasContext === null) {
            throw new Error('Canvas context is null.');
        }
    }
    return canvasContext;
}
function useOptimalFontSize({ text, fontWeight, width, height, lineHeight, maxSize, fontSizeOverride }) {
    const ctx = getGlobalCanvasContext();
    const { echartsTheme } = (0, _components.useChartsTheme)();
    // if user has selected a font size in the settings, use it instead of calculating the optimal size
    if (fontSizeOverride !== undefined) {
        return Number(fontSizeOverride);
    }
    const textStyle = echartsTheme.textStyle;
    const fontSize = Number(textStyle?.fontSize) ?? 12;
    const fontFamily = textStyle?.fontFamily ?? 'Lato';
    // set the font on the canvas context
    const fontStyle = `${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.font = fontStyle;
    // measure the width of the text with the given font style
    const textMetrics = ctx.measureText(text);
    // check how much bigger we can make the font while staying within the width and height
    const fontSizeBasedOnWidth = width / textMetrics.width * fontSize;
    const fontSizeBasedOnHeight = height / lineHeight;
    // return the smaller font size
    const finalFontSize = Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth);
    return maxSize ? Math.min(finalFontSize, maxSize) : finalFontSize;
}
