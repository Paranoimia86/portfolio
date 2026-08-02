# Prednáška 6: Funkcie, skriptovacie moduly a modularita

## 1. Modularita ako princíp návrhu skriptov

Modularita predstavuje základný princíp návrhu softvéru, ktorý spočíva v rozdelení programu na menšie, logicky oddelené časti. V kontexte skriptovania to znamená rozdelenie kódu do funkcií alebo samostatných súborov, pričom každá časť rieši konkrétnu úlohu.
V prípade, že modularita nie je aplikovaná, skripty majú tendenciu rásť do podoby lineárneho a neprehľadného kódu. Takýto prístup vedie k zníženej čitateľnosti, zvýšenej duplicite a komplikovanej údržbe. Naopak, modulárny návrh umožňuje jasné oddelenie jednotlivých častí programu, čím sa zjednodušuje orientácia v kóde a jeho ďalší rozvoj.
Z praktického hľadiska je vhodné identifikovať opakujúce sa operácie alebo logické celky a tieto časti zapuzdriť do samostatných funkcií. Takýto prístup znižuje množstvo kódu, zvyšuje jeho kvalitu a umožňuje jednoduchšie testovanie jednotlivých komponentov.

## 2. Definovanie funkcií

Funkcia predstavuje pomenovaný blok kódu, ktorý vykonáva konkrétnu úlohu a môže byť opakovane volaný. Jej hlavnou úlohou je zapuzdriť určitú logiku a oddeliť ju od zvyšku programu.

V Bash sa funkcie definujú jednoduchou syntaxou:

<div class="bash-code-example">
<pre><code>pozdrav() {
echo "Ahoj"
}
</code></pre>
</div>

V PowerShelli je definícia explicitnejšia:

<div class="powershell-code-example">
<pre><code>function Pozdrav {
Write-Output "Ahoj"
}
</code></pre>
</div>

Používanie funkcií umožňuje znížiť duplicitu kódu a zjednodušiť hlavný tok programu, ktorý potom pozostáva prevažne z volaní funkcií. Pri návrhu funkcií je dôležité, aby každá funkcia mala jasne definovaný účel a riešila jednu konkrétnu úlohu. Tento prístup vedie k prehľadnejšiemu a udržiavateľnejšiemu kódu.

## 3. Parametre funkcií a ich validácia

Parametre umožňujú funkciám prijímať vstupné údaje, čím sa zvyšuje ich flexibilita a znovupoužiteľnosť. Bez parametrov by boli funkcie viazané na konkrétne hodnoty, čo výrazne obmedzuje ich praktické využitie.

V Bash sa parametre odovzdávajú pomocou pozičných premenných:

<div class="bash-code-example">
<pre><code>pozdrav() {
echo "Ahoj $1"
}
</code></pre>
</div>

V PowerShelli je možné parametre definovať explicitne, čo zvyšuje čitateľnosť a umožňuje aj typovú kontrolu:

<div class="powershell-code-example">
<pre><code>function Pozdrav {
param (
[string]$meno
)
Write-Output "Ahoj $meno"
}
</code></pre>
</div>

Dôležitou súčasťou návrhu funkcií je validácia vstupov. Funkcia by mala overiť, či sú vstupné údaje korektné, napríklad či bol parameter zadaný alebo či má správny formát. Tým sa predchádza chybám počas vykonávania a zvyšuje sa robustnosť skriptu.

## 4. Návratové hodnoty a výstup funkcií

Funkcie môžu vracať výsledky svojej činnosti, ktoré sú následne využité v ďalšom spracovaní. V skriptovacích jazykoch je však potrebné rozlišovať medzi návratovou hodnotou a výstupom.

V Bash funkcie vracajú návratový kód, ktorý signalizuje úspech alebo chybu, zatiaľ čo samotné dáta sa odovzdávajú prostredníctvom štandardného výstupu:

<div class="bash-code-example">
<pre><code>sucet() {
echo $(($1 + $2))
}
</code></pre>
</div>

V PowerShelli funkcie vracajú objekty priamo:

<div class="powershell-code-example">
<pre><code>function Sucet {
param ($a, $b)
return $a + $b
}
</code></pre>
</div>

Pri návrhu funkcií je dôležité zabezpečiť, aby bol výstup konzistentný a vhodný pre ďalšie spracovanie. Zmiešanie dátového výstupu a informačných správ môže viesť k problémom, najmä pri použití funkcií v pipeline.

## 5. Scope (rozsah platnosti premenných)

Scope určuje, kde je premenná dostupná a aký má životný cyklus. Nesprávne pochopenie tohto konceptu môže viesť k chybám, ktoré sú často ťažko identifikovateľné.

V Bash sú premenné štandardne globálne, pokiaľ nie sú označené ako lokálne:

<div class="bash-code-example">
<pre><code>funkcia() {
local x=10
}
</code></pre>
</div>

V PowerShelli existuje viacero úrovní rozsahu, ktoré umožňujú presnejšie riadenie prístupu k premenným.
Správne používanie scope je dôležité najmä pri návrhu väčších skriptov, kde je potrebné zabrániť kolíziám premenných a neúmyselnému prepisovaniu hodnôt. Lokálne premenné vo funkciách prispievajú k lepšej izolácii logiky a znižujú závislosť medzi jednotlivými časťami programu.

## 6. Organizácia skriptov a rozdelenie kódu

Pri väčších skriptoch je nevyhnutné rozdeliť kód do viacerých častí, aby sa zachovala prehľadnosť a udržiavateľnosť. Organizácia skriptov zahŕňa rozdelenie funkcií do samostatných súborov a oddelenie konfiguračných častí od samotnej logiky.

V Bash je možné načítať externý súbor pomocou príkazu:

<div class="bash-code-example">
<pre><code>source utils.sh
</code></pre>
</div>

V PowerShelli sa využívajú moduly:

<div class="powershell-code-example">
<pre><code>Import-Module Utils
</code></pre>
</div>

Takýto prístup umožňuje vytvárať knižnice funkcií, ktoré možno opakovane používať v rôznych projektoch. Zároveň zjednodušuje testovanie a ladenie jednotlivých častí kódu.

## 7. Opätovné použitie kódu a best practices

Opätovné použitie kódu je jedným z hlavných cieľov modularity. Správne navrhnuté funkcie možno použiť na viacerých miestach bez potreby ich opätovného písania.
Pri návrhu funkcií je vhodné dodržiavať niekoľko základných princípov. Funkcie by mali mať jasný a výstižný názov, ktorý odráža ich účel. Mali by byť čo najviac nezávislé od globálneho stavu a ich správanie by malo byť predvídateľné. Zároveň je vhodné oddeliť samotnú logiku od výstupu určeného pre používateľa.

Príklad jednoduchej funkcie na logovanie:

<div class="bash-code-example">
<pre><code>log() {
echo "[INFO] $1"
}
</code></pre>
</div>

<div class="powershell-code-example">
<pre><code>function Log {
param ($message)
Write-Output "[INFO] $message"
}
</code></pre>
</div>

Dodržiavanie týchto princípov vedie k tvorbe kvalitného kódu, ktorý je čitateľný, udržiavateľný a vhodný aj pre tímovú spoluprácu.
