const fs = require('fs');

const file = 'c:\\Users\\luizg\\Desktop\\PAGINA nova\\index.html';
let html = fs.readFileSync(file, 'utf8');

const pixelCode = `
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1152878600150555');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=1152878600150555&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->
`;

const idx = html.indexOf('</head>');
if (idx > -1) {
    html = html.substring(0, idx) + pixelCode + html.substring(idx);
    fs.writeFileSync(file, html);
    console.log("Meta Pixel injected successfully.");
} else {
    console.log("Could not find </head> tag.");
}
