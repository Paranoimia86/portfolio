# Cvičenie 7: Práca so súbormi a systémom

Práca so súbormi a systémom je kľúčovou súčasťou skriptovania v oblasti administrácie a DevOps. Skriptovací jazyk poskytuje abstrakciu nad súborovým systémom, ktorá umožňuje efektívne manipulovať so súbormi, adresármi a ich vlastnosťami. Táto abstrakcia zahŕňa operácie ako vytváranie, mazanie, presúvanie a čítanie súborov.
Dôležitým aspektom je práca s oprávneniami (permissions), ktoré určujú, kto môže súbor čítať, zapisovať alebo spúšťať. Správne nastavenie oprávnení je zásadné pre bezpečnosť systému.
Správa procesov a služieb umožňuje monitorovať a riadiť bežiace aplikácie. Skripty môžu napríklad spúšťať, zastavovať alebo kontrolovať stav služieb.
Monitoring systémových zdrojov zahŕňa sledovanie CPU, pamäte a diskového priestoru. Tieto informácie sú dôležité pre optimalizáciu výkonu a diagnostiku problémov.
Skriptovanie administrátorských úloh umožňuje automatizovať bežné operácie, ako sú zálohovanie, čistenie systému alebo správa používateľov.

<h1 class="exercise-topic"> Úloha 1: Abstrakcia súborového systému </h1>

<div class="exercise">

Navrhnite skript, ktorý prejde zadaný adresár a vytvorí prehľad všetkých súborov vrátane ich veľkosti, typu a dátumu poslednej úpravy. Výstup uložte do štruktúrovaného formátu.

</div>

<h1 class="exercise-topic"> Úloha 2: Práca s oprávneniami </h1>

<div class="exercise">

Vytvorte skript, ktorý:

- skontroluje oprávnenia všetkých súborov v adresári,
- identifikuje súbory s nebezpečnými oprávneniami (napr. zápis pre všetkých),
- upraví ich na bezpečné hodnoty.

</div>

<h1 class="exercise-topic"> Úloha 3: Správa procesov </h1>

<div class="exercise">

Navrhnite skript, ktorý:

- zistí zoznam bežiacich procesov,
- identifikuje procesy prekračujúce určitý limit CPU alebo pamäte,
- vypíše ich alebo vykoná akciu (napr. ukončenie).

</div>

<h1 class="exercise-topic"> Úloha 4: Správa služieb </h1>

<div class="exercise">

Vytvorte skript, ktorý:

- skontroluje stav vybranej služby,
- v prípade, že služba nebeží, ju automaticky spustí,
- zaznamená výsledok operácie.

</div>

<h1 class="exercise-topic"> Úloha 5: Monitoring systémových zdrojov </h1>

<div class="exercise">

Napíšte skript, ktorý:

- monitoruje využitie CPU a pamäte,
- pri prekročení definovaného limitu vypíše upozornenie alebo vykoná akciu.

</div>

<h1 class="exercise-topic"> Úloha 6: Automatizácia zálohovania </h1>

<div class="exercise">

Navrhnite skript, ktorý:

- vytvorí zálohu zadaného adresára,
- uloží ju s časovou pečiatkou,
- zabezpečí rotáciu starších záloh (napr. uchová len posledných 5).

</div>

<h1 class="exercise-topic"> Úloha 7: Práca s diskovým priestorom </h1>

<div class="exercise">

Vytvorte skript, ktorý:

- analyzuje využitie diskového priestoru,
- identifikuje najväčšie súbory,
- vypíše prehľad.

</div>

<h1 class="exercise-topic"> Úloha 8: Kombinovaná administrátorská úloha </h1>

<div class="exercise">

Navrhnite skript, ktorý:

- skontroluje stav systému (disk, CPU),
- identifikuje problémy,
- vykoná nápravné opatrenia (napr. vyčistenie dočasných súborov).

</div>

<h1 class="exercise-topic"> Úloha 9: Práca so súbormi a filtrácia </h1>

<div class="exercise">

Napíšte skript, ktorý:

- nájde súbory podľa kritéria (napr. prípona, veľkosť),
- vykoná nad nimi operáciu (napr. presun alebo mazanie).

</div>

<h1 class="exercise-topic"> Úloha 10: Komplexná administrátorská automatizácia </h1>

<div class="exercise">

Navrhnite komplexný skript, ktorý:

- kombinuje prácu so súbormi, procesmi a systémovými zdrojmi,
- vykonáva viacero kontrol,
- generuje report o stave systému.

</div>
