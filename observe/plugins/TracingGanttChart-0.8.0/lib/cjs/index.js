"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getPluginModule", {
    enumerable: true,
    get: function() {
        return _getPluginModule.getPluginModule;
    }
});
_export_star(require("./gantt-chart-model"), exports);
const _getPluginModule = require("./getPluginModule");
_export_star(require("./TracingGanttChart"), exports);
_export_star(require("./TracingGanttChartPanel"), exports);
function _export_star(from, to) {
    Object.keys(from).forEach(function(k) {
        if (k !== "default" && !Object.prototype.hasOwnProperty.call(to, k)) {
            Object.defineProperty(to, k, {
                enumerable: true,
                get: function() {
                    return from[k];
                }
            });
        }
    });
    return from;
}
