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
var LoadInJSONCallEndpoint = /** @class */ (function () {
    function LoadInJSONCallEndpoint() {
    }
    LoadInJSONCallEndpoint.loadInJSON = function () {
        return __awaiter(this, void 0, void 0, function () {
            var jsonFilePath, jsonData, startingIndex, endingIndex, i, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        jsonFilePath = this.FILE_PREFIX + 'missions.json';
                        return [4 /*yield*/, fsExtra.readJson(jsonFilePath)];
                    case 1:
                        jsonData = _a.sent();
                        console.log(jsonData);
                        // If the JSON is a list of elements
                        if (jsonData.length > 1) {
                            startingIndex = 0;
                            endingIndex = jsonData.length;
                            for (i = startingIndex; i < endingIndex; i++) {
                                // Data manipulation (like adding an id if needed) would happen here
                                this.addIdToJsonElement(jsonData[i], i);
                                this.changePropertyNamesForJSON(jsonData[i]);
                                console.log(jsonData[i]);
                                this.makePostRequest(jsonData[i]);
                            }
                        }
                        else {
                            // Data manipulation (like adding an id if needed) would happen here
                            this.addIdToJsonElement(jsonData, 0);
                            this.changePropertyNamesForJSON(jsonData[0]);
                            this.makePostRequest(jsonData);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LoadInJSONCallEndpoint.makePostRequest = function (jsonData) {
        return __awaiter(this, void 0, void 0, function () {
            var apiUrl, idToken, axiosResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiUrl = 'https://3b8q7d9jd4.execute-api.us-east-2.amazonaws.com/prod/missions';
                        idToken = "eyJraWQiOiJDZmwyT0tERCs0VHBcL05jcGJvMWxNcGNsRnhOM0RpWTh5MXFaZjhrQmE2TT0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoib1NwOGlNYnE5YmJQQU1hVjhFWnZTdyIsImN1c3RvbTpsZHNhY2NvdW50aWQiOiIzNjE4NTA2OTIzNDYxNzc3Iiwic3ViIjoiYzk2ZjBiZGEtYjk3Zi00NzE2LTgxODItNTIyNmQwZjI5Y2EwIiwiY29nbml0bzpncm91cHMiOlsidXMtd2VzdC0yX2Y0SFp2RHpwal9DaHVyY2gtQWNjb3VudC1PcGVuSUQiLCJ0YWxsLWFkbWluIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tXC91cy13ZXN0LTJfZjRIWnZEenBqIiwiY29nbml0bzp1c2VybmFtZSI6ImNodXJjaC1hY2NvdW50LW9wZW5pZF8wMHUxd3hkZ2tvcG5keHUxYzM1NyIsImdpdmVuX25hbWUiOiJBbGVjIFJpY2hhcmQiLCJub25jZSI6ImN4Z0R5eFBOU0hOaU1aZGRFRzZsRFF6OTlnT1BGWE5BUGZmZW92YlhLVDNWS2ZQMnBkaU0yM3AtX3B5TXVmZDFQSWFldVRqMjVSREswUGtxMmhvQ2JiZVF4MV9lRzlNT29uanpuRXlDdEZRczBXaHh6cEFTTi1URE9VeVRfN0ZtOFFUNFBKdzBnM2tsWWg2S2hkdmlYNGwzQlBKQjc1RDhTeDdEUFcxcVRQZyIsImF1ZCI6IjczZTJ0ZGphNWhpZHZkMnY5MWJwZmFsaG9wIiwiaWRlbnRpdGllcyI6W3sidXNlcklkIjoiMDB1MXd4ZGdrb3BORHhVMUMzNTciLCJwcm92aWRlck5hbWUiOiJDaHVyY2gtQWNjb3VudC1PcGVuSUQiLCJwcm92aWRlclR5cGUiOiJPSURDIiwiaXNzdWVyIjpudWxsLCJwcmltYXJ5IjoidHJ1ZSIsImRhdGVDcmVhdGVkIjoiMTY3Mzk3MTE0MDAxMCJ9XSwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3MDYzMDUwNDEsImV4cCI6MTcwNjMwODY0MSwiaWF0IjoxNzA2MzA1MDQxLCJmYW1pbHlfbmFtZSI6IkxhcnNvbiIsImVtYWlsIjoiYWxhcnNvbnBpQGdtYWlsLmNvbSJ9.JP4nrEjQmrOd9CxpOH_pl-E_Bhn83V37NgQ7NMkgALtRHkatAHDsfNBS8pKWMrLv_jzSDl8YA9UMdHCoNgWpeu9R2CFNEZXL65oo53yUvalQzyhquZkvPAvKLP0ZGU3eZphjP5WZy4pfDTemI26Av2v4tMWQXZPCfSk4yvMEbVjxEwu-PDY1WC1FNkivkLRGFyFEou4vN337UjtX4sScg8txS5agibe8Rv4OBKR8SW0-kP5OOA2_oJqHrl8GGXbqLZ0h-_ru_WoqD-2hE4EcxVBZ9yDDDfBvYpPlcaDMTdv-ISfIjDK7CztCpkJj_KPE57xkiV2ctjFDyUs-E3AsMw";
                        return [4 /*yield*/, axios_1.default.post(apiUrl, jsonData, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Id': "".concat(idToken)
                                }
                            })];
                    case 1:
                        axiosResponse = _a.sent();
                        // console.log('Response:', axiosResponse.data);
                        return [2 /*return*/, axiosResponse.data];
                }
            });
        });
    };
    LoadInJSONCallEndpoint.addIdToJsonElement = function (jsonData, id) {
        jsonData.id = id.toString();
    };
    LoadInJSONCallEndpoint.changePropertyNamesForJSON = function (jsonData) {
        var propertyNamesYouWantToChange = [
            ["id", "missionId"]
        ];
        this.changePropertyNames(jsonData, propertyNamesYouWantToChange);
    };
    LoadInJSONCallEndpoint.changePropertyNames = function (jsonData, propertyNames) {
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
    LoadInJSONCallEndpoint.FILE_PREFIX = './src/json/';
    return LoadInJSONCallEndpoint;
}());
LoadInJSONCallEndpoint.loadInJSON();
