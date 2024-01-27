"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONModifier = void 0;
var JSONModifier = /** @class */ (function () {
    function JSONModifier() {
    }
    JSONModifier.addIdToJsonElement = function (jsonData, id, idName) {
        jsonData[idName] = id.toString();
    };
    JSONModifier.changePropertyNames = function (jsonData, propertyNames) {
        propertyNames.forEach(function (pair) {
            var originalName = pair[0], modifiedName = pair[1];
            if (!jsonData.hasOwnProperty(originalName)) {
                console.error("JSON data doesn't have an attribute called ", originalName);
                return;
            }
            var data = jsonData[originalName];
            jsonData[modifiedName] = data;
            delete jsonData[originalName];
        });
    };
    return JSONModifier;
}());
exports.JSONModifier = JSONModifier;
