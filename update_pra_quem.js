const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// The block to replace: From '<p data-start="0"' to the end of the text widget containing 'A planilha <b>Precificação Lucrativa</b> serve'
const startToken = '<div class="elementor-element elementor-element-855424e elementor-widget elementor-widget-text-editor" data-id="855424e" data-element_type="widget" data-widget_type="text-editor.default">';
const endToken = '</div>\n\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>'; // The closing of the widget

const widgetStartIndex = html.indexOf(startToken);
// Find the end of the text editor widget
const widgetContentStart = html.indexOf('<div class="elementor-widget-container">', widgetStartIndex) + '<div class="elementor-widget-container">'.length;
const widgetContentEnd = html.indexOf('</div>', widgetContentStart);

// Clean HTML to inject
const newContent = `
<h3 style="margin-top:0; font-size:1.2em;">🍰 <strong>Gastronomia & Alimentação</strong></h3>
<p>Confeitaria, Hamburguerias, Pizzarias, Bolos por encomenda, Lanchonetes, Marmitarias, Padarias, açaíterias, sorveterias, doces e salgados.</p>

<h3 style="margin-top:1.5em; font-size:1.2em;">👗 <strong>Moda & Costura</strong></h3>
<p>Costura, Moda, Roupas sob medida, Lojas de roupas, Brechós, Outlets, Lojas de calçados.</p>

<h3 style="margin-top:1.5em; font-size:1.2em;">🎁 <strong>Artesanato & Personalizados</strong></h3>
<p>Artesanato, Produtos personalizados, Brindes personalizados, Papelarias com itens personalizados, Gráficas, Impressões sob demanda.</p>

<h3 style="margin-top:1.5em; font-size:1.2em;">🛠️ <strong>Móveis & Produção Manual</strong></h3>
<p>Marcenaria, Móveis sob medida, Produção caseira, Indústria semi-industrial.</p>

<h3 style="margin-top:1.5em; font-size:1.2em;">🧼 <strong>Beleza & Bem-estar</strong></h3>
<p>Sabonetes artesanais, Cosméticos naturais, Perfumaria, Cosméticos, Maquiagens.</p>

<h3 style="margin-top:1.5em; font-size:1.2em;">💍 <strong>Acessórios & Variedades</strong></h3>
<p>Acessórios, Bijuterias, Lojas de presentes, Lojas de variedades.</p>

<h3 style="margin-top:1.5em; font-size:1.2em;">📱 <strong>Tecnologia & Eletrônicos</strong></h3>
<p>Lojas de eletrônicos, Lojas de celulares, revenda de acessórios.</p>

<h3 style="margin-top:1.5em; font-size:1.2em;">🌎 <strong>Importação & Revenda Online</strong></h3>
<p>Importados, Dropshipping, E-commerce, Vendedores de marketplace (Shopee, Mercado Livre, etc.)</p>

<h3 style="margin-top:1.5em; font-size:1.2em;">🧑‍💼 <strong>Empreendedores e Pequenos Negócios</strong></h3>
<p>Microempreendedores (MEIs), Lojas físicas, Lojas virtuais, Empreendedores iniciantes.</p>

<p style="margin-top:1.5em;"><i>A planilha <b>Precificação Lucrativa</b> serve para qualquer negócio, para precificar corretamente tanto produtos de <b>revenda</b> quanto produtos de <b>fabricação Própria.</b></i></p>
`;

html = html.substring(0, widgetContentStart) + newContent + html.substring(widgetContentEnd);

fs.writeFileSync(filePath, html);
console.log('Successfully replaced the "PRA QUEM É A PLANILHA" content block');
