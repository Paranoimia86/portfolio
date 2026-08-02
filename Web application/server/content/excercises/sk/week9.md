# Cvičenie 9: Error handling a robustnosť skriptov

Robustnosť skriptov je kľúčová najmä v produkčnom prostredí, kde zlyhanie môže mať vážne dôsledky. Preto je dôležité správne implementovať error handling, teda mechanizmy na zachytávanie a riešenie chýb.
V Bash sa error handling realizuje najmä pomocou návratových (exit) kódov, kde hodnota 0 znamená úspech a nenulová hodnota indikuje chybu. PowerShell okrem toho poskytuje aj mechanizmus výnimiek (exceptions), ktorý umožňuje pokročilejšie riadenie chýb pomocou konštrukcií try/catch.
Defensive programming znamená navrhovať skripty tak, aby predchádzali chybám – napríklad validáciou vstupov, kontrolou existencie súborov alebo ošetrením nepredvídaných situácií.
Logovanie slúži na zaznamenávanie priebehu vykonávania skriptu, čo umožňuje jednoduchšie debugovanie a audit. Správne logovanie by malo obsahovať informácie o chybách, varovaniach aj úspešných operáciách.
Testovanie skriptov je dôležité pre overenie správnosti a spoľahlivosti. Zahŕňa testovanie rôznych vstupov, hraničných prípadov a chybových scenárov.

<h1 class="exercise-topic"> Úloha 1: Práca s návratovými kódmi </h1>

<div class="exercise">

Navrhnite skript, ktorý vykoná viacero operácií nad súbormi a po každom kroku vyhodnotí návratový kód. Na základe výsledku rozhodne, či bude pokračovať alebo ukončí vykonávanie.

</div>

<h1 class="exercise-topic"> Úloha 2: Implementácia try/catch (PowerShell) </h1>

<div class="exercise">

Vytvorte PowerShell skript, ktorý:

- vykoná operáciu, ktorá môže zlyhať,
- použije try/catch na zachytenie chyby,
- spracuje chybu a vypíše relevantnú správu.

</div>

<h1 class="exercise-topic"> Úloha 3: Defensive programming </h1>

<div class="exercise">

Navrhnite skript, ktorý:

- validuje všetky vstupy (parametre, súbory),
- ošetruje neplatné vstupy,
- zabraňuje pádu skriptu.

</div>

<h1 class="exercise-topic"> Úloha 4: Logovanie operácií </h1>

<div class="exercise">

Vytvorte skript, ktorý:

- zaznamenáva priebeh vykonávania do log súboru,
- zapisuje informácie o úspechu aj chybe,
- obsahuje časové pečiatky.

</div>

<h1 class="exercise-topic"> Úloha 5: Kombinovaný error handling </h1>

<div class="exercise">

Navrhnite skript, ktorý:

- kombinuje kontrolu exit kódov a logovanie,
- reaguje na chyby rôznym spôsobom (napr. retry, ukončenie).

</div>

<h1 class="exercise-topic"> Úloha 6: Testovanie skriptu </h1>

<div class="exercise">

Navrhnite testovací skript, ktorý:

- otestuje rôzne vstupy (platné aj neplatné),
- vyhodnotí výsledky,
- vypíše prehľad testov.

</div>

<h1 class="exercise-topic"> Úloha 7: Simulácia chyby </h1>

<div class="exercise">

Vytvorte skript, ktorý:

- úmyselne vyvolá chybu,
- zachytí ju,
- zaznamená ju do logu.

</div>

<h1 class="exercise-topic"> Úloha 8: Retry mechanizmus </h1>

<div class="exercise">

Navrhnite skript, ktorý:

- sa pokúsi vykonať operáciu viackrát,
- pri neúspechu ju zopakuje,
- po určitom počte pokusov skončí.

</div>

<h1 class="exercise-topic"> Úloha 9: Validácia komplexného vstupu </h1>

<div class="exercise">

Vytvorte skript, ktorý:

- overí komplexný vstup (napr. kombinácia parametrov),
- zabezpečí ich konzistenciu,
- vypíše chyby v prípade nesprávneho použitia.

</div>

<h1 class="exercise-topic"> Úloha 10: Robustný skript </h1>

<div class="exercise">

Navrhnite komplexný skript, ktorý:

- obsahuje validáciu vstupov,
- implementuje error handling,
- využíva logovanie,
- je odolný voči chybám.

</div>
