"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONModificationService = void 0;
var JSONModificationService = /** @class */ (function () {
    function JSONModificationService() {
    }
    JSONModificationService.addIdToJsonElement = function (jsonData, id, idName, shouldBeString) {
        jsonData[idName] = (shouldBeString) ? id.toString() : id;
    };
    JSONModificationService.changePropertyNames = function (jsonData, propertyNames) {
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
    return JSONModificationService;
}());
exports.JSONModificationService = JSONModificationService;
