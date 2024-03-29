import axios from 'axios';
import * as fsExtra from 'fs-extra';
import { JSONModifier } from './jsonModifier';

class LoadInJSONCallEndpoint {
    static FILE_PREFIX = './src/json/';

    static async loadInJSONAndCallEndpoint() {
        // Load JSON from a file. Please put json files in 'json' folder
        const jsonFilePath = this.FILE_PREFIX + 'exampleJson.json';

        /* To find your MTC idToken: 
            Log into Embark on web, 
            Look in the network tab, 
            Find 'token' -> Payload, 
            Copy entire 'id-token') 
        */
        const idToken = '';
        const endpointUrl = '';

        // Set to true if you want to modify the JSON (changing property names)
        const shouldChangePropertyNames = false; 

        /* If you set 'shouldChangePropertyNames' to true, these will be the changes.
            Provide a list of 2 strings for each property you want to change, for example:
            ["section", "scenarioGroup"] (will change 'section' attribute to 'scenarioGroup')
            ["originalPropertyName", "modifiedPropertyName"]
        */
        const jsonPropertyNameChanges = [
            [],
            []
        ];

        /* If true, an [id] attribute will be added to the JSON. While going through the for loop,
            the id will be set as the index of the loop. The id will be a string and will be named
            [idName]
        */
        const shouldAddIndexAsId = false;
        const indexShouldBeString = true;
        const idName = "id";

        try {
            const jsonDataFromFile = await fsExtra.readJson(jsonFilePath);
            const jsonList = (jsonDataFromFile.length === 1) ? [jsonDataFromFile] : jsonDataFromFile;

            const startingIndex = 0;
            const endingIndex = jsonList.length;
            for(let i = startingIndex; i < endingIndex; i++) {
                if(shouldChangePropertyNames) {
                    JSONModifier.changePropertyNames(jsonList[i], jsonPropertyNameChanges);
                }
                if(shouldAddIndexAsId) {
                    JSONModifier.addIdToJsonElement(jsonList[i], i, idName, indexShouldBeString);
                }

                const postResponse = await this.makePostRequest(jsonList[i], endpointUrl, idToken);
                console.log("Response Retrieved", postResponse);
            }
        } catch (error) {
            console.log(error);
        }
    }

    static async makePostRequest(jsonData: JSON, endpointUrl: string, idToken: string): Promise<string> {
        console.log("Sending", jsonData);

        // This is a dummy post URL, which will send you back whatever you POST
        // Note that with this Dummy URL an id will be auto generated by the site 
        // (overriding an id if you have one already)
        const dummyApiUrl = 'https://jsonplaceholder.typicode.com/posts'; 
        const dummyAxiosResponse = await axios.post(dummyApiUrl, jsonData);
        return dummyAxiosResponse.data;

        // Update with your actual Construct Lambda Url
        const axiosResponse = await axios.post(endpointUrl, jsonData, {
            headers: {
              'Content-Type': 'application/json',
              'Id': `${idToken}`
            }
        });
        return axiosResponse.data;
    }
}

LoadInJSONCallEndpoint.loadInJSONAndCallEndpoint();
