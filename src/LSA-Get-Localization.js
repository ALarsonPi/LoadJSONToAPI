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
var LsaGetLocalization = /** @class */ (function () {
    function LsaGetLocalization() {
    }
    LsaGetLocalization.getLocalizations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var DEV_HOST, PROD_HOST, findAllEndpointUrl, updateAllEndpointUrl, accessToken, localizations, desiredLocalizationId, desiredSortIndex, desiredEnglishText, localization, localization, localization;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        DEV_HOST = 'https://api.test.lang.mtc.byu.edu/lsa/v1';
                        PROD_HOST = 'https://api.lang.mtc.byu.edu/lsa/v1';
                        findAllEndpointUrl = DEV_HOST + '/localization/item/findAll';
                        updateAllEndpointUrl = DEV_HOST + '/localization/item/updateAll';
                        accessToken = "eyJraWQiOiJhNVwvem0zZ1pJSVVjeFZybWhKU0dvWFE3UlNTU1JoNE9wOGd5b3pHa1JwND0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5NTc2MDgwZC1kZmJmLTRmNDYtYTY2OC1jMjQ2ZDc1NzkzOTIiLCJjb2duaXRvOmdyb3VwcyI6WyJ1cy13ZXN0LTJfQ3N5QmwxV0NoX0NodXJjaC1BY2NvdW50LU9wZW5JRCJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl9Dc3lCbDFXQ2giLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiIyOTFnc21nazc0b2g1cjRyZW5yaDBuYm4zNiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUiLCJhdXRoX3RpbWUiOjE3MTg2Njg5NDcsImV4cCI6MTcxODcyNzg5NiwiaWF0IjoxNzE4NzI0Mjk3LCJqdGkiOiJiMjhjNmZhYy1lYzBmLTQxMzEtOTBjNi0yNmY0NjEwOGJjNjgiLCJ1c2VybmFtZSI6ImNodXJjaC1hY2NvdW50LW9wZW5pZF8wMHUxd3hkZ2tvcG5keHUxYzM1NyJ9.Bu2lCMi4k5lVHC7NO75Y83xbKMt9ZyO00JKV24m-CsMOWS12O17rD7mcDSi3idY8ahPk4MfSG_mBcSA1Kl__yILXYczd7qPWRuNT0nZNgqVdUidQDYARyK9vtmEZuvrxcl5aIJO1UbZmjkIww7SlcDlPq4TJGlEN7oZMEgYuRVDLFnMf8sHOEk7o6mgMLaKE_P2St8Ijws2RWfAPpVCFXTNMxvkACS6lBxOvzH6ITt3kxBBwikNwqM1VFiStBMUPiEOSuxjIpqY_HU5cdC76uWkyOYcS1oVsCwbfjtXrzbAcYSFBk-In7-TFoxyVCEUuKtGKdh8Dd0mkUSkh1_kTKA";
                        return [4 /*yield*/, this.makeGetRequest(findAllEndpointUrl, accessToken)];
                    case 1:
                        localizations = _a.sent();
                        desiredLocalizationId = '';
                        desiredSortIndex = '400';
                        desiredEnglishText = 'This is a test';
                        if (localizations.length > 0) {
                            if (desiredLocalizationId) {
                                localization = this.getLocalizationById(localizations, desiredLocalizationId);
                                console.log("Localization Id Search found:", localization);
                            }
                            if (desiredSortIndex) {
                                localization = this.getLocalizationBySortIndex(localizations, desiredSortIndex);
                                console.log("Sort Index Search found:", localization);
                            }
                            if (desiredEnglishText) {
                                localization = this.getFirstLocalizationWhereEnglishTextIncludes(localizations, desiredEnglishText);
                                console.log("English Text Search found:", localization);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LsaGetLocalization.getLocalizationById = function (localizations, id) {
        return localizations.find(function (localization) { return localization.localizationId === id; });
    };
    LsaGetLocalization.getLocalizationBySortIndex = function (localizations, sortIndex) {
        return localizations.find(function (localization) { return localization.sortIndex === sortIndex; });
    };
    LsaGetLocalization.getFirstLocalizationWhereEnglishTextIncludes = function (localizations, englishText) {
        return localizations.find(function (localization) { return localization.en_US.includes(englishText); });
    };
    LsaGetLocalization.makeGetRequest = function (endpointUrl, bearerAccessToken) {
        return __awaiter(this, void 0, void 0, function () {
            var axiosResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get(endpointUrl, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': "Bearer ".concat(bearerAccessToken)
                            }
                        })];
                    case 1:
                        axiosResponse = _a.sent();
                        return [2 /*return*/, axiosResponse.data];
                }
            });
        });
    };
    LsaGetLocalization.FILE_PREFIX = './src/json/';
    return LsaGetLocalization;
}());
LsaGetLocalization.getLocalizations();
