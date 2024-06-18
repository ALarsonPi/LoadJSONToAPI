import axios from 'axios';
import * as fsExtra from 'fs-extra';
import { JSONModifier } from './jsonModifier';
import { LsaLocalization } from './LsaLocalization';

class LoadInJSONCallEndpoint {
    static FILE_PREFIX = './src/json/';

    static async loadInJSONAndCallEndpoint() {
        // Load JSON from a file. Please put json files in 'json' folder
        const jsonFilePath = this.FILE_PREFIX + 'stage-update-localizations.json';
        const localizations: LsaLocalization[] = await this.getLocalizationListFromJson(jsonFilePath);

        const DEV_HOST = 'https://api.test.lang.mtc.byu.edu/lsa/v1';
        const PROD_HOST = 'https://api.lang.mtc.byu.edu/lsa/v1';

        const specifiedHost = DEV_HOST;
        const updateLocalizationsEndpoint = specifiedHost + '/localization/item/update';
        const saveNewLocalizationsEndpoint = specifiedHost + '/localization/item/save';

        /* To find your MTC auth token: 
            Log into Embark on web, 
            Look in the network tab, 
            Find 'token' -> Payload, 
            Copy entire 'access-token') 
        */
        const accessToken = "eyJraWQiOiJhNVwvem0zZ1pJSVVjeFZybWhKU0dvWFE3UlNTU1JoNE9wOGd5b3pHa1JwND0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5NTc2MDgwZC1kZmJmLTRmNDYtYTY2OC1jMjQ2ZDc1NzkzOTIiLCJjb2duaXRvOmdyb3VwcyI6WyJ1cy13ZXN0LTJfQ3N5QmwxV0NoX0NodXJjaC1BY2NvdW50LU9wZW5JRCJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl9Dc3lCbDFXQ2giLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiIyOTFnc21nazc0b2g1cjRyZW5yaDBuYm4zNiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUiLCJhdXRoX3RpbWUiOjE3MTg2Njg5NDcsImV4cCI6MTcxODczMTUyMywiaWF0IjoxNzE4NzI3OTIzLCJqdGkiOiJjZGUyZmNiMy0yNTU5LTQ2YzQtOThhYS1kZjgzMmNjMTNiYWQiLCJ1c2VybmFtZSI6ImNodXJjaC1hY2NvdW50LW9wZW5pZF8wMHUxd3hkZ2tvcG5keHUxYzM1NyJ9.wDk3fQJa-_nO9of5Xui-XQZudFgb9pXNi1zvXTTPmdsRvF78aZtfFSA4nkHtvXsmqrEjben5z8EtK7FV_BHwqjERuoKvLXP1Vg0Lr07Ps13k9mKBPccMGJxBXkr4ZO7eijOReEpSlvFIjRqf3FP6S_4HQNrv54JO1sfAzPuKf3jQT_kJs_LeTj1BlfdfTSNpCDNq0NM0n3s1ra7_vZM5lC44Tq2VL_3YvMnpxH-Q1dvuu_MuaISXbuT2p8ZZj_rYkfn91_OvNzGGwflSJdhRhDxbw--EAeKi53RGnr1HK84L8rIFNaZycyDfn3E4bx89zO0azPSFYHkZ8nxkLWch1A";

        const response = await this.makePostRequest(localizations, updateLocalizationsEndpoint, accessToken);
        console.log("Response", response);
    }

    private static async getLocalizationListFromJson(jsonFilePath: string) {
        const localizationList: LsaLocalization[] = [];
        try {
            const jsonDataFromFile = await fsExtra.readJson(jsonFilePath);
            return jsonDataFromFile;
        } catch (error) {
            console.log(error);
        }
        return localizationList;
    }

    static async makePostRequest(localizations: LsaLocalization[], endpointUrl: string, bearerAccessToken: string): Promise<string> {
        const axiosResponse = await axios.post(endpointUrl, localizations, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${bearerAccessToken}`
            }
        });
        if(axiosResponse.status !== 200) {
            console.log(axiosResponse.data?.message);
        }
        return axiosResponse.data;
    }
}

LoadInJSONCallEndpoint.loadInJSONAndCallEndpoint();
