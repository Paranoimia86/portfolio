# Prednáška 2: Architektúra shellov a execution model

## Cieľ prednášky

Cieľom prednášky je poskytnúť študentom hlbšie pochopenie mechanizmov, ktoré prebiehajú pri vykonávaní príkazov v shelli. Prednáška sa zameriava na spôsob správy procesov, kontext vykonávania, rozdiely medzi režimami shellu a princípy prenosu dát medzi príkazmi. Osvojenie si týchto konceptov je nevyhnutné pre návrh efektívnych, spoľahlivých a škálovateľných skriptov.

## 1. Procesy a vykonávanie príkazov

Pri práci so shellom je každý príkaz interpretovaný ako požiadavka na vykonanie konkrétneho programu alebo internej operácie. V operačnom systéme to znamená vytvorenie nového procesu, ktorý má vlastný adresný priestor, identifikátor (PID) a pridelené systémové zdroje.
Shell pri vykonávaní príkazu najprv analyzuje jeho syntaktickú štruktúru, identifikuje, či ide o interný príkaz (builtin) alebo externý program, a následne zabezpečí jeho spustenie. V prípade externého programu využíva mechanizmy operačného systému (napr. fork/exec v Unix systémoch), pričom rodičovský proces (shell) môže čakať na dokončenie potomka alebo pokračovať v ďalšej činnosti.
Sekvenčné vykonávanie znamená, že príkazy sa spracúvajú jeden po druhom, pričom každý ďalší príkaz sa vykoná až po ukončení predchádzajúceho. Tento model je základný, no v praxi je často rozširovaný o paralelné spracovanie.

### Bash

<div class="bash-code-example">
<pre><code>sleep 3
echo "Príkaz bol dokončený"
</code></pre>
</div>

### PowerShell

<div class="powershell-code-example">
<pre><code>Start-Sleep -Seconds 3
Write-Output "Príkaz bol dokončený"
</code></pre>
</div>

Pochopenie životného cyklu procesu je kľúčové najmä pri diagnostike problémov, optimalizácii výkonu a návrhu skriptov, ktoré pracujú s viacerými úlohami súčasne.

## 2. Subshell a execution context

Execution context predstavuje súbor informácií, ktoré definujú prostredie, v ktorom sa príkaz alebo skript vykonáva. Zahŕňa napríklad hodnoty premenných, aktuálny pracovný adresár, environment variables a ďalšie nastavenia.
Pri určitých operáciách shell vytvára tzv. subshell, teda nový proces, ktorý dedí kontext rodičovského shellu, no následné zmeny vykonané v tomto prostredí sa nepropagujú späť. Tento mechanizmus je veľmi dôležitý, pretože môže viesť k neočakávanému správaniu skriptov, ak si ho programátor neuvedomuje.

V Bash sa subshell často vytvára pomocou zátvoriek alebo pri použití pipeline. Každý segment pipeline môže byť vykonaný v samostatnom procese, čo znamená, že zmeny premenných nemusia byť dostupné mimo neho.

<div class="bash-code-example">
<pre><code>VAR="povodna"
( VAR="zmenena"; echo $VAR )
echo $VAR
</code></pre>
</div>

V PowerShelli sa pracuje so scope (rozsahmi platnosti premenných), pričom podobné správanie možno pozorovať pri vykonávaní blokov kódu alebo skriptov.

<div class="powershell-code-example">
<pre><code>$var = "povodna"
& {
$var = "zmenena"
Write-Output $var
}
Write-Output $var
</code></pre>
</div>

Pochopenie execution contextu je zásadné pri návrhu modulárnych skriptov, práci s funkciami a pri debugovaní.

## 3. Interaktívny vs. neinteraktívny režim

Shell môže fungovať v interaktívnom alebo neinteraktívnom režime, pričom každý z nich má svoje špecifiká a využitie.
Interaktívny režim predstavuje priamu komunikáciu medzi používateľom a shellom. Používateľ zadáva príkazy, okamžite vidí výsledky a môže reagovať na výstupy. Tento režim je typický pre administráciu systému, testovanie príkazov alebo exploratívnu prácu.
Naopak, neinteraktívny režim je charakteristický pre skripty, ktoré sa vykonávajú bez zásahu používateľa. V tomto prípade shell spracúva príkazy zo súboru alebo iného zdroja a vykonáva ich sekvenčne.
Rozdiel medzi týmito režimami má praktické dôsledky:

- v interaktívnom režime sú dostupné určité funkcie (napr. aliasy, histórie),
- v neinteraktívnom režime je potrebné explicitne definovať všetky závislosti.

### Bash

<div class="bash-code-example">
<pre><code>#!/bin/bash
echo "Spustené v neinteraktívnom režime"
</code></pre>
</div>

V návrhu skriptov je dôležité zabezpečiť, aby fungovali spoľahlivo aj bez interakcie používateľa, čo zahŕňa napríklad validáciu vstupov alebo ošetrenie chýb.

## 4. Environment a premenné prostredia

Každý proces beží v určitom prostredí, ktoré je definované množinou environment variables. Tieto premenné poskytujú informácie o konfigurácii systému, používateľovi alebo dostupných zdrojoch.
Environment variables sú dedené medzi procesmi, čo znamená, že potomkovský proces zdedí prostredie svojho rodiča. Tento mechanizmus umožňuje napríklad nastaviť globálne konfigurácie alebo definovať cestu k spustiteľným súborom.
Jednou z najdôležitejších premenných je PATH, ktorá určuje, kde shell hľadá spustiteľné programy.

### Bash

<div class="bash-code-example">
<pre><code>echo $PATH
</code></pre>
</div>

### PowerShell

<div class="powershell-code-example">
<pre><code>$env:PATH
</code></pre>
</div>

Okrem toho je možné definovať vlastné premenné prostredia, ktoré môžu byť využité v rámci skriptov alebo iných aplikácií. Správne pochopenie práce s prostredím je kľúčové pre tvorbu prenositeľných a konfigurovateľných riešení.

## 5. Pipeline – tok dát medzi príkazmi

Pipeline predstavuje jeden z najdôležitejších mechanizmov shellu, ktorý umožňuje efektívne spracovanie dát pomocou kombinácie jednoduchých príkazov. Namiesto ukladania medzivýsledkov do súborov je možné tieto výsledky priamo prenášať medzi príkazmi.
V Bash pipeline prenáša textové dáta, pričom každý príkaz pracuje s prúdmi znakov. Tento prístup je veľmi flexibilný, no vyžaduje časté parsovanie textu.

<div class="bash-code-example">
<pre><code>cat log.txt | grep "ERROR" | sort
</code></pre>
</div>

PowerShell využíva objektovú pipeline, kde sa medzi príkazmi prenášajú štruktúrované objekty. To umožňuje presnejšiu manipuláciu s dátami a znižuje potrebu textového spracovania.

<div class="powershell-code-example">
<pre><code>Get-Content log.txt | Where-Object { $_ -match "ERROR" }
</code></pre>
</div>

Pipeline podporuje princíp modularity, kde každý príkaz vykonáva jednu konkrétnu úlohu a výsledok je následne spracovaný ďalším príkazom. Tento prístup vedie k tvorbe prehľadných a znovupoužiteľných riešení.

## 6. Exit kódy a riadenie toku vykonávania

Každý proces po svojom ukončení vracia exit code, ktorý signalizuje výsledok jeho vykonania. Hodnota 0 znamená úspech, zatiaľ čo nenulové hodnoty indikujú rôzne typy chýb.
Tieto kódy sú základom pre riadenie toku vykonávania v skriptoch, pretože umožňujú reagovať na úspech alebo zlyhanie jednotlivých operácií.

<div class="bash-code-example">
<pre><code>ls subor.txt
echo $?
</code></pre>
</div>

V PowerShelli je možné sledovať návratový kód pomocou špeciálnych premenných:

<div class="powershell-code-example">
<pre><code>Get-Item subor.txt
$LASTEXITCODE
</code></pre>
</div>

Na základe týchto hodnôt možno implementovať robustné skripty, ktoré dokážu ošetriť chyby a zabezpečiť správne pokračovanie programu.

## 7. Sekvenčné a paralelné vykonávanie

Predvolený model vykonávania príkazov v shelli je sekvenčný, čo znamená, že príkazy sa vykonávajú jeden po druhom. Tento prístup je jednoduchý a predvídateľný, no pri niektorých úlohách môže byť neefektívny.
Shell však umožňuje aj paralelné vykonávanie, ktoré spočíva v spustení viacerých procesov súčasne. Tento prístup môže výrazne zlepšiť výkon, najmä pri úlohách, ktoré nie sú na sebe závislé.

<div class="bash-code-example">
<pre><code>sleep 5 &
echo "Pokračujem bez čakania"
</code></pre>
</div>

V PowerShelli možno paralelizmus dosiahnuť napríklad pomocou jobov:

<div class="powershell-code-example">
<pre><code>Start-Job { Start-Sleep 5 }
Write-Output "Pokračujem bez čakania"
</code></pre>
</div>

Pochopenie rozdielu medzi sekvenčným a paralelným spracovaním je dôležité pri návrhu efektívnych skriptov a optimalizácii výkonu.
