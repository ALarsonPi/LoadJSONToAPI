import axios from 'axios';
import * as fsExtra from 'fs-extra';

class LoadInJSONCallEndpoint {
    static FILE_PREFIX = './src/json/';

    static async loadInJSON() {
        try {
            // Load JSON from a file. Please put json files in 'json' folder
            const jsonFilePath = this.FILE_PREFIX + 'missions.json';
            const jsonData = await fsExtra.readJson(jsonFilePath);
            console.log(jsonData);

            // If the JSON is a list of elements
            if(jsonData.length > 1) {
                for(let i = 0; i < jsonData.length; i++) {
                    // Data manipulation (like adding an id if needed) would happen here
                    // this.addIdToJsonElement(jsonData[i], i);
                    console.log(jsonData[i]);

                    this.makePostRequest(jsonData[i]);
                }
            } else {
                // Data manipulation (like adding an id if needed) would happen here
                // this.addIdToJsonElement(jsonData, 0);
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
}

LoadInJSONCallEndpoint.loadInJSON();
