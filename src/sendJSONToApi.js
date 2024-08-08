"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var fsExtra = require("fs-extra");
var jsonModificationService_1 = require("./jsonModificationService");
var SendJSONToApi = /** @class */ (function () {
    function SendJSONToApi() {
    }
    SendJSONToApi.loadInJSONAndCallEndpoint = function () {
        return __awaiter(this, void 0, void 0, function () {
            var jsonFilePath, idToken, endpointUrl, shouldChangePropertyNames, jsonPropertyNameChanges, shouldAddIndexAsId, indexShouldBeString, idName, jsonDataFromFile, jsonList, startingIndex, endingIndex, i, postResponse, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jsonFilePath = this.FILE_PREFIX + 'exampleJson.json';
                        idToken = "eyJraWQiOiJDZmwyT0tERCs0VHBcL05jcGJvMWxNcGNsRnhOM0RpWTh5MXFaZjhrQmE2TT0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiVlJmZWd1MG1La3hSOFAtbmRreUhYUSIsImN1c3RvbTpsZHNhY2NvdW50aWQiOiIzNjE4NTA2OTIzNDYxNzc3Iiwic3ViIjoiYzk2ZjBiZGEtYjk3Zi00NzE2LTgxODItNTIyNmQwZjI5Y2EwIiwiY29nbml0bzpncm91cHMiOlsidXMtd2VzdC0yX2Y0SFp2RHpwal9DaHVyY2gtQWNjb3VudC1PcGVuSUQiLCJ0YWxsLWFkbWluIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tXC91cy13ZXN0LTJfZjRIWnZEenBqIiwiY29nbml0bzp1c2VybmFtZSI6ImNodXJjaC1hY2NvdW50LW9wZW5pZF8wMHUxd3hkZ2tvcG5keHUxYzM1NyIsImdpdmVuX25hbWUiOiJBbGVjIFJpY2hhcmQiLCJub25jZSI6Ii1TaHM5aXN6TlpvRzFWcjB4TkE0V1lYRWNqZWNNRVMwUURYTVVtLVBaeVE0S3QtN1Yxd0dYZk15MVkyeVV0NlJMcTYxbVR3MVpBQWYwNV9uanJUaUdyYkhUTVo1bUU3NUNST3BCcW9mbGpPZzVnZTJfbFZvZ2pLd0pnTVQ1akNneF95dW85Yk5nc1lfZ0hGMjZCWGktX0huWEVtZ3YyMjhpN0ZoenNuVnZVSSIsImF1ZCI6IjczZTJ0ZGphNWhpZHZkMnY5MWJwZmFsaG9wIiwiaWRlbnRpdGllcyI6W3sidXNlcklkIjoiMDB1MXd4ZGdrb3BORHhVMUMzNTciLCJwcm92aWRlck5hbWUiOiJDaHVyY2gtQWNjb3VudC1PcGVuSUQiLCJwcm92aWRlclR5cGUiOiJPSURDIiwiaXNzdWVyIjpudWxsLCJwcmltYXJ5IjoidHJ1ZSIsImRhdGVDcmVhdGVkIjoiMTY3Mzk3MTE0MDAxMCJ9XSwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3MjMxMzE0MDYsImV4cCI6MTcyMzEzNTAwNiwiaWF0IjoxNzIzMTMxNDA2LCJmYW1pbHlfbmFtZSI6IkxhcnNvbiIsImVtYWlsIjoiYWxhcnNvbnBpQGdtYWlsLmNvbSJ9.NjLS51l5VZDlMcGUt9BWlSVxHx7Quc8B1euCHL0-st3gT2oHplSdEVnB6DL5pdFjXi3sUbUj9jv6X-Z9NBqMB7KajFE7dSSQQjmSN5HOFJQ2vTmKp49tgCSEYAZRYWcxNzMS4LF8Od13Wc_qtS-ZeN_NHfvITNJlfp7L6AGki0JO59rT-DCtDUHF5i2pEAX86yIuJtMb4R6jbYD8chLWdmCFVoHHFKbvwgLwcSeJ1pAyE_yOL0AohsDMnw7heEnSUDAZgkSRBYTOrOJQwOA8snot1qmVlobZmWQ1AvULVg8dqt2LOZIkyEO9RvE-J5uNDDxpyo1rVdJjeBLMnHnuDA";
                        endpointUrl = 'https://3ojfzhyjld.execute-api.us-east-2.amazonaws.com/prod/missions';
                        shouldChangePropertyNames = false;
                        jsonPropertyNameChanges = [
                            [],
                            []
                        ];
                        shouldAddIndexAsId = false;
                        indexShouldBeString = true;
                        idName = "id";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, fsExtra.readJson(jsonFilePath)];
                    case 2:
                        jsonDataFromFile = _a.sent();
                        jsonList = (jsonDataFromFile.length === 1) ? [jsonDataFromFile] : jsonDataFromFile;
                        startingIndex = 0;
                        endingIndex = jsonList.length;
                        i = startingIndex;
                        _a.label = 3;
                    case 3:
                        if (!(i < endingIndex)) return [3 /*break*/, 6];
                        if (shouldChangePropertyNames) {
                            jsonModificationService_1.JSONModificationService.changePropertyNames(jsonList[i], jsonPropertyNameChanges);
                        }
                        if (shouldAddIndexAsId) {
                            jsonModificationService_1.JSONModificationService.addIdToJsonElement(jsonList[i], i, idName, indexShouldBeString);
                        }
                        return [4 /*yield*/, this.makePostRequest(jsonList[i], endpointUrl, idToken)];
                    case 4:
                        postResponse = _a.sent();
                        console.log("Response Retrieved", postResponse);
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    SendJSONToApi.makePostRequest = function (jsonData, endpointUrl, idToken) {
        return __awaiter(this, void 0, void 0, function () {
            var dummyApiUrl, dummyAxiosResponse, axiosResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Sending", jsonData);
                        dummyApiUrl = 'https://jsonplaceholder.typicode.com/posts';
                        return [4 /*yield*/, axios_1.default.post(dummyApiUrl, jsonData)];
                    case 1:
                        dummyAxiosResponse = _a.sent();
                        return [2 /*return*/, dummyAxiosResponse.data];
                    case 2:
                        axiosResponse = _a.sent();
                        return [2 /*return*/, axiosResponse.data];
                }
            });
        });
    };
    SendJSONToApi.FILE_PREFIX = './src/json/';
    return SendJSONToApi;
}());
SendJSONToApi.loadInJSONAndCallEndpoint();
