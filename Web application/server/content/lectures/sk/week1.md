# Prednáška 1: Úvod do skriptovania a automatizácie

## Cieľ prednášky

Cieľom úvodnej prednášky je vytvoriť pevný teoretický základ pre pochopenie skriptovania ako nástroja automatizácie. Študenti sa oboznámia s významom skriptovania v praxi, naučia sa rozlišovať medzi skriptovaním a klasickým programovaním a získajú základný prehľad o prostrediach Bash a PowerShell. Dôraz sa kladie na pochopenie princípov, nie len syntaxe.

## 1. Význam skriptovania v praxi

Skriptovanie predstavuje jeden z najdôležitejších nástrojov automatizácie v oblasti informačných technológií. V praxi sa často stretávame s úlohami, ktoré sa opakujú, sú časovo náročné alebo vyžadujú presné dodržiavanie postupov. Manuálne vykonávanie takýchto úloh je nielen neefektívne, ale zároveň zvyšuje pravdepodobnosť vzniku chýb. Skriptovanie umožňuje tieto úlohy formalizovať do podoby sekvencie príkazov, ktoré je možné opakovane spúšťať bez zásahu používateľa.
Z pohľadu systémovej administrácie ide napríklad o automatizované zálohovanie dát, správu používateľských účtov alebo konfiguráciu systémových služieb. V oblasti spracovania dát sa skripty využívajú na analýzu logovacích súborov, transformáciu dátových formátov alebo generovanie reportov. V moderných prístupoch, ako je DevOps, zohráva skriptovanie kľúčovú úlohu pri automatizácii buildovania, testovania a nasadzovania aplikácií.
Dôležitým aspektom je aj reprodukovateľnosť procesov. Skript zabezpečuje, že rovnaká operácia bude vykonaná vždy rovnakým spôsobom, čo je nevyhnutné napríklad pri správe infraštruktúry alebo nasadzovaní aplikácií v produkčnom prostredí.
Jednoduchým príkladom automatizácie môže byť skript, ktorý vypíše aktuálneho používateľa a systémový čas.

### Bash

<div class="bash-code-example">
<pre><code>#!/bin/bash
echo "Používateľ: $USER"
echo "Dátum a čas: $(date)"
</code></pre>
</div>

### PowerShell

<div class="powershell-code-example">
<pre><code>Write-Output "Používateľ: $env:USERNAME"
Write-Output "Dátum a čas: $(Get-Date)"
</code></pre>
</div>

## 2. Skriptovanie vs. programovanie

Skriptovanie možno vnímať ako špecifickú formu programovania, ktorá je orientovaná na automatizáciu a integráciu existujúcich nástrojov. Na rozdiel od tradičných programovacích jazykov, ktoré sa často kompilujú do spustiteľnej podoby, sú skriptovacie jazyky interpretované. To znamená, že jednotlivé príkazy sa vykonávajú postupne bez predchádzajúcej kompilácie, čo umožňuje rýchle testovanie a iteratívny vývoj.
Skripty sú často využívané ako tzv. „glue code", teda kód, ktorý prepája rôzne nástroje, služby alebo systémové komponenty. Namiesto implementácie komplexnej logiky od začiatku sa využívajú existujúce príkazy a nástroje, ktoré sa kombinujú do jedného riešenia.
Z praktického hľadiska je dôležité rozlišovať medzi situáciami, v ktorých je skriptovanie vhodné, a situáciami, kde je efektívnejšie použiť plnohodnotný programovací jazyk. Skriptovanie je ideálne pre rýchle riešenia, automatizáciu a prácu so systémom, zatiaľ čo klasické programovanie je vhodnejšie pre rozsiahle aplikácie s komplexnou logikou.
Ako príklad možno uviesť jednoduchú úlohu, pri ktorej skript zistí, či existuje konkrétny súbor.

### Bash

<div class="bash-code-example">
<pre><code>#!/bin/bash
if [ -f "subor.txt" ]; then
echo "Súbor existuje."
else
echo "Súbor neexistuje."
fi
</code></pre>
</div>

### PowerShell

<div class="powershell-code-example">
<pre><code>if (Test-Path "subor.txt") {
Write-Output "Súbor existuje."
} else {
Write-Output "Súbor neexistuje."
}
</code></pre>
</div>

## 3. Shell ako rozhranie operačného systému

Shell predstavuje základné rozhranie medzi používateľom a operačným systémom. Umožňuje zadávať príkazy, spúšťať programy a manipulovať so systémovými zdrojmi. Je dôležité rozlišovať medzi shellom ako interpretom príkazov a terminálom ako nástrojom, ktorý poskytuje grafické alebo textové prostredie pre jeho používanie.
Jednou z kľúčových úloh shellu je správa procesov a interpretácia príkazov. Po zadaní príkazu shell analyzuje jeho syntaktickú štruktúru, identifikuje spustiteľný program a zabezpečí jeho vykonanie v rámci operačného systému. Zároveň umožňuje pracovať so vstupom a výstupom príkazov, čo je základ pre efektívne spracovanie dát.
Kľúčovým konceptom je pipeline, ktorá umožňuje prepájať viaceré príkazy do jedného toku operácií. Výstup jedného príkazu sa stáva vstupom ďalšieho, čím vzniká reťazec operácií.

### Bash

<div class="bash-code-example">
<pre><code>ls -l | grep ".txt"
</code></pre>
</div>

### PowerShell

<div class="powershell-code-example">
<pre><code>Get-ChildItem | Where-Object { $_.Name -like "*.txt" }
</code></pre>
</div>

## 4. Prehľad Bash a PowerShell

### Bash

Bash (Bourne Again Shell) je štandardný shell používaný v Unixových a Linuxových operačných systémoch. Je navrhnutý ako jednoduchý, ale zároveň veľmi flexibilný nástroj, ktorý umožňuje efektívnu prácu s textovými dátami. Jeho sila spočíva najmä v možnosti kombinovať viaceré príkazy a nástroje, ako napríklad grep, awk alebo sed, do jedného funkčného celku.
V praxi sa Bash využíva predovšetkým v serverových prostrediach, kde je potrebná automatizácia administrátorských úloh a spracovanie textových výstupov. Jeho filozofia je založená na jednoduchosti a modularite jednotlivých nástrojov.

Krátka ukážka práce v Bash môže vyzerať nasledovne:

<div class="bash-code-example">
<pre><code>#!/bin/bash
echo "Obsah aktuálneho priečinka:"
ls
</code></pre>
</div>

### PowerShell

PowerShell je moderné skriptovacie prostredie vyvinuté spoločnosťou Microsoft, ktoré je postavené na platforme .NET. Na rozdiel od Bashu nepracuje primárne s textom, ale s objektmi, čo umožňuje presnejšiu a robustnejšiu manipuláciu s dátami.
Tento prístup zjednodušuje prácu so systémovými informáciami a znižuje potrebu manuálneho spracovania textových výstupov. PowerShell sa široko využíva najmä v prostredí Windows, no v súčasnosti je dostupný aj pre Linux a macOS, čím sa stáva univerzálnym nástrojom pre administráciu a automatizáciu.

Jednoduchý ekvivalent predošlej ukážky v PowerShelli môže mať tvar:

<div class="powershell-code-example">
<pre><code>Write-Output "Obsah aktuálneho priečinka:"
Get-ChildItem
</code></pre>
</div>

## 5. Filozofia práce – text vs. objekty

Zásadný rozdiel medzi Bash a PowerShell spočíva v spôsobe spracovania dát. Bash pracuje s textovými reťazcami, ktoré je často potrebné ďalej analyzovať a upravovať pomocou rôznych nástrojov. Tento prístup je síce veľmi flexibilný, no môže byť náchylný na chyby, najmä pri zložitejších operáciách.
PowerShell naopak pracuje s objektmi, ktoré obsahujú štruktúrované informácie. Vďaka tomu je možné priamo pristupovať k jednotlivým vlastnostiam dát bez potreby ich parsovania. Tento rozdiel vedie k vyššej prehľadnosti a robustnosti skriptov, čo je výhodné najmä pri komplexnejších úlohách.
Rozdiel medzi textovým a objektovým prístupom možno ilustrovať na príklade získania informácie o procesoch.

### Bash

<div class="bash-code-example">
<pre><code>ps aux | grep firefox
</code></pre>
</div>

V tomto prípade je výsledkom textový výstup, ktorý je potrebné ďalej filtrovať.

### PowerShell

<div class="powershell-code-example">
<pre><code>Get-Process | Where-Object { $_.ProcessName -like "*firefox*" }
</code></pre>
</div>

V PowerShelli sa filtrujú objekty, pričom je možné pristupovať priamo k vlastnosti ProcessName. Táto ukážka veľmi dobre vystihuje rozdiel medzi oboma prostrediami a je vhodná ako prvý demonštračný príklad na prednáške.

## 6. Použitie v moderných IT oblastiach

Skriptovanie je dnes neoddeliteľnou súčasťou moderných IT procesov. V oblasti DevOps sa využíva na automatizáciu buildov, testovania a nasadzovania aplikácií. V cloudových riešeniach umožňuje efektívnu správu infraštruktúry a automatizáciu konfigurácií.
Okrem toho sa skriptovanie uplatňuje aj pri správe serverov, monitorovaní systémov a spracovaní dát. V mnohých prípadoch tvorí základ pre prístupy ako Infrastructure as Code, ktoré umožňujú riadiť infraštruktúru pomocou definovaných skriptov.
Jednoduchým príkladom administratívnej úlohy môže byť vytvorenie adresára pre zálohy.

### Bash

<div class="bash-code-example">
<pre><code>mkdir -p zaloha
echo "Adresár bol vytvorený."
</code></pre>
</div>

### PowerShell

<div class="powershell-code-example">
<pre><code>New-Item -Path ".\zaloha" -ItemType Directory -Force
Write-Output "Adresár bol vytvorený."
</code></pre>
</div>
