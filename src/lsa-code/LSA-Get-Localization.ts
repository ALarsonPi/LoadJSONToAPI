import axios from 'axios';
import { LsaLocalization } from './LsaLocalization';
import { LsaService } from './LsaService';

class LsaGetLocalization {
    static async getLocalizations() {
        const isProd = false;
        const endpoint = 'findAll'; // Options: 'findAll' / 'updateAll'

        const lsaService = new LsaService(isProd);

        /* 
            See instructions on how to set accessToken in LSA Service
        */
       const accessToken = lsaService.getAccessToken();
       const fullUrl = lsaService.getFullUrl(endpoint);

        const localizations: LsaLocalization[] = await this.makeGetRequest(fullUrl, accessToken);

        const searchLocalizationId = '';
        const searchSortIndex = '';
        const searchEnglishText = '';
        this.searchAndPrintLocalizations(localizations, searchLocalizationId, searchSortIndex, searchEnglishText);

        console.log("Localizations found ", localizations.length);
        console.log("Max sort index ", this.getMaxSortIndex(localizations));
    }

    private static getMaxSortIndex(localizations: LsaLocalization[]) {
        let max = 0;
        for(let i = 0; i < localizations.length; i++) {
            const currentSortIndex = Number(localizations[i].sortIndex);
            if(currentSortIndex > max) {
                max = currentSortIndex;
            }
        }
        return max;
    }

    private static searchAndPrintLocalizations(localizations: LsaLocalization[], searchLocalizationId: string, searchSortIndex: string, searchEnglishText: string) {
        if(localizations.length > 0) {
            if(searchLocalizationId) {
                const localization = this.getLocalizationById(localizations, searchLocalizationId);
                console.log("Localization Id Search found:", localization);
            }
            if(searchSortIndex) {
                const localization = this.getLocalizationBySortIndex(localizations, searchSortIndex);
                console.log("Sort Index Search found:", localization);
            } 
            if(searchEnglishText) {
                const localization = this.getFirstLocalizationWhereEnglishTextIncludes(localizations, searchEnglishText);
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
