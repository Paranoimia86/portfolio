# Cvičenie 11: Práca so sieťou a externými zdrojmi

Skriptovanie v modernom IT prostredí často zahŕňa komunikáciu s externými systémami prostredníctvom siete. Skripty už nefungujú izolovane, ale integrujú rôzne služby, API a cloudové platformy. Táto schopnosť umožňuje automatizovať komplexné procesy a prepájať viaceré systémy.
Základom sieťovej komunikácie je HTTP protokol, ktorý funguje na princípe klient–server. Skript vystupuje ako klient a odosiela požiadavky (napr. GET, POST), pričom odpoveď servera obsahuje dáta a stavový kód. Správne spracovanie stavových kódov je kľúčové pre robustnosť riešenia.
API predstavuje rozhranie pre komunikáciu medzi systémami. Práca s API zahŕňa nielen odosielanie požiadaviek, ale aj spracovanie odpovedí (najčastejšie vo formáte JSON) a riešenie autentifikácie. Bezpečnosť je kritická – citlivé údaje nesmú byť uložené priamo v skripte.
Sieťové prostredie je nepredvídateľné, preto musí skript obsahovať mechanizmy na ošetrenie chýb, ako sú retry, timeout alebo validácia odpovede. Správne navrhnutý skript dokáže reagovať na výpadky a pokračovať v činnosti.
Praktické využitie spočíva najmä v integrácii systémov – skript načíta dáta, spracuje ich a odovzdá ďalej. Takéto riešenia tvoria základ moderných automatizačných a DevOps procesov.

<h1 class="exercise-topic"> Úloha 1: HTTP GET požiadavka </h1>

<div class="exercise">

Navrhnite skript, ktorý odošle HTTP GET požiadavku na API, spracuje odpoveď a vypíše vybrané údaje.

</div>

<h1 class="exercise-topic"> Úloha 2: Kontrola stavového kódu </h1>

<div class="exercise">

Vytvorte skript, ktorý:

- odošle požiadavku na server,
- skontroluje HTTP stavový kód,
- na základe výsledku rozhodne o ďalšom postupe.

</div>

<h1 class="exercise-topic"> Úloha 3: Práca s REST API </h1>

<div class="exercise">

Navrhnite skript, ktorý:

- načíta dáta z REST API,
- spracuje ich,
- vyfiltruje konkrétne položky.

</div>

<h1 class="exercise-topic"> Úloha 4: Spracovanie JSON dát </h1>

<div class="exercise">

Vytvorte skript, ktorý:

- načíta JSON odpoveď,
- extrahuje konkrétne hodnoty,
- vykoná nad nimi operáciu.

</div>

<h1 class="exercise-topic"> Úloha 5: Autentifikácia </h1>

<div class="exercise">

Navrhnite skript, ktorý:

- komunikuje s API vyžadujúcim autentifikáciu,
- použije token alebo API kľúč,
- zabezpečí bezpečné uloženie údajov.

</div>

<h1 class="exercise-topic"> Úloha 6: Retry mechanizmus </h1>

<div class="exercise">

Vytvorte skript, ktorý:

- sa pokúsi o sieťovú operáciu,
- v prípade zlyhania ju zopakuje,
- po určitom počte pokusov skončí.

</div>

<h1 class="exercise-topic"> Úloha 7: Timeout a robustnosť </h1>

<div class="exercise">

Navrhnite skript, ktorý:

- nastaví časový limit pre požiadavku,
- ošetrí situáciu, keď server neodpovedá.

</div>

<h1 class="exercise-topic"> Úloha 8: Integrácia systémov </h1>

<div class="exercise">

Vytvorte skript, ktorý:

- načíta dáta z API,
- transformuje ich,
- uloží ich do lokálneho súboru.

</div>

<h1 class="exercise-topic"> Úloha 9: Bezpečná práca s údajmi </h1>

<div class="exercise">

Navrhnite skript, ktorý:

- používa environment premenné na uloženie citlivých údajov,
- využije ich pri komunikácii s API.

</div>

<h1 class="exercise-topic"> Úloha 10: Komplexný integračný skript </h1>

<div class="exercise">

Navrhnite skript, ktorý:

- komunikuje s API,
- spracováva dáta,
- implementuje error handling, retry a logovanie.

</div>
