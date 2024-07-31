# LoadJSONToAPI
A tool to load in any JSON file and send it as a post to an API endpoint of your choice. Also has the capability to GET data from an API endpoint and write it to a file.

## Instructions
The main file in this repo is `loadJSON.ts`. You will be modifying that the path to the json file you would like to read/write and how you want to interact to it. You will also provide an endpointUrl and security token(s) if needed.

When you're ready to run the file, use the command `npm run build` which will build the files. Then run `npm run send` or `npm run get` to run the send file or get file respectively.

NOTE: The `makePostRequest()` function is set to give you a dummy response until you are actually ready to send it to an endpoint. Ensure that the JSON file is read in correctly before attempting to send it. When you are ready, comment out or delete the dummy request.