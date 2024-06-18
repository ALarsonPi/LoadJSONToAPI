import axios from 'axios';
import * as fsExtra from 'fs-extra';
import { LsaLocalization } from './LsaLocalization';
import { LsaService } from './LsaService';

class LsaSendLocalizations {
    static FILE_PREFIX = './src/json/lsa';

    static async loadInJSONAndCallEndpoint() {
        // Set these properties
        const jsonFilePath = this.FILE_PREFIX + '/JSON_FILE_NAME.json'; // /json/lsa/YOUR_FILE
        const isProd = false;
        const endpoint = 'save'; // Options: 'update' / 'save'

        const lsaService = new LsaService(isProd);
        const localizations: LsaLocalization[] = await this.getLocalizationListFromJson(jsonFilePath);

        /* 
            See instructions on how to set accessToken in LSA Service
        */
       const accessToken = lsaService.getAccessToken();
       const fullUrl = lsaService.getFullUrl(endpoint);

        const response = await this.makePostRequest(localizations, fullUrl, accessToken);
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

LsaSendLocalizations.loadInJSONAndCallEndpoint();
