# Prednáška 11: Práca so sieťou a externými zdrojmi

## Cieľ prednášky

Cieľom prednášky je poskytnúť študentom komplexné pochopenie komunikácie skriptov s externými systémami prostredníctvom siete. Prednáška sa zameriava na návrh riešení, ktoré dokážu získavať, spracovávať a odosielať dáta v reálnom čase. Dôraz sa kladie na spoľahlivosť, bezpečnosť a schopnosť pracovať s nepredvídateľnými podmienkami sieťového prostredia.

## 1. Význam sieťovej komunikácie v skriptovaní

V súčasnom IT prostredí už skripty nefungujú izolovane na jednom systéme, ale čoraz častejšie komunikujú s externými službami, databázami alebo cloudovými platformami. Táto schopnosť zásadne rozširuje ich využiteľnosť, pretože umožňuje prepájať rôzne systémy a automatizovať komplexné procesy.
Skript môže napríklad načítať dáta z webového API, spracovať ich a následne ich uložiť do lokálneho systému alebo odoslať ďalšej službe. Takéto riešenia sú základom moderných integračných scenárov, kde jednotlivé systémy spolu komunikujú prostredníctvom siete.
Z návrhového hľadiska je dôležité uvedomiť si, že sieťové prostredie je dynamické a nepredvídateľné. Môže dôjsť k výpadkom spojenia, oneskoreniu odpovedí alebo k zmene štruktúry dát. Skript preto musí byť navrhnutý tak, aby tieto situácie zvládal bez zlyhania a dokázal na ne adekvátne reagovať.

## 2. HTTP komunikácia – základné princípy

Základom komunikácie medzi skriptom a externým systémom je protokol HTTP, ktorý definuje spôsob odosielania požiadaviek a prijímania odpovedí. Každá komunikácia prebieha na princípe klient–server, kde skript vystupuje ako klient a externý systém ako server.
Najčastejšie používané metódy sú GET, ktorá slúži na získavanie dát, a POST, ktorá sa používa na ich odosielanie. Okrem nich existujú aj ďalšie metódy, ako PUT alebo DELETE, ktoré sa využívajú pri práci s REST API.

V Bash:

<div class="bash-code-example">
<pre><code>curl https://api.example.com/data
</code></pre>
</div>

V PowerShelli:

<div class="powershell-code-example">
<pre><code>Invoke-RestMethod -Uri "https://api.example.com/data"
</code></pre>
</div>

Dôležitým aspektom HTTP komunikácie sú stavové kódy, ktoré informujú o výsledku požiadavky. Napríklad kód 200 znamená úspech, zatiaľ čo kódy 4xx alebo 5xx signalizujú chybu na strane klienta alebo servera.
Pri návrhu skriptov je nevyhnutné tieto kódy kontrolovať a na ich základe riadiť ďalší priebeh programu. Ignorovanie stavových kódov môže viesť k nesprávnemu spracovaniu dát alebo k pokračovaniu skriptu aj po zlyhaní operácie.

## 3. Práca s API (Application Programming Interface)

API predstavuje štandardizované rozhranie, ktoré umožňuje komunikáciu medzi rôznymi softvérovými systémami. V kontexte skriptovania ide o jeden z najdôležitejších nástrojov, pretože umožňuje prístup k externým dátam a službám.

Použitie API umožňuje napríklad:

- získavať aktuálne dáta (napr. počasie, finančné údaje),
- komunikovať s cloudovými službami,
- automatizovať procesy naprieč viacerými systémami.

Príklad:

<div class="bash-code-example">
<pre><code>curl https://api.example.com/users
</code></pre>
</div>

<div class="powershell-code-example">
<pre><code>Invoke-RestMethod -Uri "https://api.example.com/users"
</code></pre>
</div>

Pri práci s API je potrebné riešiť viacero aspektov. Okrem samotného odosielania požiadaviek je dôležité pochopiť štruktúru odpovede, spôsob autentifikácie a obmedzenia služby, ako napríklad limity počtu požiadaviek.
Z návrhového hľadiska je dôležité zabezpečiť, aby skript dokázal reagovať na zmeny API, napríklad zmenu formátu dát alebo dostupnosti služby. To si vyžaduje flexibilný a robustný návrh.

## 4. Spracovanie dát z API (JSON, XML)

Dáta získané z API sú najčastejšie vo formáte JSON alebo XML, pričom JSON je v súčasnosti dominantným formátom. Správne spracovanie týchto dát je kľúčové pre ich ďalšie využitie.

V Bash:

<div class="bash-code-example">
<pre><code>curl api | jq '.name'
</code></pre>
</div>

V PowerShelli:

<div class="powershell-code-example">
<pre><code>$response = Invoke-RestMethod -Uri "https://api.example.com"
$response.name
</code></pre>
</div>

PowerShell poskytuje výraznú výhodu v tom, že automaticky konvertuje JSON do objektov, čo umožňuje jednoduchý prístup k jednotlivým hodnotám. Bash naopak pracuje s textom, čo znamená, že je potrebné použiť externé nástroje na parsovanie.

Pri spracovaní dát je potrebné zohľadniť:

- validáciu štruktúry (či obsahuje očakávané polia),
- ošetrenie chýbajúcich alebo neplatných hodnôt,
- transformáciu dát do vhodného formátu.

Nesprávne spracovanie dát môže viesť k chybným výsledkom alebo k zlyhaniu skriptu.

## 5. Autentifikácia a bezpečnosť

Pri komunikácii s externými systémami je často potrebné overiť identitu používateľa alebo aplikácie. Tento proces sa označuje ako autentifikácia a môže mať rôzne formy, napríklad API kľúče, tokeny alebo používateľské meno a heslo.

<div class="bash-code-example">
<pre><code>curl -H "Authorization: Bearer TOKEN" https://api.example.com
</code></pre>
</div>

<div class="powershell-code-example">
<pre><code>Invoke-RestMethod -Headers @{Authorization="Bearer TOKEN"}
</code></pre>
</div>

Bezpečnosť predstavuje kritický aspekt návrhu, pretože nesprávne zaobchádzanie s autentifikačnými údajmi môže viesť k ich zneužitiu. Citlivé údaje by nemali byť uložené priamo v skripte, ale mali by byť spravované prostredníctvom bezpečných mechanizmov, ako sú environment variables alebo špecializované úložiská.
Okrem toho je nevyhnutné používať šifrovanú komunikáciu (HTTPS), aby sa zabránilo odpočúvaniu dát počas prenosu.

## 6. Ošetrenie chýb pri sieťovej komunikácii

Sieťová komunikácia je náchylná na rôzne typy chýb, ktoré môžu vzniknúť na strane klienta, servera alebo siete samotnej. Medzi najčastejšie problémy patria výpadky spojenia, časové limity alebo neplatné odpovede.
Pri návrhu skriptov je potrebné implementovať mechanizmy, ktoré dokážu tieto situácie ošetriť. To zahŕňa kontrolu stavových kódov, implementáciu opakovaných pokusov (retry) alebo nastavenie časových limitov.
Bez týchto mechanizmov môže skript zlyhať pri prvom probléme, čo je v praxi neakceptovateľné. Robustný skript by mal byť schopný reagovať na chyby a pokračovať v činnosti, ak je to možné.

## 7. Praktické využitie – integrácia systémov

Jednou z najväčších výhod skriptovania je schopnosť integrovať rôzne systémy do jedného celku. Skripty môžu fungovať ako prepojovací prvok medzi službami, ktoré by inak spolu nekomunikovali.

V praxi môže skript napríklad:

- načítať dáta z externého API,
- spracovať ich a upraviť do požadovaného formátu,
- uložiť výsledok alebo ho odoslať ďalšiemu systému.

Takéto riešenia sú základom moderných IT architektúr, kde je dôležitá interoperabilita medzi systémami.
Pri návrhu integračných riešení je potrebné zohľadniť spoľahlivosť, bezpečnosť a výkon. Skript by mal byť schopný zvládnuť aj situácie, keď jeden zo systémov nie je dostupný, a zabezpečiť konzistentné spracovanie dát.
