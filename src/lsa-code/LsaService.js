"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LsaService = void 0;
var LsaService = /** @class */ (function () {
    function LsaService(isProd) {
        this.isProd = false;
        /* To find your LSA access token:
            Log into the LSA assessment
                DEV: https://assess.test.lang.mtc.byu.edu/home
                PROD: https://assess.lang.mtc.byu.edu/home
            Look in the network tab,
            Find 'findAll' -> Payload,
            Scroll down until you find 'Authorization'
            Copy entire 'access-token' after the word Bearer)
        */
        this.DEV_ACCESS_TOKEN = "";
        this.PROD_ACCESS_TOKEN = "";
        this.DEV_HOST_URL = 'https://api.test.lang.mtc.byu.edu/lsa/v1';
        this.PROD_HOST_URL = 'https://api.lang.mtc.byu.edu/lsa/v1';
        this.setIsProd(isProd);
    }
    LsaService.prototype.getAccessToken = function () {
        return this.isProd ? this.PROD_ACCESS_TOKEN : this.DEV_ACCESS_TOKEN;
    };
    LsaService.prototype.getFullUrl = function (endpoint) {
        var hostUrl = this.isProd ? this.PROD_HOST_URL : this.DEV_HOST_URL;
        return hostUrl + '/localization/item/' + endpoint;
    };
    LsaService.prototype.setIsProd = function (isProd) {
        this.isProd = isProd;
    };
    return LsaService;
}());
exports.LsaService = LsaService;