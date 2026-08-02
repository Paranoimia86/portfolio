# Cvičenie 3: Pokročilá práca s príkazovým riadkom

Pokročilá práca s príkazovým riadkom umožňuje efektívne spracovanie dát a automatizáciu úloh bez potreby grafického rozhrania. Jedným zo základných princípov je chaining príkazov, teda spájanie viacerých príkazov za sebou. V Bash sa na to využívajú operátory ako ;, && a ||, ktoré určujú, za akých podmienok sa príkazy vykonajú.
Dôležitým konceptom je aj presmerovanie vstupu a výstupu. Štandardný vstup (stdin), výstup (stdout) a chybový výstup (stderr) je možné presmerovať do súborov alebo medzi príkazmi. To umožňuje napríklad ukladať výsledky do súborov alebo oddeliť chyby od bežného výstupu.
Pipes (rúry) umožňujú prepojiť viacero príkazov tak, že výstup jedného príkazu sa stane vstupom ďalšieho. V Bash sa často využívajú nástroje ako grep (filtrovanie textu), awk (spracovanie textových dát) a sed (úprava textu). V PowerShelli sa podobná funkcionalita dosahuje pomocou objektovej pipeline a príkazov ako Where-Object.
Efektívna práca v CLI zahŕňa aj schopnosť kombinovať príkazy, využívať históriu príkazov, skracovať zápis a optimalizovať príkazy tak, aby boli rýchle a prehľadné. Optimalizácia znamená napríklad minimalizáciu počtu príkazov alebo efektívne využitie pipeline.

<h1 class="exercise-topic"> Úloha 1: Chaining príkazov </h1>

<div class="exercise">

Napíšte Bash príkaz, ktorý:

- vytvorí nový súbor,
- zapíše doň text,
- a následne jeho obsah vypíše iba v prípade, že predchádzajúce operácie boli úspešné.

</div>

<h1 class="exercise-topic"> Úloha 2: Presmerovanie výstupu </h1>

<div class="exercise">

Vytvorte Bash príkaz, ktorý:

- vypíše obsah adresára do súboru,
- chybové hlásenia uloží do iného súboru.

</div>

<h1 class="exercise-topic"> Úloha 3: Kombinované presmerovanie </h1>

<div class="exercise">

Napíšte príkaz, ktorý presmeruje štandardný aj chybový výstup do jedného súboru.

</div>

<h1 class="exercise-topic"> Úloha 4: Filtrovanie pomocou grep </h1>

<div class="exercise">

Vytvorte príkaz, ktorý:

- vypíše obsah súboru,
- vyfiltruje riadky obsahujúce konkrétne slovo.

</div>

<h1 class="exercise-topic"> Úloha 5: Spracovanie textu pomocou awk </h1>

<div class="exercise">

Napíšte príkaz, ktorý:

- spracuje textový súbor,
- vypíše iba prvý stĺpec z každého riadku.

</div>

<h1 class="exercise-topic"> Úloha 6: Úprava textu pomocou sed </h1>

<div class="exercise">

Napíšte príkaz, ktorý nahradí konkrétne slovo v texte iným slovom.

</div>

<h1 class="exercise-topic"> Úloha 7: Pipeline v PowerShell </h1>

<div class="exercise">

Napíšte PowerShell príkaz, ktorý:

- získa zoznam procesov,
- vyfiltruje iba tie, ktoré používajú viac ako určitú hodnotu pamäte.

</div>

<h1 class="exercise-topic"> Úloha 8: Efektívna kombinácia príkazov </h1>

<div class="exercise">

Navrhnite príkaz alebo krátky skript, ktorý:

- nájde všetky .log súbory,
- vyfiltruje riadky obsahujúce slovo „error",
- spočíta ich počet.

</div>

<h1 class="exercise-topic"> Úloha 9: Optimalizácia príkazu </h1>

<div class="exercise">

Upravte (optimalizujte) príkaz (cat subor.txt | grep "text"), ktorý používa viacero zbytočných krokov, tak aby bol čo najefektívnejší (napr. zníženie počtu príkazov v pipeline).

</div>

<h1 class="exercise-topic"> Úloha 10: Kombinácia viacerých nástrojov </h1>

<div class="exercise">

Napíšte príkaz, ktorý:

- vypíše obsah súboru,
- vyfiltruje konkrétne riadky,
- upraví text,
- a uloží výsledok do nového súboru.

</div>
