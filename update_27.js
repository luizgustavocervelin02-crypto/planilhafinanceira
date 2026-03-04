const fs = require('fs');

const file = 'c:\\Users\\luizg\\Desktop\\PAGINA nova\\index.html';
let html = fs.readFileSync(file, 'utf8');

// Find the segment with R$27
const idx = html.indexOf('R$27');
if (idx > -1) {
    // Find the next button element after R$27
    const btnStart = html.indexOf('<a class="elementor-button elementor-button-link', idx);
    if (btnStart > -1) {
        const hrefEnd = html.indexOf('"', html.indexOf('href="', btnStart) + 'href="'.length);
        const hrefStart = html.indexOf('href="', btnStart) + 'href="'.length;

        // Replace href
        html = html.substring(0, hrefStart) + 'https://pay.lowify.com.br/checkout.php?product_id=ggkAaS' + html.substring(hrefEnd);
        fs.writeFileSync(file, html);
        console.log('Successfully updated the R$27 offer button checkout link.');
    } else {
        console.log('Could not find the button after R$27');
    }
} else {
    console.log('Could not find R$27 in the document.');
}
