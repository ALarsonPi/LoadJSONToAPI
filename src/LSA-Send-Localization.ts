import axios from 'axios';
import * as fsExtra from 'fs-extra';
import { JSONModifier } from './jsonModifier';
import { LsaLocalization } from './LsaLocalization';

class LoadInJSONCallEndpoint {
    static FILE_PREFIX = './src/json/';

    static async loadInJSONAndCallEndpoint() {
        // Load JSON from a file. Please put json files in 'json' folder
        const jsonFilePath = this.FILE_PREFIX + 'localization-example.json';
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
        const accessToken = "eyJraWQiOiJhNVwvem0zZ1pJSVVjeFZybWhKU0dvWFE3UlNTU1JoNE9wOGd5b3pHa1JwND0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5NTc2MDgwZC1kZmJmLTRmNDYtYTY2OC1jMjQ2ZDc1NzkzOTIiLCJjb2duaXRvOmdyb3VwcyI6WyJ1cy13ZXN0LTJfQ3N5QmwxV0NoX0NodXJjaC1BY2NvdW50LU9wZW5JRCJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl9Dc3lCbDFXQ2giLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiIyOTFnc21nazc0b2g1cjRyZW5yaDBuYm4zNiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUiLCJhdXRoX3RpbWUiOjE3MTg2Njg5NDcsImV4cCI6MTcxODcyNzg5NiwiaWF0IjoxNzE4NzI0Mjk3LCJqdGkiOiJiMjhjNmZhYy1lYzBmLTQxMzEtOTBjNi0yNmY0NjEwOGJjNjgiLCJ1c2VybmFtZSI6ImNodXJjaC1hY2NvdW50LW9wZW5pZF8wMHUxd3hkZ2tvcG5keHUxYzM1NyJ9.Bu2lCMi4k5lVHC7NO75Y83xbKMt9ZyO00JKV24m-CsMOWS12O17rD7mcDSi3idY8ahPk4MfSG_mBcSA1Kl__yILXYczd7qPWRuNT0nZNgqVdUidQDYARyK9vtmEZuvrxcl5aIJO1UbZmjkIww7SlcDlPq4TJGlEN7oZMEgYuRVDLFnMf8sHOEk7o6mgMLaKE_P2St8Ijws2RWfAPpVCFXTNMxvkACS6lBxOvzH6ITt3kxBBwikNwqM1VFiStBMUPiEOSuxjIpqY_HU5cdC76uWkyOYcS1oVsCwbfjtXrzbAcYSFBk-In7-TFoxyVCEUuKtGKdh8Dd0mkUSkh1_kTKA";

        const response = await this.makePostRequest(localizations, saveNewLocalizationsEndpoint, accessToken);
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
