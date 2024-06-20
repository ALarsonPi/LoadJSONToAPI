export class LsaService {
    isProd: boolean = false;

    /* To find your LSA access token: 
        Log into the LSA assessment
            DEV: https://assess.test.lang.mtc.byu.edu/home 
            PROD: https://assess.lang.mtc.byu.edu/home 
        Look in the network tab, 
        Find 'findAll' -> Payload, 
        Scroll down until you find 'Authorization'
        Copy entire 'access-token' after the word Bearer) 
    */
    DEV_ACCESS_TOKEN = "";
    PROD_ACCESS_TOKEN = "";

    DEV_HOST_URL = 'https://api.test.lang.mtc.byu.edu/lsa/v1';
    PROD_HOST_URL = 'https://api.lang.mtc.byu.edu/lsa/v1';

    DEV_JSON_FILE_PATH = "src/json/lsa/dev/dev-localizations.json";
    PROD_JSON_FILE_PATH = "src/json/lsa/prod/prod-localizations.json";

    constructor(isProd: boolean) {
        this.setIsProd(isProd);
    }

    getAccessToken(): string {
        return this.isProd ? this.PROD_ACCESS_TOKEN : this.DEV_ACCESS_TOKEN;
    }

    getFullUrl(endpoint: string): string {
        const hostUrl = this.isProd ? this.PROD_HOST_URL : this.DEV_HOST_URL;
        return hostUrl + '/localization/item/' + endpoint;
    }

    getJsonFilePath(): string {
        return this.isProd ? this.PROD_JSON_FILE_PATH : this.DEV_JSON_FILE_PATH;
    }

    setIsProd(isProd: boolean) {
        this.isProd = isProd;
    }
}