# Cvičenie 13: Pokročilé koncepty a paralelizmus

Optimalizácia skriptov je dôležitá najmä pri práci s veľkým objemom dát alebo pri opakovanom vykonávaní. Neefektívny skript môže zbytočne zaťažovať CPU, pamäť alebo disk, čo môže viesť k spomaleniu systému alebo zlyhaniu procesov.
Základom optimalizácie je identifikácia úzkych miest (bottlenecks), napríklad pomocou nástrojov ako time (Bash) alebo Measure-Command (PowerShell). Následne je možné zamerať sa na konkrétne časti kódu a optimalizovať ich.
Efektívna práca s dátami spočíva v minimalizácii spracovávaných údajov a využívaní streamového spracovania namiesto načítania celého súboru do pamäte. Dôležité je tiež vyhnúť sa zbytočným diskovým operáciám.
Cykly sú častým zdrojom neefektivity. V mnohých prípadoch je vhodnejšie použiť optimalizované nástroje ako grep, awk alebo sed, ktoré sú navrhnuté pre efektívne spracovanie dát.
Paralelizmus umožňuje vykonávať viacero operácií súčasne, čím sa zvyšuje výkon skriptov. V Bash sa využívajú background procesy, v PowerShelli paralelné pipeline. Pri návrhu je však potrebné riešiť synchronizáciu a prístup k zdieľaným zdrojom.
Cieľom je nájsť rovnováhu medzi výkonom a čitateľnosťou. Optimalizácia má zmysel najmä tam, kde prináša reálny benefit.

<h1 class="exercise-topic"> Úloha 1: Meranie výkonu </h1>

<div class="exercise">

Navrhnite skript, ktorý vykoná vybranú operáciu a zmeria jej čas vykonávania. Porovnajte dve rôzne implementácie.

</div>

<h1 class="exercise-topic"> Úloha 2: Identifikácia bottlenecku </h1>

<div class="exercise">

Vytvorte skript, ktorý obsahuje neefektívnu časť, identifikujte ju a navrhnite optimalizáciu.

</div>

<h1 class="exercise-topic"> Úloha 3: Efektívne spracovanie dát </h1>

<div class="exercise">

Navrhnite skript, ktorý spracuje veľký súbor bez načítania celého obsahu do pamäte.

</div>

<h1 class="exercise-topic"> Úloha 4: Optimalizácia cyklu </h1>

<div class="exercise">

Vytvorte skript, ktorý používa cyklus, a následne ho optimalizujte pomocou nástrojov ako grep alebo awk.

</div>

<h1 class="exercise-topic"> Úloha 5: Minimalizácia operácií </h1>

<div class="exercise">

Navrhnite skript, ktorý:

- minimalizuje počet diskových operácií,
- optimalizuje pipeline.

</div>

<h1 class="exercise-topic"> Úloha 6: Paralelizmus v Bash </h1>

<div class="exercise">

Vytvorte skript, ktorý:

- spracuje viacero úloh paralelne,
- počká na ich dokončenie.

</div>

<h1 class="exercise-topic"> Úloha 7: Paralelizmus v PowerShell </h1>

<div class="exercise">

Navrhnite skript, ktorý:

- spracuje dáta paralelne,
- využije ForEach-Object -Parallel.

</div>

<h1 class="exercise-topic"> Úloha 8: Synchronizácia procesov </h1>

<div class="exercise">

Vytvorte skript, ktorý:

- pracuje s paralelnými procesmi,
- zabezpečí správnu synchronizáciu.

</div>

<h1 class="exercise-topic"> Úloha 9: Škálovanie riešenia </h1>

<div class="exercise">

Navrhnite skript, ktorý:

- zvládne spracovať rastúci objem dát,
- zachová výkon.

</div>

<h1 class="exercise-topic"> Úloha 10: Komplexná optimalizácia </h1>

<div class="exercise">

Navrhnite skript, ktorý:

- obsahuje paralelizmus,
- optimalizované spracovanie dát,
- minimalizované operácie,
- je efektívny a udržiavateľný.

</div>
