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
const _getPluginModule = require("./getPluginModule");
_export_star(require("./CellsEditor"), exports);
_export_star(require("./ColumnsEditor"), exports);
_export_star(require("./Table"), exports);
_export_star(require("./TableCellsEditor"), exports);
_export_star(require("./TableColumnsEditor"), exports);
_export_star(require("./TablePanel"), exports);
_export_star(require("./TableSettingsEditor"), exports);
_export_star(require("./TableTransformsEditor"), exports);
_export_star(require("./model"), exports);
_export_star(require("./table-model"), exports);
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
