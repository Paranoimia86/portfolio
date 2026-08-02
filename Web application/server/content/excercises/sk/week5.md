# Cvičenie 5: Riadiace štruktúry a tok programu

Riadiace štruktúry určujú tok vykonávania programu a umožňujú reagovať na rôzne situácie počas behu skriptu. Základom sú podmienky a vetvenie, ktoré umožňujú vykonať rôzne časti kódu na základe splnenia určitých kritérií. V pokročilejšom použití ide napríklad o kombinovanie viacerých podmienok, prácu s návratovými hodnotami príkazov alebo rozhodovanie na základe vzorov.
Iterácie umožňujú opakované vykonávanie kódu nad dátami alebo rozsahmi hodnôt. V praxi sa často využívajú na spracovanie súborov, generovanie dát alebo automatizované operácie nad množinami vstupov.
Pattern-based rozhodovanie (napr. case v Bash alebo switch v PowerShell) umožňuje elegantne riešiť situácie, kde je potrebné rozhodovať na základe viacerých možností alebo vzorov. Ide o čitateľnejšiu alternatívu k viacerým vnoreným podmienkam.
Paralelizmus predstavuje možnosť vykonávať viacero operácií súčasne, čím sa zvyšuje efektivita skriptov. V Bash sa realizuje napríklad pomocou background procesov, v PowerShelli pomocou jobs alebo paralelných pipeline.
Efektívny návrh toku programu znamená minimalizovať zbytočné operácie, správne riadiť vetvenie a optimalizovať vykonávanie tak, aby bol skript rýchly, čitateľný a spoľahlivý.

<h1 class="exercise-topic"> Úloha 1: Pokročilé vetvenie </h1>

<div class="exercise">

Vytvorte skript, ktorý:

- prijme vstupný parameter (napr. číslo),
- na základe viacerých podmienok (napr. rozsahy hodnôt) vykoná rôzne operácie,
- využije kombináciu logických operátorov a návratových hodnôt príkazov.

</div>

<h1 class="exercise-topic"> Úloha 2: Iterácia a generovanie dát </h1>

<div class="exercise">

Napíšte skript, ktorý:

- vygeneruje sériu dát (napr. čísla 1–100),
- pre každé číslo rozhodne, či spĺňa určitú podmienku (napr. deliteľnosť),
- uloží výsledky do súboru.

</div>

<h1 class="exercise-topic"> Úloha 3: Pattern-based rozhodovanie </h1>

<div class="exercise">

Vytvorte skript, ktorý:

- prijme vstup (napr. názov súboru),
- na základe prípony súboru vykoná rôzne operácie (napr. .txt, .log, .json),
- použije case (Bash) alebo switch (PowerShell).

</div>

<h1 class="exercise-topic"> Úloha 4: Kombinácia podmienok a cyklov </h1>

<div class="exercise">

Navrhnite skript, ktorý:

- prechádza zoznam súborov,
- aplikuje podmienky (napr. veľkosť, názov),
- vykoná akciu iba pre tie, ktoré spĺňajú viacero kritérií.

</div>

<h1 class="exercise-topic"> Úloha 5: Paralelizmus v Bash </h1>

<div class="exercise">

Vytvorte skript, ktorý:

- spustí viacero úloh paralelne (napr. spracovanie viacerých súborov),
- počká na ich dokončenie,
- následne vyhodnotí výsledok.

</div>

<h1 class="exercise-topic"> Úloha 6: Paralelizmus v PowerShell </h1>

<div class="exercise">

Napíšte PowerShell skript, ktorý:

- spustí viacero jobov,
- sleduje ich stav,
- po dokončení spracuje výsledky.

</div>

<h1 class="exercise-topic"> Úloha 7: Optimalizácia toku programu </h1>

<div class="exercise">

Upravte skript tak, aby:

- minimalizoval počet podmienok,
- eliminoval redundantné operácie,
- využil efektívnejšie konštrukcie (napr. case namiesto viacerých if).

</div>

<h1 class="exercise-topic"> Úloha 8: Generovanie a filtrovanie dát </h1>

<div class="exercise">

Vytvorte skript, ktorý:

- generuje dáta (napr. náhodné čísla),
- filtruje ich podľa podmienky,
- vypíše iba relevantné výsledky.

</div>

<h1 class="exercise-topic"> Úloha 9: Kombinácia paralelizmu a podmienok </h1>

<div class="exercise">

Navrhnite skript, ktorý:

- paralelne spracuje viacero vstupov,
- pre každý vstup aplikuje podmienky,
- výsledky agreguje.

</div>

<h1 class="exercise-topic"> Úloha 10: Návrh riadiacej logiky </h1>

<div class="exercise">

Navrhnite komplexný skript, ktorý:

- kombinuje podmienky, cykly a paralelizmus,
- spracováva vstupné dáta,
- optimalizuje tok programu z hľadiska výkonu a čitateľnosti.

</div>
