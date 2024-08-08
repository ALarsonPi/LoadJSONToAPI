export class JSONModificationService {
    static addIdToJsonElement(jsonData: { [key: string]: string|number }, id: number, idName: string, shouldBeString: boolean): void {
        jsonData[idName] = (shouldBeString) ? id.toString() : id;
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