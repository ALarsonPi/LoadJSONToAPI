import axios from 'axios';
import { LsaLocalization } from './LsaLocalization';
import { LsaService } from './LsaService';
import * as fs from 'fs';

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

        /* 
            If you want to search for a specific index, localizationId, or english text
        */
        // const searchLocalizationId = '';
        // const searchSortIndex = '';
        // const searchEnglishText = '';
        // const exactMacth = true;
        // this.searchAndPrintLocalizations(localizations, searchLocalizationId, searchSortIndex, searchEnglishText, exactMacth);


        /*
            To write results to a JSON file
        */
        const filePath = lsaService.getWriteJsonFilePath();
        this.writeLocalizationsToFile(localizations, filePath);

        /* 
            Helpful Statistics
        */
        console.log("Localizations found ", localizations.length);
        console.log("Max sort index ", this.getMaxSortIndex(localizations));
    }

    static async writeLocalizationsToFile(localizations: LsaLocalization[], filePath: string) {
        const jsonArray = JSON.stringify(localizations, null, 2);  // Convert the array to a JSON string with 2-space indentation for readability
    
        await fs.writeFile(filePath, jsonArray, 'utf8', (err) => {
            if (err) {
                console.error(`Error writing to file ${filePath}:`, err);
            } else {
                console.log(`Successfully wrote to file ${filePath}`);
            }
        });
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

    private static searchAndPrintLocalizations(localizations: LsaLocalization[], searchLocalizationId: string, searchSortIndex: string, searchEnglishText: string, exactMatch?: boolean) {
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
                let localization;
                if(exactMatch) {
                    localization = this.getExactMatchForEnglishText(localizations, searchEnglishText);
                } else {
                    localization = this.getFirstLocalizationWhereEnglishTextIncludes(localizations, searchEnglishText);
                }
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

    private static getExactMatchForEnglishText(localizations: LsaLocalization[], englishText: string): LsaLocalization | undefined {
        return localizations.find((localization)=> localization.en_US.toLowerCase() === englishText.toLowerCase());
    }

    private static getFirstLocalizationWhereEnglishTextIncludes(localizations: LsaLocalization[], englishText: string): LsaLocalization | undefined {
        const textToCompare = englishText.toLowerCase();
        for(let i= 0; i < localizations.length; i++) {
            const text = localizations[i].en_US.toLowerCase();
            if(text.includes(textToCompare)) {
                return localizations[i];
            }
        }
        return undefined;
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
