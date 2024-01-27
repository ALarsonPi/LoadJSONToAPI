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
                this.addIdToJsonElement(jsonData, 0);
                this.changePropertyNamesForJSON(jsonData);
                this.makePostRequest(jsonData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    static async makePostRequest(jsonData: JSON): Promise<string> {
        const dummyApiUrl = 'https://jsonplaceholder.typicode.com/posts'; 
        const dummyAxiosResponse = await axios.post(dummyApiUrl, jsonData);
        // This will be your AWS lambda url
        // It is currently a dummy post URL, which will send you back whatever you POST
        // with a fake 'id'
        
        const apiUrl = 'https://3b8q7d9jd4.execute-api.us-east-2.amazonaws.com/prod/missions'; 
        // const axiosResponse = await axios.post(apiUrl, jsonData);
        const idToken = "eyJraWQiOiJDZmwyT0tERCs0VHBcL05jcGJvMWxNcGNsRnhOM0RpWTh5MXFaZjhrQmE2TT0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoib1NwOGlNYnE5YmJQQU1hVjhFWnZTdyIsImN1c3RvbTpsZHNhY2NvdW50aWQiOiIzNjE4NTA2OTIzNDYxNzc3Iiwic3ViIjoiYzk2ZjBiZGEtYjk3Zi00NzE2LTgxODItNTIyNmQwZjI5Y2EwIiwiY29nbml0bzpncm91cHMiOlsidXMtd2VzdC0yX2Y0SFp2RHpwal9DaHVyY2gtQWNjb3VudC1PcGVuSUQiLCJ0YWxsLWFkbWluIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tXC91cy13ZXN0LTJfZjRIWnZEenBqIiwiY29nbml0bzp1c2VybmFtZSI6ImNodXJjaC1hY2NvdW50LW9wZW5pZF8wMHUxd3hkZ2tvcG5keHUxYzM1NyIsImdpdmVuX25hbWUiOiJBbGVjIFJpY2hhcmQiLCJub25jZSI6ImN4Z0R5eFBOU0hOaU1aZGRFRzZsRFF6OTlnT1BGWE5BUGZmZW92YlhLVDNWS2ZQMnBkaU0yM3AtX3B5TXVmZDFQSWFldVRqMjVSREswUGtxMmhvQ2JiZVF4MV9lRzlNT29uanpuRXlDdEZRczBXaHh6cEFTTi1URE9VeVRfN0ZtOFFUNFBKdzBnM2tsWWg2S2hkdmlYNGwzQlBKQjc1RDhTeDdEUFcxcVRQZyIsImF1ZCI6IjczZTJ0ZGphNWhpZHZkMnY5MWJwZmFsaG9wIiwiaWRlbnRpdGllcyI6W3sidXNlcklkIjoiMDB1MXd4ZGdrb3BORHhVMUMzNTciLCJwcm92aWRlck5hbWUiOiJDaHVyY2gtQWNjb3VudC1PcGVuSUQiLCJwcm92aWRlclR5cGUiOiJPSURDIiwiaXNzdWVyIjpudWxsLCJwcmltYXJ5IjoidHJ1ZSIsImRhdGVDcmVhdGVkIjoiMTY3Mzk3MTE0MDAxMCJ9XSwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3MDYzMDUwNDEsImV4cCI6MTcwNjMwODY0MSwiaWF0IjoxNzA2MzA1MDQxLCJmYW1pbHlfbmFtZSI6IkxhcnNvbiIsImVtYWlsIjoiYWxhcnNvbnBpQGdtYWlsLmNvbSJ9.JP4nrEjQmrOd9CxpOH_pl-E_Bhn83V37NgQ7NMkgALtRHkatAHDsfNBS8pKWMrLv_jzSDl8YA9UMdHCoNgWpeu9R2CFNEZXL65oo53yUvalQzyhquZkvPAvKLP0ZGU3eZphjP5WZy4pfDTemI26Av2v4tMWQXZPCfSk4yvMEbVjxEwu-PDY1WC1FNkivkLRGFyFEou4vN337UjtX4sScg8txS5agibe8Rv4OBKR8SW0-kP5OOA2_oJqHrl8GGXbqLZ0h-_ru_WoqD-2hE4EcxVBZ9yDDDfBvYpPlcaDMTdv-ISfIjDK7CztCpkJj_KPE57xkiV2ctjFDyUs-E3AsMw";
        const axiosResponse = await axios.post(apiUrl, jsonData, {
            headers: {
              'Content-Type': 'application/json',
              'Id': `${idToken}`
            }
        });

        // console.log('Response:', axiosResponse.data);
        return axiosResponse.data;
    }

    static addIdToJsonElement(jsonData: { [key: string]: string }, id: number): void {
        jsonData.id = id.toString();
    }

    static changePropertyNamesForJSON(jsonData: { [key: string]: string }) {
        const propertyNamesYouWantToChange = [
            ["id", "missionId"]
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
