import type { Person } from "./types";
import { faker, Faker, pt_BR } from '@faker-js/faker';
import { writeFile } from "fs";


function getFromFaker(quantity=1000) : Person[] {
  const customFaker = new Faker({locale: pt_BR});

  const data = [] as Person[];

  for(let i = 0; i < quantity; i++) {
    const firstname = customFaker.person.firstName();
    const phone = customFaker.phone.number({style: "international"});

    data.push({firstname, phone});
  }

  return data;
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
    const data = getFromFaker(1000);
    await makeContatcsFile(data);
})();
