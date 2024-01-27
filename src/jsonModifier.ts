export class JSONModifier {
    static addIdToJsonElement(jsonData: { [key: string]: string }, id: number, idName: string): void {
        jsonData[idName] = id.toString();
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