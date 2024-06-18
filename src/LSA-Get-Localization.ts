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
        const accessToken = "eyJraWQiOiJhNVwvem0zZ1pJSVVjeFZybWhKU0dvWFE3UlNTU1JoNE9wOGd5b3pHa1JwND0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5NTc2MDgwZC1kZmJmLTRmNDYtYTY2OC1jMjQ2ZDc1NzkzOTIiLCJjb2duaXRvOmdyb3VwcyI6WyJ1cy13ZXN0LTJfQ3N5QmwxV0NoX0NodXJjaC1BY2NvdW50LU9wZW5JRCJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl9Dc3lCbDFXQ2giLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiIyOTFnc21nazc0b2g1cjRyZW5yaDBuYm4zNiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUiLCJhdXRoX3RpbWUiOjE3MTg2Njg5NDcsImV4cCI6MTcxODczMTUyMywiaWF0IjoxNzE4NzI3OTIzLCJqdGkiOiJjZGUyZmNiMy0yNTU5LTQ2YzQtOThhYS1kZjgzMmNjMTNiYWQiLCJ1c2VybmFtZSI6ImNodXJjaC1hY2NvdW50LW9wZW5pZF8wMHUxd3hkZ2tvcG5keHUxYzM1NyJ9.wDk3fQJa-_nO9of5Xui-XQZudFgb9pXNi1zvXTTPmdsRvF78aZtfFSA4nkHtvXsmqrEjben5z8EtK7FV_BHwqjERuoKvLXP1Vg0Lr07Ps13k9mKBPccMGJxBXkr4ZO7eijOReEpSlvFIjRqf3FP6S_4HQNrv54JO1sfAzPuKf3jQT_kJs_LeTj1BlfdfTSNpCDNq0NM0n3s1ra7_vZM5lC44Tq2VL_3YvMnpxH-Q1dvuu_MuaISXbuT2p8ZZj_rYkfn91_OvNzGGwflSJdhRhDxbw--EAeKi53RGnr1HK84L8rIFNaZycyDfn3E4bx89zO0azPSFYHkZ8nxkLWch1A";

        const localizations: LsaLocalization[] = await this.makeGetRequest(findAllEndpointUrl, accessToken);

        const desiredLocalizationId = '';
        const desiredSortIndex = '';
        const desiredEnglishText = 'Yes, include';

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
