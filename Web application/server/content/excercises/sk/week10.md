# Cvičenie 10: Automatizácia a plánovanie úloh

Automatizácia umožňuje nahradiť manuálne a opakujúce sa činnosti skriptmi, čím sa zvyšuje efektivita a znižuje riziko chýb. V praxi sa využíva napríklad pri zálohovaní, monitorovaní alebo správe systému. Kľúčovým cieľom je navrhnúť skripty, ktoré fungujú spoľahlivo, opakovane a bez zásahu používateľa.
Plánovanie úloh zabezpečuje automatické spúšťanie skriptov v definovanom čase alebo na základe udalostí. V Linuxe sa používa cron, vo Windows prostredí Task Scheduler. Pri návrhu je dôležité počítať s odlišným prostredím (napr. chýbajúce premenné, iné oprávnenia) a zabezpečiť logovanie a error handling.
Dôležitým princípom je idempotencia, teda schopnosť skriptu vykonať sa opakovane bez negatívnych dôsledkov. Automatizované riešenia by mali obsahovať validáciu vstupov, ošetrenie chýb a monitoring. V praxi ide často o kombináciu viacerých techník – plánovanie, logovanie, spracovanie dát a reakciu na chyby.

<h1 class="exercise-topic"> Úloha 1: Návrh automatizácie </h1>

<div class="exercise">

Navrhnite skript, ktorý automatizuje vybranú administrátorskú úlohu a je spustiteľný bez zásahu používateľa. Zohľadnite opakovateľnosť a stabilitu riešenia.

</div>

<h1 class="exercise-topic"> Úloha 2: Cron konfigurácia </h1>

<div class="exercise">

Vytvorte Bash skript a nastavte jeho spúšťanie pomocou cron tak, aby sa vykonával pravidelne. Zabezpečte správne presmerovanie výstupu a chýb.

</div>

<h1 class="exercise-topic"> Úloha 3: Prostredie cron </h1>

<div class="exercise">

Navrhnite skript, ktorý overí dostupnosť potrebných premenných a nástrojov pri spustení cez cron a zaznamená ich do logu.

</div>

<h1 class="exercise-topic"> Úloha 4: Task Scheduler </h1>

<div class="exercise">

Vytvorte PowerShell skript a naplánujte jeho spúšťanie pomocou Task Scheduler s definovaným triggerom a logovaním.

</div>

<h1 class="exercise-topic"> Úloha 5: Idempotentný skript </h1>

<div class="exercise">

Navrhnite skript, ktorý vykonáva operáciu nad systémom tak, aby jeho opakované spustenie neviedlo k chybe ani nekonzistentnému stavu.

</div>

<h1 class="exercise-topic"> Úloha 6: Error handling v automatizácii </h1>

<div class="exercise">

Vytvorte skript, ktorý deteguje chybu počas vykonávania, zaznamená ju a vhodne reaguje (napr. retry alebo ukončenie).

</div>

<h1 class="exercise-topic"> Úloha 7: Logovanie priebehu </h1>

<div class="exercise">

Navrhnite skript, ktorý zaznamenáva začiatok, priebeh a ukončenie vykonávania vrátane chýb a časových pečiatok.

</div>

<h1 class="exercise-topic"> Úloha 8: Notifikačný mechanizmus </h1>

<div class="exercise">

Vytvorte skript, ktorý po vykonaní úlohy generuje notifikáciu (napr. výpis alebo simulovaný alert).

</div>

<h1 class="exercise-topic"> Úloha 9: Kombinovaná úloha </h1>

<div class="exercise">

Navrhnite skript, ktorý vykonáva viacero operácií (napr. zálohovanie a čistenie), je plánovaný a obsahuje logovanie aj error handling.

</div>

<h1 class="exercise-topic"> Úloha 10: Komplexný automatizačný systém </h1>

<div class="exercise">

Navrhnite riešenie, ktoré kombinuje automatizáciu, plánovanie, monitoring a robustnosť a je vhodné pre dlhodobé použitie v praxi.

</div>
