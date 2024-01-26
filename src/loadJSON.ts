import axios from 'axios';
import * as fsExtra from 'fs-extra';

class LoadInJSONCallEndpoint {
    static FILE_PREFIX = './src/json/';

    static async loadInJSON() {
        try {
            // Load JSON from a file. Please put json files in 'json' folder
            const jsonFilePath = this.FILE_PREFIX + 'exampleJson.json';
            const jsonData = await fsExtra.readJson(jsonFilePath);
            console.log(jsonData);

            // If the JSON is a list of elements
            if(jsonData.length > 1) {
                const startingIndex = 0;
                const endingIndex = jsonData.length;
                for(let i = startingIndex; i < endingIndex; i++) {
                    // Data manipulation (like adding an id if needed) would happen here
                    this.addIdToJsonElement(jsonData[i], i);
                    this.changePropertyNamesForJSON(jsonData[i]);
                    console.log(jsonData[i]);

                    this.makePostRequest(jsonData[i]);
                }
            } else {
                // Data manipulation (like adding an id if needed) would happen here
                // this.addIdToJsonElement(jsonData, 0);
                // this.changePropertyNamesForJSON(jsonData[0]);
                this.makePostRequest(jsonData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    static async makePostRequest(jsonData: JSON): Promise<string> {
        // This will be your AWS lambda url
        // It is currently a dummy post URL, which will send you back whatever you POST
        // with a fake 'id'
        const apiUrl = 'https://jsonplaceholder.typicode.com/posts'; 
        const axiosResponse = await axios.post(apiUrl, jsonData);
        // console.log('Response:', axiosResponse.data);
        return axiosResponse.data;
    }

    static addIdToJsonElement(jsonData: { [key: string]: string }, id: number): void {
        jsonData.id = id.toString();
    }

    static changePropertyNamesForJSON(jsonData: { [key: string]: string }) {
        const propertyNamesYouWantToChange = [
            ["originalPropertyName1", "modifiedPropertyName1"],
            ["originalPropertyName2", "modifiedPropertyName2"],
            ["originalPropertyName3", "modifiedPropertyName3"]
        ];
        this.changePropertyNames(jsonData, propertyNamesYouWantToChange);
    }

    static changePropertyNames(jsonData: { [key: string]: string }, propertyNames: string[][]) {
        propertyNames.forEach(pair => {
            const [originalName, modifiedName] = pair;
            if(!jsonData.hasOwnProperty(originalName)) {
                console.error("JSON data doesn't have an attribute called ", originalName);
                return;
            }
            
            const data = jsonData[originalName];
            jsonData[modifiedName] = data;
            delete jsonData[originalName];
        });
    }
}

LoadInJSONCallEndpoint.loadInJSON();
