# Cvičenie 8: Spracovanie textu a dátových tokov

Spracovanie textu a dátových tokov patrí medzi najdôležitejšie schopnosti pri práci so shellom. V prostredí Bash sa využívajú nástroje ako awk, sed a grep, ktoré umožňujú efektívne filtrovanie, transformáciu a analýzu textových dát. Tieto nástroje pracujú nad textovými streamami, čo umožňuje ich jednoduché prepojenie pomocou pipeline.
Regulárne výrazy predstavujú silný nástroj na vyhľadávanie a validáciu textových vzorov. Používajú sa napríklad pri spracovaní logov, validácii vstupov alebo extrakcii konkrétnych údajov z textu.
Parsing logov je bežnou úlohou v administrácii a DevOps. Skripty často analyzujú logy s cieľom identifikovať chyby, anomálie alebo štatistiky.
Okrem čistého textu je dôležitá aj práca so štruktúrovanými formátmi ako CSV, JSON alebo XML. Tieto formáty sa používajú na výmenu dát medzi systémami a skripty musia vedieť tieto dáta čítať, upravovať a transformovať.
Transformácia dát zahŕňa konverziu medzi formátmi, filtrovanie relevantných údajov a ich prípravu na ďalšie spracovanie alebo vizualizáciu.

<h1 class="exercise-topic"> Úloha 1: Pokročilé spracovanie pomocou awk </h1>

<div class="exercise">

Napíšte skript, ktorý spracuje textový súbor obsahujúci viacero stĺpcov a:

- vyberie konkrétne stĺpce,
- vykoná nad nimi výpočet (napr. súčet alebo priemer),
- vypíše výsledok.

</div>

<h1 class="exercise-topic"> Úloha 2: Transformácia textu pomocou sed </h1>

<div class="exercise">

Vytvorte skript, ktorý:

- nahradí viacero vzorov v texte,
- odstráni nepotrebné riadky,
- upraví formát výstupu.

</div>

<h1 class="exercise-topic"> Úloha 3: Regulárne výrazy – validácia </h1>

<div class="exercise">

Napíšte skript, ktorý:

- overí, či vstup spĺňa určitý formát (napr. email, IP adresa),
- použije regulárny výraz na validáciu.

</div>

<h1 class="exercise-topic"> Úloha 4: Parsing logov </h1>

<div class="exercise">

Navrhnite skript, ktorý:

- spracuje log súbor,
- identifikuje chybové záznamy,
- spočíta ich výskyt podľa typu.

</div>

<h1 class="exercise-topic"> Úloha 5: Extrakcia dát z logu </h1>

<div class="exercise">

Napíšte skript, ktorý:

- z logu extrahuje konkrétne informácie (napr. IP adresy),
- odstráni duplicity,
- vypíše výsledok.

</div>

<h1 class="exercise-topic"> Úloha 6: Práca s CSV </h1>

<div class="exercise">

Vytvorte skript, ktorý:

- načíta CSV súbor,
- vyfiltruje riadky podľa podmienky,
- vypíše vybrané stĺpce.

</div>

<h1 class="exercise-topic"> Úloha 7: Práca s JSON </h1>

<div class="exercise">

Napíšte skript, ktorý:

- načíta JSON súbor,
- extrahuje konkrétne hodnoty,
- vykoná nad nimi operáciu (napr. filtráciu).

</div>

<h1 class="exercise-topic"> Úloha 8: Práca s XML </h1>

<div class="exercise">

Navrhnite skript, ktorý:

- spracuje XML súbor,
- vyberie konkrétne elementy,
- vypíše ich obsah.

</div>

<h1 class="exercise-topic"> Úloha 9: Transformácia dát medzi formátmi </h1>

<div class="exercise">

Vytvorte skript, ktorý:

- načíta dáta v jednom formáte (napr. CSV),
- transformuje ich do iného formátu (napr. JSON),
- uloží výsledok.

</div>

<h1 class="exercise-topic"> Úloha 10: Komplexná analýza dát </h1>

<div class="exercise">

Navrhnite skript, ktorý:

- spracuje vstupný dátový súbor (log, CSV alebo JSON),
- vykoná filtráciu, agregáciu a transformáciu,
- vytvorí výsledný report.

</div>
