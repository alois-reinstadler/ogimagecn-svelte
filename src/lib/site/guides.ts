export type Block={type:'p';text:string}|{type:'code';code:string;filename?:string}|{type:'list';items:string[]}|{type:'note';title:string;text:string};
export type GuideDoc={title:string;intro:string;sections:{id:string;title:string;blocks:Block[]}[]};
export const guideDocs:Record<string,GuideDoc>={
  einstieg:{title:'Einstieg',intro:'Installiere das Paket und rendere dein erstes Open-Graph-Bild direkt aus einer Svelte-Komponente.',sections:[
    {id:'installation',title:'Installation',blocks:[{type:'code',code:'pnpm add ogimagecn-svelte',filename:'Terminal'}]},
    {id:'rendern',title:'SVG und PNG rendern',blocks:[{type:'p',text:'Der Renderer läuft ausschließlich am Server. Komponenten und Props bleiben vollständig typisiert.'},{type:'code',filename:'og.ts',code:`import { Simple, renderImage } from 'ogimagecn-svelte';

const { svg, png } = await renderImage(Simple, {
  title: 'Svelte-Komponenten, Satori-Ausgabe',
  description: 'Ein deterministisches Open-Graph-Bild.'
});`}]},
    {id:'endpoint',title:'SvelteKit-Endpunkt',blocks:[{type:'code',filename:'src/routes/og/+server.ts',code:`import { Simple, renderImage } from 'ogimagecn-svelte';

export async function GET() {
  const { png } = await renderImage(Simple, { title: 'Hallo SvelteKit' });
  return new Response(png, { headers: { 'content-type': 'image/png' } });
}`},{type:'note',title:'Nur serverseitig',text:'Svelte-SSR, Font-Dateien und @resvg/resvg-js gehören nicht in Browser-Code.'}]}
  ]},
  einsatzfaelle:{title:'Einsatzfälle',intro:'Die API übersetzt strukturierte Daten in reproduzierbare Markenbilder — besonders dort, wo sich Inhalte häufig ändern, das Layout aber kontrolliert bleiben soll.',sections:[
    {id:'passende-aufgaben',title:'Wann die API gut passt',blocks:[
      {type:'p',text:'Der stärkste Einsatzfall ist nicht ein einzelnes Open-Graph-Bild, sondern eine wiederholbare Abbildung: Produkt, Release, Termin oder Kennzahl hinein; geprüftes SVG oder PNG hinaus.'},
      {type:'list',items:['Commerce: Produktname, Preis, Währung, Bild und Kampagnenstatus aus Katalog- oder CMS-Daten.','Automatisierung: Release Notes, Statusseiten und Deployment-Ergebnisse direkt aus einer Pipeline.','Lokalisierung: übersetzte Inhalte, de-AT-Formatierung, Zeitzonen und explizit geladene Schriften.','Personalisierung: Meilensteine, Zertifikate oder Jahresrückblicke als Batch-Job pro Konto.','Content: Artikel-, Podcast- oder Immobilienvorschauen aus bereits vorhandenen Datensätzen.']}
    ]},
    {id:'vorlagen-statt-formen',title:'Vorlagen nach Aufgabe auswählen',blocks:[
      {type:'p',text:'Namen wie Simple, Grid oder Shadcn Registry beschreiben weder den Inhalt noch den Anlass. Die Galerie ordnet deshalb jede stabile API-Komponente einer konkreten Aufgabe zu: etwa Feature-Ankündigung, technischer Deep Dive, Produkt-Launch, Immobilien-Inserat oder Kundengeschichte.'},
      {type:'list',items:['Die Einsatzfall-Bezeichnung hilft bei der Auswahl und darf sich mit besseren Beispielen weiterentwickeln.','Der technische Komponentenname und die Props bleiben kompatibel; bestehende Imports und Registry-URLs ändern sich nicht.','Beispieldaten zeigen eine glaubwürdige Situation statt Platzhaltertext. Bildbasierte Vorlagen verwenden lokale, reproduzierbare Beispielassets.']},
      {type:'note',title:'Vorlage ist nicht Datenmodell',text:'Product kennt Preis und Packshot, Changelog eine Liste von Änderungen, Event Termin und Ort. Wähle die Komponente nach den Daten, die deine Anwendung tatsächlich besitzt — nicht nur nach Farbe oder Form.'}
    ]},
    {id:'commerce',title:'Commerce-Endpunkt',blocks:[
      {type:'p',text:'Ein Produktbild zeigt den Nutzen der typisierten Props besonders klar: Die Anwendung besitzt die Daten bereits und formatiert Preis sowie Verfügbarkeit, bevor sie die visuelle Komponente aufruft.'},
      {type:'code',filename:'src/routes/og/product/[slug]/+server.ts',code:`import { error } from '@sveltejs/kit';
import { Product, renderImage } from 'ogimagecn-svelte';
import { catalog } from '$lib/server/catalog';

export async function GET({ params }) {
  const product = await catalog.getProduct(params.slug);
  if (!product) error(404, 'Produkt nicht gefunden');

  const price = new Intl.NumberFormat('de-AT', {
    style: 'currency',
    currency: product.currency
  }).format(product.price);

  const { png } = await renderImage(Product, {
    brand: 'Nordgrat',
    title: product.name,
    description: product.shortDescription,
    price,
    image: product.imageUrl
  });

  return new Response(png, {
    headers: {
      'content-type': 'image/png',
      'cache-control': 'public, max-age=3600'
    }
  });
}`},
      {type:'note',title:'Assets kontrollieren',text:'Produktbilder von fremden Hosts machen den Render von deren Verfügbarkeit abhängig. In Produktion sollten sie validiert, gecacht oder als Data-URI eingebettet werden.'}
    ]},
    {id:'automation',title:'Release-Automatisierung',blocks:[
      {type:'p',text:'Ein Release-Workflow kann dieselben Daten für Changelog, Feed und Vorschaubild verwenden. Strict Mode sorgt dafür, dass eine Renderer-Warnung den Job sichtbar fehlschlagen lässt.'},
      {type:'code',filename:'scripts/render-release.ts',code:`import { writeFile } from 'node:fs/promises';
import { Changelog, renderImage } from 'ogimagecn-svelte';

const release = await getLatestRelease();
const { png, warnings } = await renderImage(Changelog, {
  brand: 'Nordgrat Cloud',
  version: release.version,
  date: release.publishedAt,
  title: 'Release bereit',
  items: release.highlights
});

await writeFile(\`artifacts/release-\${release.version}.png\`, png);
console.info({ warnings });`}
    ]},
    {id:'lokalisierung',title:'Lokalisierung und Personalisierung',blocks:[
      {type:'p',text:'Formatierung gehört vor den Renderer. Intl mit de-AT hält Währung, Prozentwerte und Datumsangaben konsistent; eigene oder zusätzliche Fonts decken die benötigten Schriftsysteme reproduzierbar ab.'},
      {type:'list',items:['Pro Sprache und Datensatz einen stabilen Cache-Key bilden.','Remote-Bilder vor dem Rendern auf erlaubte Hosts, Größe und Content-Type prüfen.','Für große Batches Parallelität begrenzen, weil Font-Layout und Rasterisierung CPU-Arbeit sind.','SVG speichern, wenn weitere Größen ohne erneutes Layout benötigt werden; PNG für Plattformen ausgeben, die Rasterbilder erwarten.']}
    ]},
    {id:'grenzen',title:'Wo ein Browser besser passt',blocks:[
      {type:'p',text:'Satori ist absichtlich kein Webseiten-Screenshot. Die API passt weniger gut für pixelgenaue Browseransichten, beliebiges HTML/CSS, Canvas, clientseitige Diagrammbibliotheken oder Animationen.'},
      {type:'note',title:'Abmessungen sind kein Responsive Design',text:'width und height ändern die Renderfläche, passen eine für 1200 × 630 entworfene Vorlage aber nicht automatisch an. Für Quadrat, Story oder Banner sollte jeweils eine passende Svelte-Komponente gestaltet und getestet werden.'}
    ]}
  ]},
  api:{title:'API-Referenz',intro:'Die kleine öffentliche API liefert SVG, PNG, Abmessungen und Renderer-Diagnosen.',sections:[
    {id:'renderer',title:'Renderer',blocks:[{type:'list',items:['renderSvg(component, props, options?) liefert SVG, Abmessungen, Warnungen und optionale Layout-Knoten.','renderPng(component, props, options?) liefert ein PNG als Uint8Array.','renderImage(component, props, options?) liefert SVG-Metadaten und PNG gemeinsam.']}]},
    {id:'optionen',title:'RenderOptions',blocks:[{type:'list',items:['width und height: standardmäßig 1200 × 630.','fonts: eigene Satori-Fonts; standardmäßig werden die gebündelten Noto-Fonts verwendet.','strict: standardmäßig true; Renderer-Warnungen werden zu Fehlern.','graphemeImages und loadAdditionalAsset: deterministische Bilder oder Fonts für fehlende Glyphen.']}]},
    {id:'fonts',title:'loadFont',blocks:[{type:'p',text:'loadFont akzeptiert file:- und https:-URLs, absolute Dateipfade sowie ArrayBuffer oder Uint8Array und gibt ein Satori-Fontobjekt zurück.'}]}
  ]},
  komposition:{title:'Komposition',intro:'Jede Vorlage kann mit einem typisierten Svelte-5-Snippet ergänzt werden.',sections:[
    {id:'overlay',title:'Overlay-Snippet',blocks:[{type:'code',filename:'Card.svelte',code:`<script lang="ts">
  import { Simple } from 'ogimagecn-svelte';
</script>

{#snippet badge()}
  <div style="display:flex;position:absolute;right:48px;top:48px">
    Svelte 5
  </div>
{/snippet}

<Simple title="In Svelte komponiert" overlay={badge} />`}]},
    {id:'regeln',title:'Dieselben Layout-Regeln',blocks:[{type:'note',title:'Satori-kompatibel bleiben',text:'Auch Snippet-Inhalte müssen Flexbox, Inline-Styles und unterstützte absolute Einheiten verwenden.'}]}
  ]},
  schriften:{title:'Schriften & Emoji',intro:'Gebündelte Noto-Fonts decken die häufigsten Schriften ab; weitere Glyphen bleiben explizit und reproduzierbar.',sections:[
    {id:'eigene-fonts',title:'Eigene Schrift laden',blocks:[{type:'code',filename:'fonts.ts',code:`import { loadFont, renderSvg } from 'ogimagecn-svelte';

const font = await loadFont('/srv/fonts/Brand.woff2', {
  name: 'Brand', weight: 400, style: 'normal'
});

await renderSvg(Simple, { title: 'Servus' }, { fonts: [font] });`}]},
    {id:'emoji',title:'Emoji und fehlende Glyphen',blocks:[{type:'p',text:'Mit graphemeImages werden Emoji als feste Data-URIs hinterlegt. loadAdditionalAsset kann je Segment zusätzliche Fonts oder ein Bild liefern.'}]}
  ]},
  satori:{title:'Satori-Grenzen',intro:'Die Komponenten bleiben absichtlich im unterstützten CSS-Teil von Satori.',sections:[
    {id:'css',title:'Unterstütztes Layout',blocks:[{type:'list',items:['Flexbox ist das primäre Layoutmodell; CSS Grid wird nicht vorausgesetzt.','Styles sind inline und verwenden unterstützte absolute Einheiten.','Pseudo-Elemente, Browser-JavaScript und Laufzeit-Stylesheets stehen nicht zur Verfügung.','Bild-URLs müssen vom Server erreichbar sein.']}]},
    {id:'strict',title:'Strict Mode',blocks:[{type:'p',text:'Renderer-Warnungen schlagen standardmäßig fehl. Deaktiviere strict erst, nachdem SVG und PNG bewusst geprüft wurden.'},{type:'note',title:'Fehler sollen laut sein',text:'Ein Build-Fehler ist leichter zu finden als ein still beschädigtes Social Preview im Cache.'}]}
  ]}
};
