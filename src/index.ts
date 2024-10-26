import type { ApiResponse, Person } from "./types";
import { writeFile } from "fs";

async function getPeopleFromAPI(quantity=1000, locale="pt_BR") : Promise<ApiResponse> {
    const url = new URL("https://fakerapi.it/api/v2/persons");
    url.searchParams.append("_locale", locale);
    url.searchParams.append("_quantity", quantity.toString());

    const response = await fetch(url);
    return await response.json() as ApiResponse;
}

async function makeContatcsFile(data: Person[]): Promise<void> {
    const headers = ["NOME", "NÚMERO"];
    const headerString = `${headers.join(',')}\n`;
    const rows = data.map(row => `${row.firstname},${row.phone}`).join('\n');

    const content = headerString + rows;

    writeFile('contacts.csv', content, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Done! Creaate file with ${data.length} contacts`);
        }
    });
}

(async () => {
    const apiResponse = await getPeopleFromAPI();
    await makeContatcsFile(apiResponse.data);
})();
