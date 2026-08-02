# Prednáška 7: Práca so súbormi a systémom

## Cieľ prednášky

Cieľom prednášky je poskytnúť študentom komplexné pochopenie práce so súborovým systémom a systémovými zdrojmi v prostrediach Bash a PowerShell. Prednáška sa zameriava nielen na samotné operácie so súbormi, ale aj na ich kontext – oprávnenia, výkon, bezpečnosť a spoľahlivosť. Študenti sa naučia navrhovať skripty, ktoré dokážu pracovať s reálnymi dátami a zvládajú aj chybové scenáre.

## 1. Súborový systém a jeho význam v skriptovaní

Súborový systém predstavuje základnú infraštruktúru pre ukladanie a organizáciu dát, pričom skriptovanie nad ním umožňuje automatizovať široké spektrum operácií. V praxi takmer každý skript interaguje so súbormi – či už ide o načítanie vstupných údajov, generovanie výstupov alebo manipuláciu s existujúcimi dátami.

V Bash je práca so súbormi úzko spätá s Unixovou filozofiou, kde sú rôzne systémové entity reprezentované ako súbory. To umožňuje jednotný spôsob práce, ale zároveň vyžaduje dôkladné pochopenie toho, čo jednotlivé „súbory" reprezentujú. PowerShell naopak pristupuje k súborovému systému cez objektový model, kde každý prvok obsahuje štruktúrované informácie.

Pri návrhu skriptov je dôležité uvažovať nad:

- kontextom vykonávania (aktuálny pracovný adresár),
- prenositeľnosťou (relatívne vs. absolútne cesty),
- dostupnosťou zdrojov (existencia súboru),
- konzistenciou dát (či sa súbor nemení počas spracovania).

Zanedbanie týchto aspektov môže viesť k nepredvídateľnému správaniu skriptov, najmä pri ich nasadení v produkčnom prostredí.

## 2. Základné operácie so súbormi a adresármi

Základné operácie ako vytváranie, kopírovanie, presúvanie a mazanie súborov tvoria jadro väčšiny skriptov. Aj keď ide o jednoduché operácie, ich nesprávne použitie môže mať vážne dôsledky, napríklad stratu dát.

V Bash:

<div class="bash-code-example">
<pre><code>mkdir data
cp subor.txt data/
mv subor.txt data/
rm subor.txt
</code></pre>
</div>

V PowerShelli:

<div class="powershell-code-example">
<pre><code>New-Item -ItemType Directory -Name data
Copy-Item subor.txt data\
Move-Item subor.txt data\
Remove-Item subor.txt
</code></pre>
</div>

Pri návrhu skriptov je potrebné uvažovať nad:

- idempotenciou operácií (či opakované spustenie nespôsobí chybu),
- bezpečnosťou (ochrana pred neúmyselným zmazaním),
- konzistenciou dát (napr. kopírovanie počas zápisu),
- výkonom (práca s veľkými súbormi).

V praxi sa preto často implementujú kontrolné mechanizmy, napríklad overenie existencie cieľového súboru alebo vytváranie záloh pred operáciou.

## 3. Čítanie a zápis do súborov

Čítanie a zápis predstavujú kľúčové operácie pri spracovaní dát. Ich implementácia sa líši v závislosti od nástroja a veľkosti spracovávaných dát.

V Bash je čítanie často realizované postupne, riadok po riadku, čo umožňuje efektívne spracovanie aj veľkých súborov:

<div class="bash-code-example">
<pre><code>while read line; do
echo $line
done < subor.txt
</code></pre>
</div>

PowerShell umožňuje jednoduchšie načítanie, pričom pracuje s objektmi:

<div class="powershell-code-example">
<pre><code>Get-Content subor.txt
</code></pre>
</div>

Pri zápise:

<div class="bash-code-example">
<pre><code>echo "text" > subor.txt
</code></pre>
</div>

<div class="powershell-code-example">
<pre><code>"text" | Out-File subor.txt
</code></pre>
</div>

Dôležité aspekty:

- efektivita pri veľkých súboroch (streamovanie vs. načítanie do pamäte),
- správne kódovanie (UTF-8, ASCII),
- rozdiel medzi prepísaním a pripojením dát,
- ošetrenie chýb pri zápise (napr. nedostatok miesta).

Pri návrhu robustných skriptov je nevyhnutné zabezpečiť, aby operácie čítania a zápisu boli spoľahlivé a nepoškodzovali dáta.

## 4. Práca s adresárovou štruktúrou

Adresárová štruktúra umožňuje organizovať dáta do hierarchického systému, čo je kľúčové pri spracovaní väčšieho množstva súborov. Skripty často potrebujú prechádzať adresáre a aplikovať operácie na všetky súbory určitého typu.

V Bash:

<div class="bash-code-example">
<pre><code>for file in *.txt; do
echo $file
done
</code></pre>
</div>

Pokročilejšie:

<div class="bash-code-example">
<pre><code>find . -name "*.txt"
</code></pre>
</div>

V PowerShelli:

<div class="powershell-code-example">
<pre><code>Get-ChildItem -Recurse -Filter *.txt
</code></pre>
</div>

Pri návrhu je potrebné zohľadniť:

- hĺbku adresárovej štruktúry,
- počet súborov (výkon),
- filtrovanie relevantných dát,
- možnosť paralelného spracovania.

Nesprávne navrhnuté prehľadávanie môže výrazne zaťažiť systém, najmä pri práci s veľkými dátovými úložiskami.

## 5. Oprávnenia a prístup k súborom

Oprávnenia určujú, kto a akým spôsobom môže pristupovať k súborom. Tento aspekt je zásadný nielen z pohľadu bezpečnosti, ale aj funkčnosti skriptov.

V Bash:

<div class="bash-code-example">
<pre><code>chmod +x script.sh
</code></pre>
</div>

Nesprávne nastavené oprávnenia môžu zabrániť vykonaniu skriptu alebo prístupu k dátam. PowerShell používa komplexnejší model ACL, ktorý umožňuje detailnejšie riadenie prístupu.

Pri návrhu skriptov je potrebné:

- pracovať s minimálnymi potrebnými oprávneniami,
- overovať prístup k súborom pred operáciou,
- ošetriť situácie, keď prístup nie je povolený.

Bezpečnostný aspekt je obzvlášť dôležitý v produkčných systémoch, kde nesprávne nastavenie oprávnení môže viesť k úniku dát alebo narušeniu systému.

## 6. Správa procesov a systémových zdrojov

Skriptovanie umožňuje nielen manipuláciu so súbormi, ale aj interakciu so systémovými procesmi. Procesy predstavujú bežiace programy, ktoré možno monitorovať, riadiť alebo ukončovať.

V Bash:

<div class="bash-code-example">
<pre><code>ps aux
kill 1234
</code></pre>
</div>

V PowerShelli:

<div class="powershell-code-example">
<pre><code>Get-Process
Stop-Process -Id 1234
</code></pre>
</div>

Tieto operácie sú dôležité napríklad pri:

- diagnostike systému,
- automatizácii správy služieb,
- riešení problémov s výkonom.

Pri práci s procesmi je potrebné dbať na bezpečnosť a stabilitu systému, pretože nesprávne ukončenie procesu môže spôsobiť stratu dát alebo výpadok služby.

## 7. Automatizácia administrátorských úloh

Automatizácia predstavuje hlavný dôvod využívania skriptovania v praxi. Skripty umožňujú vykonávať opakujúce sa úlohy bez zásahu používateľa, čím sa zvyšuje efektivita a spoľahlivosť.

Typickým príkladom je zálohovanie dát:

<div class="bash-code-example">
<pre><code>cp -r /data /backup
</code></pre>
</div>

<div class="powershell-code-example">
<pre><code>Copy-Item -Recurse C:\data C:\backup
</code></pre>
</div>

Automatizácia umožňuje:

- eliminovať manuálne chyby,
- zabezpečiť konzistentné vykonávanie operácií,
- plánovať úlohy (napr. cron, task scheduler),
- škálovať riešenia.

Pri návrhu automatizácie je dôležité zohľadniť aj chybové scenáre, logovanie a možnosť opätovného spustenia úlohy bez negatívnych dôsledkov.
