import axios from 'axios';
import * as fs from 'fs';

class GetJSONFromApi {
    static FILE_PREFIX = './src/json/fromAPI/';

    static async getLocalizations() {
        /* To find your MTC idToken: 
            Log into Embark on web, 
            Look in the network tab, 
            Find 'token' -> Payload, 
            Copy entire 'id-token') 
        */
        const idToken = '';
        const getEndpointUrl = '';

        const returnedData = await this.makeGetRequest(getEndpointUrl, idToken);

        /*
            To write results to a JSON file
        */
        const jsonFilePath = this.FILE_PREFIX + 'exampleJson.json';
        this.writeLocalizationsToFile(returnedData, jsonFilePath);
    }

    static async writeLocalizationsToFile(returnedJSONData: any, filePath: string) {
        const jsonArray = JSON.stringify(returnedJSONData, null, 2);  // Convert the array to a JSON string with 2-space indentation for readability
    
        await fs.writeFile(filePath, jsonArray, 'utf8', (err) => {
            if (err) {
                console.error(`Error writing to file ${filePath}:`, err);
            } else {
                console.log(`Successfully wrote to file ${filePath}`);
            }
        });
    }

    static async makeGetRequest(endpointUrl: string, idToken: string): Promise<any> {
        const axiosResponse = await axios.get(endpointUrl, {
            headers: {
              'Content-Type': 'application/json',
              'Id': `${idToken}`
            }
        });
        return axiosResponse.data;
    }
}

GetJSONFromApi.getLocalizations();
