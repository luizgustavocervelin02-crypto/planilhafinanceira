const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// Replace FontAwesome checkmarks with a green Unicode checkmark inside a span
// Original html: <i aria-hidden="true" class="fas fa-check-circle"></i>
const checkCircleSpan = '<span style="color: #00d23a; font-size: 1.1em; margin-right: 8px;">✅</span>';
html = html.replace(/<i aria-hidden="true" class="fas fa-check-circle"><\/i>/gi, checkCircleSpan);

// Some list items use fa-times-circle (the red X)
const xCircleSpan = '<span style="color:red; font-size: 1.1em; margin-right: 8px;">❌</span>';
html = html.replace(/<i aria-hidden="true" class="fas fa-times-circle"><\/i>/gi, xCircleSpan);

// Remove the external fontawesome stylesheets as they are broken due to CORS and no longer needed
// We'll leave them in case other page elements use them, but these two main list icons were the visible issue.

fs.writeFileSync(filePath, html);
console.log('Fixed fontawesome icons with Unicode replacements');
