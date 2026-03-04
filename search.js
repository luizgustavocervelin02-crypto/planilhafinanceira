const fs = require('fs');

const html = fs.readFileSync('c:\\Users\\luizg\\Desktop\\PAGINA nova\\index.html', 'utf8');

const snips = [
    "Empreendedores",
    "PRA QUEM",
    "Microempreendedores",
    "Receba"
];

let found = false;
for (const phrase of snips) {
    const i = html.indexOf(phrase);
    if (i > -1) {
        console.log(`Found "${phrase}" at index ${i}`);
        console.log(html.substring(Math.max(0, i - 100), i + 200));
        found = true;
    } else {
        console.log(`Did not find "${phrase}"`);
    }
}

if (!found) {
    console.log("None of the phrases were found.");
}
