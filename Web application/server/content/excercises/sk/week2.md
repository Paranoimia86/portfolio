# Cvičenie 2: Architektúra shellov a execution model

Shell funguje ako prostredník medzi používateľom a operačným systémom, pričom každé spustenie príkazu vytvára proces. Proces je bežiaca inštancia programu, ktorá má pridelené systémové zdroje, ako sú pamäť či CPU. Pri práci so shellom je dôležité pochopiť, že niektoré príkazy sa vykonávajú v rámci aktuálneho shellu, zatiaľ čo iné vytvárajú nový proces alebo tzv. subshell.
Subshell predstavuje podproces, ktorý dedí prostredie rodičovského shellu, ale zmeny vykonané v subshelli sa neprejavia späť v rodičovskom procese. S tým úzko súvisí aj pojem environment, teda množina premenných prostredia, ktoré ovplyvňujú správanie procesov.
Dôležitým aspektom je aj execution context. Shell môže pracovať v interaktívnom režime (napr. terminál, kde používateľ zadáva príkazy ručne) alebo v neinteraktívnom režime (napr. spustenie skriptu). Tieto režimy sa líšia napríklad v načítavaní konfiguračných súborov a správaní príkazov.
Pipeline je mechanizmus, ktorý umožňuje prepojiť viacero príkazov. V prostredí Bash sa medzi príkazmi prenáša textový výstup, zatiaľ čo v PowerShelli ide o prenos objektov, čo umožňuje pokročilejšie operácie nad dátami.
Každý skript má svoj životný cyklus – od spustenia, cez vykonávanie jednotlivých príkazov až po ukončenie. Pri ukončení skriptu je dôležitý tzv. exit kód, ktorý signalizuje úspech alebo chybu. Štandardne hodnota 0 znamená úspech, zatiaľ čo nenulové hodnoty indikujú chybu.

<h1 class="exercise-topic"> Úloha 1: Proces a subshell v Bash </h1>

<div class="exercise">

Vytvorte Bash skript, ktorý nastaví premennú v hlavnom shelli a následne ju skúsi zmeniť v subshelli. Overte, či sa zmena prejaví aj v pôvodnom shelli, a výstup vhodne vypíšte.

</div>

<h1 class="exercise-topic"> Úloha 2: Práca s environment premennými </h1>

<div class="exercise">

Napíšte Bash skript, ktorý vypíše hodnoty vybraných environment premenných (napr. HOME, PATH, USER) a následne vytvorí vlastnú premennú prostredia, ktorú sprístupní aj pre podproces.

</div>

<h1 class="exercise-topic"> Úloha 3: Interaktívny vs. neinteraktívny režim </h1>

<div class="exercise">

Vytvorte skript, ktorý zistí, či je spustený v interaktívnom alebo neinteraktívnom režime, a podľa toho vypíše rôzne správy.

</div>

<h1 class="exercise-topic"> Úloha 4: Pipeline v Bash </h1>

<div class="exercise">

Napíšte Bash príkaz (alebo krátky skript), ktorý:

- vypíše obsah adresára,
- vyfiltruje iba súbory s príponou .txt,
- spočíta ich počet pomocou pipeline.

</div>

<h1 class="exercise-topic"> Úloha 5: Pipeline v PowerShell </h1>

<div class="exercise">

Napíšte PowerShell príkaz, ktorý:

- získa zoznam súborov,
- vyfiltruje iba .txt súbory,
- vypíše ich názvy a počet pomocou pipeline.

</div>

<h1 class="exercise-topic"> Úloha 6: Exit kódy a kontrola chýb </h1>

<div class="exercise">

Vytvorte skript (Bash alebo PowerShell), ktorý:

- sa pokúsi vykonať príkaz (napr. otvorenie neexistujúceho súboru),
- skontroluje exit kód predchádzajúceho príkazu,
- vypíše správu o úspechu alebo chybe.

</div>

<h1 class="exercise-topic"> Úloha 7: Práca s viacerými procesmi </h1>

<div class="exercise">

Napíšte Bash skript, ktorý spustí dva príkazy paralelne (napr. sleep 5 a sleep 3) a po ich dokončení vypíše správu, že oba procesy skončili.

</div>

<h1 class="exercise-topic"> Úloha 8: Subshell a pipeline </h1>

<div class="exercise">

Vytvorte Bash príkaz alebo skript, ktorý využije subshell v kombinácii s pipeline. Napríklad spracujte výstup príkazu v subshelli a následne ho odovzdajte ďalšiemu príkazu na spracovanie.

</div>

<h1 class="exercise-topic"> Úloha 9: Exit kód vlastného skriptu </h1>

<div class="exercise">

Napíšte skript, ktorý:

- skontroluje, či bol zadaný argument pri spustení,
- ak nie, ukončí sa s exit kódom 1,
- ak áno, vypíše argument a ukončí sa s exit kódom 0.

</div>

<h1 class="exercise-topic"> Úloha 10: Logging a kontrola priebehu </h1>

<div class="exercise">

Vytvorte skript, ktorý:

- vykoná viacero príkazov za sebou,
- po každom príkaze skontroluje exit kód,
- zapíše výsledok (úspech/neúspech) do log súboru.

</div>
