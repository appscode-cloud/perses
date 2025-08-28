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
Object.defineProperty(exports, "convertSparkline", {
    enumerable: true,
    get: function() {
        return convertSparkline;
    }
});
function convertSparkline(chartsTheme, color, sparkline) {
    if (sparkline === undefined) return;
    return {
        lineStyle: {
            width: sparkline.width ?? chartsTheme.sparkline.width,
            color,
            opacity: 1
        },
        areaStyle: {
            color,
            opacity: 0.4
        }
    };
}
