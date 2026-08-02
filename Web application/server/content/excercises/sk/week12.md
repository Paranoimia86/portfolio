# Cvičenie 12: Bezpečnosť a best practices v skriptovaní

Bezpečnosť v skriptovaní je kritická, pretože skripty často pracujú so systémom na nízkej úrovni, manipulujú so súbormi, procesmi a komunikujú s externými službami. Nesprávne navrhnutý skript môže viesť k vážnym bezpečnostným problémom, ako je únik dát alebo vykonanie nebezpečných operácií.
Kľúčovým aspektom je práca s citlivými údajmi. Tieto údaje nesmú byť uložené priamo v kóde, ale mali by byť spravované pomocou environment variables alebo zabezpečených konfiguračných súborov. Rovnako dôležitá je validácia vstupov, ktorá zabraňuje chybám a útokom (napr. injection).
Princíp minimálnych oprávnení zabezpečuje, že skript má len také práva, aké skutočne potrebuje. Tým sa minimalizuje riziko poškodenia systému.
Best practices zahŕňajú písanie čitateľného a modulárneho kódu, používanie funkcií, komentárov a konzistentnej štruktúry. Udržiavateľnosť kódu je kľúčová pre jeho dlhodobé používanie a rozširovanie.
Pri nasadení skriptov do praxe je nevyhnutné zabezpečiť ich spoľahlivosť, logovanie, monitoring a správne fungovanie v cieľovom prostredí. Skript musí byť pripravený na reálne podmienky, vrátane chýb a nepredvídateľných situácií.

<h1 class="exercise-topic"> Úloha 1: Bezpečný skript </h1>

<div class="exercise">

Navrhnite skript, ktorý vykonáva operácie nad súbormi a zároveň minimalizuje bezpečnostné riziká (validácia vstupu, kontrola oprávnení).

</div>

<h1 class="exercise-topic"> Úloha 2: Práca s citlivými údajmi </h1>

<div class="exercise">

Vytvorte skript, ktorý:

- využíva citlivé údaje (napr. API kľúč),
- neukladá ich priamo v kóde,
- načítava ich bezpečným spôsobom.

</div>

<h1 class="exercise-topic"> Úloha 3: Validácia vstupov </h1>

<div class="exercise">

Navrhnite skript, ktorý:

- overí vstupné parametre (formát, rozsah),
- ošetrí neplatné vstupy,
- zabráni nesprávnemu vykonaniu operácií.

</div>

<h1 class="exercise-topic"> Úloha 4: Princíp minimálnych oprávnení </h1>

<div class="exercise">

Vytvorte skript, ktorý:

- vykonáva operáciu s minimálnymi oprávneniami,
- kontroluje, či má potrebné práva.

</div>

<h1 class="exercise-topic"> Úloha 5: Refaktoring skriptu </h1>

<div class="exercise">

Upravte existujúci skript tak, aby:

- bol čitateľnejší,
- využíval funkcie,
- mal jasnú štruktúru.

</div>

<h1 class="exercise-topic"> Úloha 6: Dokumentácia kódu </h1>

<div class="exercise">

Navrhnite skript, ktorý:

- obsahuje komentáre,
- dokumentuje funkcie a ich použitie.

</div>

<h1 class="exercise-topic"> Úloha 7: Udržiavateľnosť </h1>

<div class="exercise">

Vytvorte skript, ktorý:

- je rozdelený do viacerých častí (moduly),
- umožňuje jednoduché rozšírenie.

</div>

<h1 class="exercise-topic"> Úloha 8: Bezpečné spracovanie vstupu </h1>

<div class="exercise">

Navrhnite skript, ktorý:

- spracuje vstup od používateľa,
- zabráni vykonaniu nebezpečných príkazov.

</div>

<h1 class="exercise-topic"> Úloha 9: Nasadenie skriptu </h1>

<div class="exercise">

Navrhnite skript, ktorý:

- je pripravený na produkčné prostredie,
- obsahuje logovanie a error handling.

</div>

<h1 class="exercise-topic"> Úloha 10: Komplexný bezpečný skript </h1>

<div class="exercise">

Navrhnite riešenie, ktoré:

- kombinuje bezpečnosť, validáciu, modularitu a logovanie,
