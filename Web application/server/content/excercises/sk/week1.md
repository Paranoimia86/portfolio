# Cvičenie 1: Úvod do skriptovania a automatizácie

Skriptovanie predstavuje jeden zo základných pilierov modernej správy systémov a prístupov typu DevOps. Ide o spôsob, ako automatizovať opakujúce sa úlohy, zjednodušiť administráciu a minimalizovať ľudské chyby. Namiesto manuálneho vykonávania príkazov môže administrátor alebo vývojár vytvoriť skript, ktorý tieto kroky vykoná automaticky.

V praxi sa skriptovanie využíva napríklad pri:

- nasadzovaní aplikácií,
- správe používateľov,
- zálohovaní dát,
- monitorovaní systémov,
- konfigurácii serverov.

Dôležitým konceptom je rozdiel medzi interpretovanými a kompilovanými jazykmi. Interpretované jazyky (napr. Bash, PowerShell, Python) sa vykonávajú priamo riadok po riadku, zatiaľ čo kompilované jazyky (napr. C, C++) sa najprv prekladajú do strojového kódu. Výhodou interpretovaných jazykov je rýchlejšie testovanie a jednoduchšie použitie pri automatizácii.

Shell predstavuje rozhranie medzi používateľom a operačným systémom. Umožňuje zadávať príkazy, spúšťať programy a pracovať so súbormi. Najznámejšie shelly sú:

- Bash (Linux, Unix systémy),
- PowerShell (Windows, ale dnes aj cross-platform).

Rozdiel medzi nimi spočíva najmä vo filozofii:

- Bash pracuje hlavne s textom,
- PowerShell pracuje s objektmi.

To sa prejavuje najmä pri pipeline:

- Bash: prenáša text medzi príkazmi,
- PowerShell: prenáša objekty (čo umožňuje pokročilejšiu manipuláciu s dátami).

<h1 class="exercise-topic"> Úloha 1: Základné pojmy </h1>

<div class="exercise">

Vysvetlite vlastnými slovami, čo je skriptovanie, aký je rozdiel medzi interpretovaným a kompilovaným jazykom a čo predstavuje shell v kontexte operačného systému.

</div>

<h1 class="exercise-topic"> Úloha 2: Vhodnosť skriptovania v praxi </h1>

<div class="exercise">

Posúďte nasledujúce situácie a určte, ktoré z nich sú vhodné na automatizáciu pomocou skriptovania. Svoje rozhodnutie stručne zdôvodnite. Zamerajte sa na manuálne kopírovanie súborov vykonávané každý deň, jednorazové otvorenie textového súboru, automatické nočné zálohovanie databázy a pravidelné sledovanie využitia procesora každých päť minút.

</div>

<h1 class="exercise-topic"> Úloha 3: Porovnanie Bash a PowerShell </h1>

<div class="exercise">

Porovnajte prostredia Bash a PowerShell z hľadiska typu dát, s ktorými pracujú, spôsobu využitia pipeline a typického prostredia ich použitia.

</div>

<h1 class="exercise-topic"> Úloha 4: Základné príkazy v Bash </h1>

<div class="exercise">

Navrhnite príkazy v prostredí Bash, ktoré umožnia zobraziť aktuálny pracovný adresár a následne vypísať obsah daného adresára.

</div>

<h1 class="exercise-topic"> Úloha 5: Základné príkazy v PowerShell </h1>

<div class="exercise">

Navrhnite príkazy v prostredí PowerShell, ktoré zobrazia zoznam súborov v priečinku a následne upravia výstup tak, aby obsahoval iba názvy súborov.

</div>

<h1 class="exercise-topic"> Úloha 6: Návrh skriptu na zálohovanie </h1>

<div class="exercise">

Navrhnite jednoduchý scenár skriptu, ktorý každý deň vytvorí zálohu konkrétneho priečinka, uloží ju do iného adresára a do názvu zálohy automaticky pridá aktuálny dátum.

</div>
