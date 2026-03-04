const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// Replace the class name so Elementor's CSS (which sets font-family: "Font Awesome 5 Free") doesn't apply to the wrapper.
html = html.replace(/<span class="elementor-icon-list-icon">/gi, '<span class="custom-icon-wrapper" style="font-family: sans-serif;">');

fs.writeFileSync(filePath, html);
console.log('Removed offending Elementor font-family classes from icon wrappers');
