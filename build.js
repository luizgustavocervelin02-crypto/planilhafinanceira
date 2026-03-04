const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'index.original.html');
const destPath = path.join(__dirname, 'index.html');

let html = fs.readFileSync(srcPath, 'utf8');

// 1. Remove wpEmojiSettings
html = html.replace(/<script>[\s\S]*?window\._wpemojiSettings[\s\S]*?<\/script>/gi, '');

// 2. Remove emoji styles
html = html.replace(/<style id='wp-emoji-styles-inline-css'>[\s\S]*?<\/style>/gi, '');

// 3. Remove PixelYourSite and related tracking
html = html.replace(/<script[^>]*id=['"]pys-version-script['"][\s\S]*?<\/script>/gi, '');
html = html.replace(/<script[^>]*id=['"]pys-js-extra['"][\s\S]*?<\/script>/gi, '');
html = html.replace(/<script[^>]*src=['"][^'"]*pixelyoursite[\s\S]*?<\/script>/gi, '');

// 4. Remove Google Tag Manager prefetch 
html = html.replace(/<link rel='dns-prefetch' href='\/\/www\.googletagmanager\.com' \/>/gi, '');

// Create the popup html block
const popupHtml = `
<!-- CUSTOM PREMIUM PURCHASE POPUP -->
<style>
/* Modern Purchase Popup */
.purchase-popup {
    position: fixed;
    bottom: 20px;
    left: 20px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.8);
    box-shadow: 0 10px 30px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.1);
    border-radius: 12px;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 999999;
    transform: translateY(150px) scale(0.9);
    opacity: 0;
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    max-width: 320px;
    font-family: 'Manrope', sans-serif;
    color: #333;
}

.purchase-popup.show {
    transform: translateY(0) scale(1);
    opacity: 1;
}

.purchase-popup .popup-image {
    width: 60px;
    height: 60px;
    border-radius: 8px;
    object-fit: cover;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.purchase-popup .popup-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.purchase-popup .popup-name {
    margin: 0;
    font-weight: 700;
    font-size: 14px;
    line-height: 1.3;
    color: #111;
}

.purchase-popup .popup-action {
    margin: 2px 0;
    font-size: 13px;
    color: #15F900;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.purchase-popup .popup-time {
    margin: 0;
    font-size: 11px;
    color: #777;
    font-weight: 600;
}

@media (max-width: 768px) {
    .purchase-popup {
        left: 50%;
        transform: translate(-50%, 150px) scale(0.9);
        width: 85%;
        bottom: 15px;
    }
    .purchase-popup.show {
        transform: translate(-50%, 0) scale(1);
    }
}
</style>

<div id="custom-purchase-popup" class="purchase-popup hidden">
  <img src="https://empresaorganizada.com/wp-content/uploads/2025/05/mockup-3-pnf-150x150.webp" alt="Planilha de Precificação" class="popup-image">
  <div class="popup-content">
    <p class="popup-name"><span id="popup-buyer-name">Maria</span> de <span id="popup-buyer-location">São Paulo, SP</span></p>
    <p class="popup-action">COMPROU A PLANILHA</p>
    <p class="popup-time">Há poucos segundos...</p>
  </div>
</div>

<script>
document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("custom-purchase-popup");
    const nameEl = document.getElementById("popup-buyer-name");
    const locationEl = document.getElementById("popup-buyer-location");
    
    // Arrays for dynamic data
    const buyers = [
        "Maria", "João", "Ana", "Pedro", "Juliana", "Carlos", "Fernanda", "Rafael", 
        "Camila", "Lucas", "Beatriz", "Marcos", "Patrícia", "Gabriel", "Aline", "Diogo",
        "Luíza", "Gustavo", "Amanda", "Felipe", "Vanessa", "Bruno", "Larissa", "Thiago",
        "Gabriela", "Diego", "Letícia", "Eduardo", "Carolina", "Leonardo"
    ];
    
    const locations = [
        "São Paulo, SP", "Rio de Janeiro, RJ", "Belo Horizonte, MG", "Curitiba, PR", 
        "Porto Alegre, RS", "Brasília, DF", "Salvador, BA", "Fortaleza, CE", 
        "Recife, PE", "Goiânia, GO", "Campinas, SP", "Vitória, ES", "Florianópolis, SC",
        "Manaus, AM", "Belém, PA", "Maringá, PR", "Londrina, PR", "Joinville, SC",
        "Ribeirão Preto, SP", "Uberlândia, MG", "Cuiabá, MT", "Campo Grande, MS"
    ];

    function getRandomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function showPopup() {
        // Update popup text components
        nameEl.textContent = getRandomItem(buyers);
        locationEl.textContent = getRandomItem(locations);
        
        // Show popup
        popup.classList.add("show");
        
        // Dismiss after 5 seconds
        setTimeout(() => {
            popup.classList.remove("show");
        }, 5000);
    }
    
    // Start sequence
    setTimeout(() => {
        showPopup();
        // The popup stays visible for 5s, so to have it show up 
        // every 10 seconds total, we fire it every 10s.
        setInterval(showPopup, 10000);
    }, 2000); // Wait 2s on load before showing the first one
});
</script>
</body>`;

// Inject before </body>
html = html.replace('</body>', popupHtml);

// Fix relative URLs that might be referencing the original site's root instead of absolute
html = html.replace(/href="\/(wp-[^"]+)"/g, 'href="https://empresaorganizada.com/$1"');
html = html.replace(/src="\/(wp-[^"]+)"/g, 'src="https://empresaorganizada.com/$1"');

fs.writeFileSync(destPath, html);
console.log('Build completed, index.html successfully generated.');
