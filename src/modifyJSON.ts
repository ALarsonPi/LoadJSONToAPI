import * as fs from 'fs';
import * as fsExtra from 'fs-extra';

class JSONtoJSON {

    static async readModifyWrite() {
        const readFileName = "mission_data_json.json";
        const readFilePath = "./src/json/" + readFileName;

        const writeFileName = "modified_" + readFileName;
        const writeFilePath = "./src/json/" + writeFileName;

        const jsonData = await this.readJSONFromFile(readFilePath);

        // Modify Data
        const modifiedJsonData = jsonData;

        await this.writeToFile(modifiedJsonData, writeFilePath);
    }

    static async readJSONFromFile(filePath: string): Promise<any> {
        try {
            const jsonDataFromFile = await fsExtra.readJson(filePath);
            return jsonDataFromFile;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    static async writeToFile(jsonData: any, filePath: string) {
        const jsonArray = JSON.stringify(jsonData, null, 2);  // Convert the array to a JSON string with 2-space indentation for readability

        await fs.writeFile(filePath, jsonArray, 'utf8', (err) => {
            if (err) {
                console.error(`Error writing to file ${filePath}:`, err);
            } else {
                console.log(`Successfully wrote to file ${filePath}`);
            }
        });
    }
}

JSONtoJSON.readModifyWrite();