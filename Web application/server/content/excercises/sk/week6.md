# Cvičenie 6: Funkcie, skriptovacie moduly a modularita

S rastúcou komplexnosťou skriptov sa stáva kľúčovým správne navrhovať kód tak, aby bol čitateľný, udržiavateľný a opakovane použiteľný. Základom sú funkcie, ktoré umožňujú rozdelenie logiky do menších, samostatných častí. Každá funkcia by mala mať jasne definovaný účel a rozhranie (API), teda vstupy a výstupy.
Pri návrhu funkcií je dôležitá validácia vstupov. Skript by mal vedieť overiť, či používateľ zadal správne parametre, a v prípade chyby reagovať vhodným spôsobom. Tým sa zvyšuje robustnosť a spoľahlivosť riešenia.
Významný rozdiel medzi Bash a PowerShell je v práci s návratovými hodnotami. Bash primárne používa exit kódy a štandardný výstup, zatiaľ čo PowerShell pracuje s objektovým output streamom, čo umožňuje flexibilnejšie spracovanie výsledkov funkcií.
Modularita znamená rozdelenie kódu do viacerých súborov alebo modulov. V Bash sa to realizuje pomocou source (alebo .), zatiaľ čo PowerShell podporuje plnohodnotné moduly, ktoré možno importovať. Takýto prístup umožňuje opätovné použitie kódu a lepšiu organizáciu projektov.

<h1 class="exercise-topic"> Úloha 1: Návrh funkcie ako API </h1>

<div class="exercise">

Navrhnite Bash alebo PowerShell funkciu, ktorá:

- prijíma viacero parametrov,
- vykonáva konkrétnu operáciu (napr. spracovanie súboru),
- má jasne definované vstupy a výstupy,
- je navrhnutá tak, aby bola opakovane použiteľná.

</div>

<h1 class="exercise-topic"> Úloha 2: Validácia vstupov </h1>

<div class="exercise">

Vytvorte funkciu, ktorá:

- prijíma vstupné parametre,
- overí ich správnosť (napr. typ, existencia súboru),
- v prípade chyby vypíše chybovú správu a ukončí sa.

</div>

<h1 class="exercise-topic"> Úloha 3: Návratové hodnoty vs. output </h1>

<div class="exercise">

Vytvorte skript, ktorý:

- implementuje funkciu vracajúcu hodnotu pomocou exit kódu,
- implementuje funkciu vracajúcu hodnotu cez output stream,
- demonštruje rozdiel medzi týmito prístupmi.

</div>

<h1 class="exercise-topic"> Úloha 4: Viacnásobné funkcie a spolupráca </h1>

<div class="exercise">

Navrhnite skript obsahujúci viacero funkcií, ktoré:

- spolupracujú medzi sebou,
- odovzdávajú si dáta,
- tvoria logický celok (napr. spracovanie vstupu → filtrácia → výstup).

</div>

<h1 class="exercise-topic"> Úloha 5: Bash sourcing </h1>

<div class="exercise">

Rozdeľte skript do viacerých súborov:

- jeden súbor obsahuje funkcie,
- druhý ich využíva pomocou source,
- demonštrujte opätovné použitie.

</div>

<h1 class="exercise-topic"> Úloha 6: PowerShell modul </h1>

<div class="exercise">

Vytvorte jednoduchý PowerShell modul:

- definujte jednu alebo viac funkcií,
- exportujte ich,
- importujte modul v inom skripte a použite funkcie.

</div>

<h1 class="exercise-topic"> Úloha 7: Organizácia kódu </h1>

<div class="exercise">

Navrhnite štruktúru skriptovacieho projektu:

- rozdelenie do súborov/modulov,
- oddelenie logiky a vstupov,
- opísanie, ako by sa dal projekt rozšíriť.

</div>

<h1 class="exercise-topic"> Úloha 8: Opätovné použitie funkcií </h1>

<div class="exercise">

Vytvorte funkciu, ktorá:

- je univerzálna (napr. validácia vstupu),
- použijete ju na viacerých miestach v skripte.

</div>

<h1 class="exercise-topic"> Úloha 9: Pokročilá práca s parametrami </h1>

<div class="exercise">

Navrhnite funkciu, ktorá:

- podporuje voliteľné parametre,
- má predvolené hodnoty,
- spracuje rôzne kombinácie vstupov.

</div>

<h1 class="exercise-topic"> Úloha 10: Komplexný modulárny skript </h1>

<div class="exercise">

Navrhnite skript, ktorý:

- obsahuje viacero funkcií,
- je rozdelený do modulov,
- validuje vstupy,
- efektívne spracováva dáta,
- je pripravený na opätovné použitie.

</div>
