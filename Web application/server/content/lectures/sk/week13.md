# Prednáška 13: Pokročilé koncepty a paralelizmus

## Cieľ prednášky

Cieľom prednášky je rozšíriť poznatky študentov o problematiku výkonnosti a efektivity skriptov a zároveň ich naučiť analyzovať a optimalizovať existujúce riešenia. Dôraz sa kladie na návrh skriptov, ktoré sú schopné pracovať s veľkým objemom dát, efektívne využívať systémové zdroje a zachovať si udržiavateľnosť. Prednáška zároveň pripravuje študentov na reálne scenáre, kde je výkon kritickým faktorom.

## 1. Význam optimalizácie v skriptovaní

Optimalizácia predstavuje proces zlepšovania výkonu skriptu s cieľom dosiahnuť rýchlejšie vykonávanie, nižšie nároky na systémové zdroje a lepšiu škálovateľnosť. V kontexte skriptovania sa tento aspekt často podceňuje, najmä pri menších úlohách, kde rozdiel vo výkone nie je výrazný. Avšak v reálnych podmienkach, kde skripty spracovávajú veľké objemy dát alebo bežia opakovane, sa neefektivita môže rýchlo prejaviť.
Neoptimalizovaný skript môže spôsobiť nadmerné zaťaženie procesora, zvýšenú spotrebu pamäte alebo zbytočné diskové operácie. V extrémnych prípadoch môže viesť k spomaleniu celého systému alebo k zlyhaniu kritických procesov. Preto je dôležité uvažovať o výkonnosti už v návrhovej fáze a identifikovať potenciálne úzke miesta.
Z návrhového hľadiska optimalizácia zahŕňa nielen samotnú implementáciu, ale aj voľbu vhodných nástrojov a algoritmov. Napríklad použitie efektívneho systémového nástroja môže byť výrazne rýchlejšie než manuálne spracovanie dát v cykle.

## 2. Identifikácia výkonnostných problémov

Prvým krokom optimalizácie je identifikácia častí skriptu, ktoré spôsobujú najväčšie spomalenie. Tento proces zahŕňa analýzu správania skriptu a meranie jeho výkonu.
Medzi typické zdroje neefektivity patria opakované vykonávanie rovnakých operácií, neefektívne cykly alebo nadmerné volanie externých príkazov. Problémom môže byť aj spracovanie dát bez predchádzajúcej filtrácie, čo vedie k zbytočnému spracovaniu veľkého množstva informácií.

V Bash je možné použiť jednoduché nástroje na meranie času vykonávania:

<div class="bash-code-example">
<pre><code>time ./script.sh
</code></pre>
</div>

V PowerShelli:

<div class="powershell-code-example">
<pre><code>Measure-Command { ./script.ps1 }
</code></pre>
</div>

Tieto nástroje poskytujú základný prehľad o výkone, no pri komplexnejších skriptoch je potrebné analyzovať jednotlivé časti kódu samostatne. Systematický prístup k analýze výkonu umožňuje zamerať sa na konkrétne problémy a efektívne ich riešiť.

## 3. Efektívna práca s dátami

Spracovanie dát predstavuje jednu z najnáročnejších činností v skriptovaní, najmä ak ide o veľké súbory alebo dátové toky. Efektivita spracovania má priamy vplyv na výkon skriptu.
Jedným z kľúčových princípov je minimalizácia množstva spracovávaných dát. To znamená filtrovať relevantné informácie čo najskôr a vyhnúť sa spracovaniu nepotrebných údajov. Tento prístup výrazne znižuje počet operácií a zlepšuje výkon.
Ďalším dôležitým aspektom je spôsob spracovania dát. Namiesto načítania celého súboru do pamäte je často výhodnejšie spracovávať dáta postupne, napríklad riadok po riadku. Tento prístup znižuje pamäťové nároky a umožňuje pracovať aj s veľmi veľkými súbormi.
Z návrhového hľadiska je tiež dôležité vyhnúť sa zbytočnému ukladaniu medzivýsledkov. Každá operácia zápisu alebo čítania z disku predstavuje potenciálne spomalenie, preto je vhodné minimalizovať tieto operácie.

## 4. Optimalizácia cyklov a operácií

Cykly patria medzi najčastejšie používané konštrukcie v skriptovaní, no zároveň predstavujú častý zdroj neefektivity. Každá iterácia cyklu znamená opakované vykonanie operácií, čo môže byť pri veľkom počte iterácií výrazne náročné.
Pri optimalizácii cyklov je dôležité analyzovať, či je cyklus skutočne potrebný, alebo či existuje efektívnejšie riešenie. V mnohých prípadoch možno cyklus nahradiť použitím optimalizovaných nástrojov, ako sú grep, awk alebo sed, ktoré sú navrhnuté na efektívne spracovanie dát.
Ďalším princípom je presun náročných operácií mimo cyklu. Ak sa určitá operácia opakuje v každej iterácii, je vhodné ju vykonať len raz a výsledok použiť opakovane.
Optimalizácia cyklov si vyžaduje dôkladné pochopenie logiky programu a schopnosť identifikovať zbytočné operácie. Správne navrhnutý cyklus môže výrazne zlepšiť výkon skriptu.

## 5. Paralelizácia a škálovanie

Pri spracovaní veľkého množstva dát môže byť výhodné rozdeliť úlohu na menšie časti a vykonávať ich paralelne. Paralelizácia umožňuje efektívnejšie využitie viacjadrových procesorov a výrazne skracuje čas vykonávania.

V Bash možno paralelizáciu dosiahnuť spustením viacerých procesov na pozadí:

<div class="bash-code-example">
<pre><code>command1 & command2 & wait
</code></pre>
</div>

PowerShell poskytuje pokročilejšie možnosti, napríklad paralelné spracovanie pomocou:

<div class="powershell-code-example">
<pre><code>ForEach-Object -Parallel { ... }
</code></pre>
</div>

Škálovanie predstavuje schopnosť skriptu zvládať rastúci objem dát alebo požiadaviek bez výrazného poklesu výkonu. Pri návrhu je preto potrebné myslieť na budúce rozšírenie a navrhovať riešenia, ktoré budú schopné pracovať aj pri vyššej záťaži.
Paralelizácia však prináša aj nové výzvy, ako je synchronizácia procesov alebo prístup k zdieľaným zdrojom, ktoré je potrebné správne riešiť.

## 6. Best practices pre výkonnosť

Optimalizácia by nemala byť na úkor čitateľnosti a udržiavateľnosti kódu. Preto je dôležité dodržiavať osvedčené postupy, ktoré umožňujú dosiahnuť rovnováhu medzi výkonom a kvalitou kódu.
Medzi základné princípy patrí používanie efektívnych nástrojov, minimalizácia volania externých procesov a optimalizácia pipeline. Dôležité je tiež pravidelné testovanie výkonu po každej úprave, aby bolo možné overiť jej prínos.
Z návrhového hľadiska je vhodné začať s jednoduchým a čitateľným riešením a optimalizovať ho až v prípade potreby. Predčasná optimalizácia môže viesť k zbytočne komplikovanému kódu, ktorý je ťažko udržiavateľný.
