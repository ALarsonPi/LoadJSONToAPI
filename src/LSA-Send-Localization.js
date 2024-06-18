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
    LoadInJSONCallEndpoint.loadInJSONAndCallEndpoint = function () {
        return __awaiter(this, void 0, void 0, function () {
            var jsonFilePath, localizations, DEV_HOST, PROD_HOST, specifiedHost, updateLocalizationsEndpoint, saveNewLocalizationsEndpoint, accessToken, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jsonFilePath = this.FILE_PREFIX + 'stage-update-localizations.json';
                        return [4 /*yield*/, this.getLocalizationListFromJson(jsonFilePath)];
                    case 1:
                        localizations = _a.sent();
                        DEV_HOST = 'https://api.test.lang.mtc.byu.edu/lsa/v1';
                        PROD_HOST = 'https://api.lang.mtc.byu.edu/lsa/v1';
                        specifiedHost = DEV_HOST;
                        updateLocalizationsEndpoint = specifiedHost + '/localization/item/update';
                        saveNewLocalizationsEndpoint = specifiedHost + '/localization/item/save';
                        accessToken = "eyJraWQiOiJhNVwvem0zZ1pJSVVjeFZybWhKU0dvWFE3UlNTU1JoNE9wOGd5b3pHa1JwND0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5NTc2MDgwZC1kZmJmLTRmNDYtYTY2OC1jMjQ2ZDc1NzkzOTIiLCJjb2duaXRvOmdyb3VwcyI6WyJ1cy13ZXN0LTJfQ3N5QmwxV0NoX0NodXJjaC1BY2NvdW50LU9wZW5JRCJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl9Dc3lCbDFXQ2giLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiIyOTFnc21nazc0b2g1cjRyZW5yaDBuYm4zNiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUiLCJhdXRoX3RpbWUiOjE3MTg2Njg5NDcsImV4cCI6MTcxODczMTUyMywiaWF0IjoxNzE4NzI3OTIzLCJqdGkiOiJjZGUyZmNiMy0yNTU5LTQ2YzQtOThhYS1kZjgzMmNjMTNiYWQiLCJ1c2VybmFtZSI6ImNodXJjaC1hY2NvdW50LW9wZW5pZF8wMHUxd3hkZ2tvcG5keHUxYzM1NyJ9.wDk3fQJa-_nO9of5Xui-XQZudFgb9pXNi1zvXTTPmdsRvF78aZtfFSA4nkHtvXsmqrEjben5z8EtK7FV_BHwqjERuoKvLXP1Vg0Lr07Ps13k9mKBPccMGJxBXkr4ZO7eijOReEpSlvFIjRqf3FP6S_4HQNrv54JO1sfAzPuKf3jQT_kJs_LeTj1BlfdfTSNpCDNq0NM0n3s1ra7_vZM5lC44Tq2VL_3YvMnpxH-Q1dvuu_MuaISXbuT2p8ZZj_rYkfn91_OvNzGGwflSJdhRhDxbw--EAeKi53RGnr1HK84L8rIFNaZycyDfn3E4bx89zO0azPSFYHkZ8nxkLWch1A";
                        return [4 /*yield*/, this.makePostRequest(localizations, updateLocalizationsEndpoint, accessToken)];
                    case 2:
                        response = _a.sent();
                        console.log("Response", response);
                        return [2 /*return*/];
                }
            });
        });
    };
    LoadInJSONCallEndpoint.getLocalizationListFromJson = function (jsonFilePath) {
        return __awaiter(this, void 0, void 0, function () {
            var localizationList, jsonDataFromFile, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        localizationList = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fsExtra.readJson(jsonFilePath)];
                    case 2:
                        jsonDataFromFile = _a.sent();
                        return [2 /*return*/, jsonDataFromFile];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, localizationList];
                }
            });
        });
    };
    LoadInJSONCallEndpoint.makePostRequest = function (localizations, endpointUrl, bearerAccessToken) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var axiosResponse;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, axios_1.default.post(endpointUrl, localizations, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': "Bearer ".concat(bearerAccessToken)
                            }
                        })];
                    case 1:
                        axiosResponse = _b.sent();
                        if (axiosResponse.status !== 200) {
                            console.log((_a = axiosResponse.data) === null || _a === void 0 ? void 0 : _a.message);
                        }
                        return [2 /*return*/, axiosResponse.data];
                }
            });
        });
    };
    LoadInJSONCallEndpoint.FILE_PREFIX = './src/json/';
    return LoadInJSONCallEndpoint;
}());
LoadInJSONCallEndpoint.loadInJSONAndCallEndpoint();
