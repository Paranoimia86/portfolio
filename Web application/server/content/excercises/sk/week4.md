# Cvičenie 4: Premenné, dátové štruktúry a typový systém

Premenné a dátové štruktúry sú základom každého skriptovacieho jazyka, pričom Bash a PowerShell sa v tejto oblasti výrazne líšia. Bash využíva dynamické typovanie bez explicitného typového systému, pričom všetky hodnoty sú v princípe reťazce. Naopak, PowerShell pracuje so silne typovanými objektmi, čo umožňuje presnejšiu manipuláciu s dátami a ich vlastnosťami.
V Bash sa dátové štruktúry realizujú najmä pomocou polí a asociatívnych polí (key-value), zatiaľ čo PowerShell poskytuje hashtable a plnohodnotné objekty. Práca s objektmi v PowerShelli umožňuje prístup k vlastnostiam a metódam, čo je zásadný rozdiel oproti textovému spracovaniu v Bash.
Environment variables predstavujú špeciálny typ premenných, ktoré sú dostupné naprieč procesmi. Ich správne využitie je kľúčové napríklad pri konfigurácii aplikácií alebo skriptov.
Serializácia dát (napr. JSON alebo XML) umožňuje ukladať a prenášať štruktúrované dáta. V moderných skriptoch je práca s JSON prakticky nevyhnutná, najmä pri komunikácii s API alebo ukladaní konfigurácií.

<h1 class="exercise-topic"> Úloha 1: Dynamické vs. silné typovanie v praxi </h1>

<div class="exercise">

Vytvorte dva skripty (Bash a PowerShell), ktoré demonštrujú rozdiel medzi dynamickým a silným typovaním.
Skript by mal:

- priradiť premennej číselnú hodnotu,
- následne ju použiť ako reťazec aj číslo,
- demonštrovať rozdiel v správaní (napr. sčítanie vs. konkatenácia).

</div>

<h1 class="exercise-topic"> Úloha 2: Asociatívne štruktúry dát </h1>

<div class="exercise">

V Bash vytvorte asociatívne pole obsahujúce informácie o používateľoch (napr. meno → vek).
V PowerShell vytvorte ekvivalentnú hashtable.
Následne implementujte:

- výpis všetkých prvkov,
- vyhľadanie konkrétneho kľúča,
- úpravu hodnoty.

</div>

<h1 class="exercise-topic"> Úloha 3: Práca s objektmi v PowerShell </h1>

<div class="exercise">

Vytvorte PowerShell skript, ktorý:

- získa zoznam procesov,
- pre každý proces vytvorí vlastný objekt obsahujúci len vybrané vlastnosti (napr. Name, Id, CPU),
- zoradí tieto objekty podľa CPU,
- vyberie top 5 procesov.

</div>

<h1 class="exercise-topic"> Úloha 4: Environment variables a ich dedenie </h1>

<div class="exercise">

Vytvorte skript, ktorý:

- nastaví environment premennú,
- spustí podproces, ktorý túto premennú využije,
- následne overí, či sa zmena prejavila aj mimo podprocesu.

Analyzujte správanie.

</div>

<h1 class="exercise-topic"> Úloha 5: Serializácia do JSON (PowerShell) </h1>

<div class="exercise">

Vytvorte PowerShell skript, ktorý:

- vytvorí vlastnú dátovú štruktúru (napr. zoznam používateľov),
- serializuje ju do JSON súboru,
- následne ju načíta späť a vypíše.

</div>

<h1 class="exercise-topic"> Úloha 6: Spracovanie JSON v Bash </h1>

<div class="exercise">

Vytvorte Bash skript, ktorý:

- načíta JSON súbor,
- extrahuje konkrétnu hodnotu (napr. meno používateľa),
- použije nástroj ako jq.

</div>

<h1 class="exercise-topic"> Úloha 7: Transformácia dát medzi formátmi </h1>

<div class="exercise">

Navrhnite skript (PowerShell alebo Bash), ktorý:

- načíta dáta v JSON formáte,
- transformuje ich do XML formátu,
- uloží výsledok do súboru.

</div>

<h1 class="exercise-topic"> Úloha 8: Kombinovaná dátová manipulácia </h1>

<div class="exercise">

Vytvorte skript, ktorý:

- načíta zoznam používateľov zo súboru (JSON),
- uloží ich do dátovej štruktúry,
- vykoná filtráciu (napr. vek > 18),
- vypíše výsledok.

</div>

<h1 class="exercise-topic"> Úloha 9: Dynamická tvorba dátových štruktúr </h1>

<div class="exercise">

Napíšte skript, ktorý:

- načíta vstup od používateľa,
- dynamicky vytvorí dátovú štruktúru (pole alebo hashtable),
- následne ju vypíše v serializovanej forme (JSON).

</div>

<h1 class="exercise-topic"> Úloha 10: Analýza typového systému </h1>

<div class="exercise">

Vytvorte experimentálny skript, ktorý:

- otestuje rôzne operácie nad premennými (čísla, reťazce, pole),
- zaznamená výsledky,
- porovná správanie Bash vs. PowerShell.

</div>
