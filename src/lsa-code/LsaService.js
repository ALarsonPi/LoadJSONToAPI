"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LsaService = void 0;
var LsaService = /** @class */ (function () {
    function LsaService(isProd) {
        this.accessToken = "";
        this.hostUrl = "";
        this.isProd = false;
        /* To find your LS auth token:
            Log into the LSA assessment
                DEV: https://assess.test.lang.mtc.byu.edu/home
                PROD: https://assess.lang.mtc.byu.edu/home
            Look in the network tab,
            Find 'findAll' -> Payload,
            Scroll down until you find 'Authorization'
            Copy entire 'access-token' after the word Bearer)
        */
        this.PROD_ACCESS_TOKEN = "eyJraWQiOiJOa2pHdVNUS0g5Qm40VmV1UkFJcjQ4OXRWXC9XeGhrXC90QjY1SFdWU2FHUVU9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIzMjQzZmQzOC1kOGNkLTQyNzQtOTVkZC00MjFiMzMxYTVhNzIiLCJjb2duaXRvOmdyb3VwcyI6WyJ1cy13ZXN0LTJfc3hPSmxZSTJrX0NodXJjaC1BY2NvdW50LU9wZW5JRCJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl9zeE9KbFlJMmsiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI0cW1rOHVkNGhjOTFpcTk2NzMxcXEyNGQ1YSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUiLCJhdXRoX3RpbWUiOjE3MTg3NDEwMjIsImV4cCI6MTcxODc0NDYyMiwiaWF0IjoxNzE4NzQxMDIyLCJqdGkiOiJhZTk2ZDhkYy0wMTQ4LTRkMWEtYmQwYi03YzMzYzJhNmQzN2IiLCJ1c2VybmFtZSI6ImNodXJjaC1hY2NvdW50LW9wZW5pZF8wMHUxd3hkZ2tvcG5keHUxYzM1NyJ9.xm9xSb8MAFB2Z2BBxytGijv9ItNpFe5cCvH5uwONkhzHzf3N8g_SOchnHcsGVOUzsEe6yja-3c2SLScBkDj7RQ8fFIOT5bcUd-cONxSxIWd1swqTaoyhMmI3H6Fn3hPtslWpLxeVPIodW4Hnv4-OtDHwx9xjfwgC4HJi0kni3hHAIGa_8RaZ-weZtmyZRS8QjB_nQJ7oZq-yXm8jS8JZjEmWonuLlZ0ehwGVqs96FSd1-yWcMaXMjWJVlP2asJZQazIrk2dJBqAyn9GQHCIniL0MVK4U3Py9xKnA6delzNZF2HRYgzKnlQq1p1dSOiyZufh1RylXJHPZw-VvKtD4AA";
        this.DEV_ACCESS_TOKEN = "eyJraWQiOiJhNVwvem0zZ1pJSVVjeFZybWhKU0dvWFE3UlNTU1JoNE9wOGd5b3pHa1JwND0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5NTc2MDgwZC1kZmJmLTRmNDYtYTY2OC1jMjQ2ZDc1NzkzOTIiLCJjb2duaXRvOmdyb3VwcyI6WyJ1cy13ZXN0LTJfQ3N5QmwxV0NoX0NodXJjaC1BY2NvdW50LU9wZW5JRCJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl9Dc3lCbDFXQ2giLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiIyOTFnc21nazc0b2g1cjRyZW5yaDBuYm4zNiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUiLCJhdXRoX3RpbWUiOjE3MTg2Njg5NDcsImV4cCI6MTcxODc0NDU3MiwiaWF0IjoxNzE4NzQwOTczLCJqdGkiOiJhOWUzOTg0ZS1iYzEwLTQxY2QtOTk5OS1iNjU3OTI1ZWI3NDIiLCJ1c2VybmFtZSI6ImNodXJjaC1hY2NvdW50LW9wZW5pZF8wMHUxd3hkZ2tvcG5keHUxYzM1NyJ9.cRYgvm8fPh-IWtzuC2aBYOzz4tHdh5YCKWoL_iYsEhRjcjjyWNbWvLWg9XTOPHg4dmDyNmL8vVoIg6FPt6xURwJcSc3-xAmw526mApsx5igO8nbtSR2IDVcnnx--cghd36WUrXHGFLtrk9i_gnefZxv4PqeZNx8pgkwt6guD0r0p_luiXZY2Vcis7QuOmznGpxSRjT1i9-pR4fpjnlSbd_cg6P46Ikfh4BK-GY9RhBt7Ef4DiqAgf7ypGSRzqCQkYdkHtnzc0fYZOn-j2rPe6eDKujODe5oPvSVdvjk4F-gq7cm-lZYpJUWa6VqTmcIDF9a71D6zpk3W3xnQIU3-wA";
        this.DEV_HOST_URL = 'https://api.test.lang.mtc.byu.edu/lsa/v1';
        this.PROD_HOST_URL = 'https://api.lang.mtc.byu.edu/lsa/v1';
        this.setIsProd(isProd);
        this.setHost(isProd ? this.PROD_HOST_URL : this.DEV_HOST_URL);
        this.setAccessToken(isProd ? this.PROD_ACCESS_TOKEN : this.DEV_ACCESS_TOKEN);
    }
    LsaService.prototype.getAccessToken = function () {
        return this.isProd ? this.PROD_ACCESS_TOKEN : this.DEV_ACCESS_TOKEN;
    };
    LsaService.prototype.getFullUrl = function (endpoint) {
        var hostUrl = this.isProd ? this.PROD_HOST_URL : this.DEV_HOST_URL;
        return hostUrl + '/localization/item/' + endpoint;
    };
    LsaService.prototype.setAccessToken = function (token) {
        this.accessToken = token;
    };
    LsaService.prototype.setHost = function (hostName) {
        this.hostUrl = hostName;
    };
    LsaService.prototype.setIsProd = function (isProd) {
        this.isProd = isProd;
    };
    return LsaService;
}());
exports.LsaService = LsaService;
