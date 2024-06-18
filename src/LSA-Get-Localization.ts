import axios from 'axios';
import { LsaLocalization } from './LsaLocalization';

class LsaGetLocalization {
    static FILE_PREFIX = './src/json/';

    static async getLocalizations() {
        const DEV_HOST = 'https://api.test.lang.mtc.byu.edu/lsa/v1';
        const PROD_HOST = 'https://api.lang.mtc.byu.edu/lsa/v1';
        const findAllEndpointUrl = DEV_HOST + '/localization/item/findAll';
        const updateAllEndpointUrl = DEV_HOST + '/localization/item/updateAll';

        /* To find your MTC auth token: 
            Log into Embark on web, 
            Look in the network tab, 
            Find 'token' -> Payload, 
            Copy entire 'access-token') 
        */
        const accessToken = "eyJraWQiOiJhNVwvem0zZ1pJSVVjeFZybWhKU0dvWFE3UlNTU1JoNE9wOGd5b3pHa1JwND0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5NTc2MDgwZC1kZmJmLTRmNDYtYTY2OC1jMjQ2ZDc1NzkzOTIiLCJjb2duaXRvOmdyb3VwcyI6WyJ1cy13ZXN0LTJfQ3N5QmwxV0NoX0NodXJjaC1BY2NvdW50LU9wZW5JRCJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl9Dc3lCbDFXQ2giLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiIyOTFnc21nazc0b2g1cjRyZW5yaDBuYm4zNiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUiLCJhdXRoX3RpbWUiOjE3MTg2Njg5NDcsImV4cCI6MTcxODcyNzg5NiwiaWF0IjoxNzE4NzI0Mjk3LCJqdGkiOiJiMjhjNmZhYy1lYzBmLTQxMzEtOTBjNi0yNmY0NjEwOGJjNjgiLCJ1c2VybmFtZSI6ImNodXJjaC1hY2NvdW50LW9wZW5pZF8wMHUxd3hkZ2tvcG5keHUxYzM1NyJ9.Bu2lCMi4k5lVHC7NO75Y83xbKMt9ZyO00JKV24m-CsMOWS12O17rD7mcDSi3idY8ahPk4MfSG_mBcSA1Kl__yILXYczd7qPWRuNT0nZNgqVdUidQDYARyK9vtmEZuvrxcl5aIJO1UbZmjkIww7SlcDlPq4TJGlEN7oZMEgYuRVDLFnMf8sHOEk7o6mgMLaKE_P2St8Ijws2RWfAPpVCFXTNMxvkACS6lBxOvzH6ITt3kxBBwikNwqM1VFiStBMUPiEOSuxjIpqY_HU5cdC76uWkyOYcS1oVsCwbfjtXrzbAcYSFBk-In7-TFoxyVCEUuKtGKdh8Dd0mkUSkh1_kTKA";

        const localizations: LsaLocalization[] = await this.makeGetRequest(findAllEndpointUrl, accessToken);

        const desiredLocalizationId = '';
        const desiredSortIndex = '400';
        const desiredEnglishText = 'This is a test';

        if(localizations.length > 0) {
            if(desiredLocalizationId) {
                const localization = this.getLocalizationById(localizations, desiredLocalizationId);
                console.log("Localization Id Search found:", localization);
            }
            if(desiredSortIndex) {
                const localization = this.getLocalizationBySortIndex(localizations, desiredSortIndex);
                console.log("Sort Index Search found:", localization);
            } 
            if(desiredEnglishText) {
                const localization = this.getFirstLocalizationWhereEnglishTextIncludes(localizations, desiredEnglishText);
                console.log("English Text Search found:", localization);
            }
        }
    }

    private static getLocalizationById(localizations: LsaLocalization[], id: string): LsaLocalization | undefined {
        return localizations.find(localization => localization.localizationId === id);
    }

    private static getLocalizationBySortIndex(localizations: LsaLocalization[], sortIndex: string): LsaLocalization | undefined {
        return localizations.find(localization => localization.sortIndex === sortIndex);
    }

    private static getFirstLocalizationWhereEnglishTextIncludes(localizations: LsaLocalization[], englishText: string): LsaLocalization | undefined {
        return localizations.find(localization => localization.en_US.includes(englishText));
    }

    static async makeGetRequest(endpointUrl: string, bearerAccessToken: string): Promise<LsaLocalization[]> {
        const axiosResponse = await axios.get(endpointUrl, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${bearerAccessToken}`
            }
        });
        return axiosResponse.data;
    }
}

LsaGetLocalization.getLocalizations();
