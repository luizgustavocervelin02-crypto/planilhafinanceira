const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Fix emojis (replace the broken <img> tags with actual unicode ✅ or ▶)
html = html.replace(/<img[^>]*class="emoji"[^>]*alt="▶"[^>]*>/gi, '▶');
html = html.replace(/<img[^>]*class="emoji"[^>]*alt="✅"[^>]*>/gi, '✅');
html = html.replace(/<img[^>]*class="emoji"[^>]*alt="⭐"[^>]*>/gi, '⭐');
html = html.replace(/<img[^>]*class="emoji"[^>]*alt="🔥"[^>]*>/gi, '🔥');
html = html.replace(/<img[^>]*class="emoji"[^>]*alt="👇"[^>]*>/gi, '👇');
html = html.replace(/<img[^>]*class="emoji"[^>]*alt="🎁"[^>]*>/gi, '🎁');

// 2. Fix the Bonus image src attributes that might be missing the absolute prefix
// Wait, the images in the screenshots appear to be broken/invisible padding. 
// Let's re-run the absolutize logic just in case there were other src formats missed.
html = html.replace(/src="wp-content/g, 'src="https://empresaorganizada.com/wp-content');
html = html.replace(/srcset="wp-content/g, 'srcset="https://empresaorganizada.com/wp-content');
html = html.replace(/href="wp-content/g, 'href="https://empresaorganizada.com/wp-content');

// Some lazyloaded images use data-src or data-lazy-src
html = html.replace(/data-src="\/wp-content/g, 'data-src="https://empresaorganizada.com/wp-content');
html = html.replace(/data-src="wp-content/g, 'data-src="https://empresaorganizada.com/wp-content');

// Some Elementor background images use inline styles: style="background-image: url('wp-content/...')"
html = html.replace(/url\(\'\/wp-content/gi, 'url(\'https://empresaorganizada.com/wp-content');
html = html.replace(/url\(\"\/wp-content/gi, 'url("https://empresaorganizada.com/wp-content');

fs.writeFileSync(filePath, html);
console.log('Fixed emojis and bonus images');
