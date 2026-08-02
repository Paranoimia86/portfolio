# Prednáška 9: Error handling a robustnosť skriptov

## Cieľ prednášky

Cieľom prednášky je poskytnúť študentom hlboké pochopenie problematiky chýb v skriptovaní a naučiť ich navrhovať robustné riešenia schopné reagovať na nepredvídateľné situácie. Prednáška sa zameriava na identifikáciu typov chýb, ich systematické ošetrenie a využitie nástrojov na ladenie. Dôraz sa kladie na spoľahlivosť, predvídateľnosť a kvalitu skriptov v reálnych podmienkach.

## 1. Typy chýb v skriptovaní

Pri návrhu skriptov je nevyhnutné pochopiť, že chyby vznikajú na rôznych úrovniach a majú odlišný charakter. Ich správna klasifikácia umožňuje zvoliť vhodnú stratégiu riešenia.

Syntaktické chyby sú spôsobené nesprávnym zápisom kódu a sú zvyčajne odhalené ešte pred samotným vykonaním skriptu. Ide napríklad o chýbajúce zátvorky, nesprávne použité príkazy alebo neplatnú syntax. Tieto chyby sú relatívne jednoduché na identifikáciu, pretože interpreter na ne upozorní okamžite.

Logické chyby sú výrazne zložitejšie, pretože skript sa vykoná bez zjavnej chyby, no výsledok je nesprávny. Typickým príkladom je nesprávne formulovaná podmienka alebo chybne navrhnutý algoritmus. Ich odhalenie si vyžaduje dôkladnú analýzu správania skriptu a často aj testovanie rôznych scenárov.

Runtime chyby vznikajú počas vykonávania skriptu, napríklad pri práci s neexistujúcim súborom, nedostatku oprávnení alebo zlyhaní externého príkazu. Tieto chyby sú najkritickejšie, pretože môžu viesť k prerušeniu skriptu alebo k nekonzistentnému stavu systému.

Z pohľadu návrhu je dôležité:

- identifikovať, ktoré chyby možno zachytiť vopred (napr. validáciou vstupov),
- rozlíšiť kritické a nekritické chyby,
- navrhnúť mechanizmus reakcie na chyby (napr. ukončenie, opakovanie operácie, logovanie),
- zabezpečiť, aby chyba neovplyvnila integritu dát alebo systému.

## 2. Návrh robustných skriptov

Robustný skript je taký, ktorý dokáže fungovať správne aj v neideálnych podmienkach. Nepracuje len so „správnymi" vstupmi, ale počíta aj s chybami a neočakávanými situáciami.

Pri návrhu robustného riešenia je potrebné zamerať sa na:

- validáciu vstupov, ktorá zahŕňa kontrolu existencie súborov, správnosti formátu dát alebo dostupnosti zdrojov,
- kontrolu výsledkov operácií, kde sa overuje úspešnosť vykonaných príkazov ešte pred pokračovaním,
- zachovanie konzistentného stavu, napríklad zabezpečenie, že čiastočne vykonaná operácia nezanechá systém v nekonzistentnom stave,
- implementáciu fallback mechanizmov, ktoré umožňujú použiť alternatívne riešenie v prípade zlyhania.

Príklad kontroly vstupu:

<div class="bash-code-example">
<pre><code>if [ ! -f "data.txt" ]; then
echo "Súbor neexistuje"
exit 1
fi
</code></pre>
</div>

Robustnosť skriptu priamo súvisí s jeho použiteľnosťou v reálnych podmienkach. Skript, ktorý funguje len pri ideálnych vstupoch, je v praxi nevyužiteľný.

## 3. Práca s návratovými kódmi

Návratové kódy predstavujú základný mechanizmus komunikácie medzi príkazmi a skriptom. Každý príkaz vracia hodnotu, ktorá signalizuje úspech alebo neúspech operácie.

V Bash:

<div class="bash-code-example">
<pre><code>ls subor.txt
echo $?
</code></pre>
</div>

V PowerShelli:

<div class="powershell-code-example">
<pre><code>Get-Item subor.txt
$LASTEXITCODE
</code></pre>
</div>

Správne využitie návratových kódov umožňuje:

- riadiť tok programu na základe výsledku operácie,
- zabrániť pokračovaniu skriptu po chybe,
- implementovať podmienené vykonávanie príkazov,
- zvýšiť spoľahlivosť riešenia.

Pri návrhu je dôležité:

- kontrolovať návratové kódy kritických operácií (napr. kopírovanie, zápis do súboru),
- definovať vlastné návratové kódy pre funkcie,
- zabezpečiť konzistentné správanie pri chybách.

Ignorovanie návratových kódov je jednou z najčastejších chýb v skriptovaní a vedie k ťažko odhaliteľným problémom.

## 4. Ošetrenie chýb – try/catch a podmienky

Ošetrenie chýb umožňuje skriptu reagovať na problémy bez okamžitého zlyhania. Ide o mechanizmus, ktorý zabezpečuje kontrolované spracovanie chýb.

V Bash sa tento prístup realizuje najmä pomocou podmienok:

<div class="bash-code-example">
<pre><code>if ! cp subor.txt backup/; then
echo "Chyba pri kopírovaní"
fi
</code></pre>
</div>

V PowerShelli:

<div class="powershell-code-example">
<pre><code>try {
Copy-Item subor.txt backup\
} catch {
Write-Output "Chyba pri kopírovaní"
}
</code></pre>
</div>

Ošetrenie chýb umožňuje:

- zachytiť chybu a zabrániť pádu skriptu,
- informovať používateľa o probléme,
- vykonať náhradnú operáciu alebo rollback,
- zaznamenať chybu do logu.

Pri návrhu je dôležité:

- rozlišovať medzi chybami, ktoré možno ignorovať, a kritickými chybami,
- zabezpečiť, aby ošetrenie chýb nezakrývalo problémy (t.j. chyby neboli „ticho ignorované"),
- udržiavať čitateľnosť kódu aj pri implementácii error handlingu.

## 5. Ladenie skriptov (debugging)

Ladenie predstavuje systematický proces identifikácie a odstraňovania chýb. Ide o nevyhnutnú súčasť vývoja, najmä pri komplexných skriptoch.

V Bash:

<div class="bash-code-example">
<pre><code>set -x
</code></pre>
</div>

V PowerShelli:

<div class="powershell-code-example">
<pre><code>Set-PSDebug -Trace 1
</code></pre>
</div>

Efektívne ladenie zahŕňa:

- sledovanie vykonávania jednotlivých príkazov,
- analýzu medzivýsledkov,
- postupné testovanie častí skriptu,
- izoláciu problémových častí.

Dôležité je tiež:

- používať systematický prístup (nie náhodné úpravy),
- reprodukovať chybu v kontrolovanom prostredí,
- dokumentovať zistenia.

Bez efektívneho ladenia je vývoj väčších skriptov prakticky nemožný.

## 6. Logovanie a sledovanie priebehu skriptu

Logovanie predstavuje kľúčový nástroj na sledovanie správania skriptu počas jeho vykonávania. Umožňuje zaznamenať dôležité udalosti a spätne analyzovať priebeh spracovania.

<div class="bash-code-example">
<pre><code>echo "Začiatok spracovania" >> log.txt
</code></pre>
</div>

<div class="powershell-code-example">
<pre><code>"Začiatok spracovania" | Out-File log.txt -Append
</code></pre>
</div>

Efektívne logovanie zahŕňa:

- zaznamenávanie kľúčových udalostí (štart, koniec, chyby),
- pridávanie časových značiek,
- rozlišovanie úrovní logov (info, warning, error),
- minimalizáciu zbytočných informácií.

Logovanie je nevyhnutné najmä pri:

- automatizovaných úlohách bez dohľadu,
- dlhodobých procesoch,
- produkčných systémoch.

## 7. Testovanie skriptov

Testovanie predstavuje proces overovania správnosti skriptu v rôznych scenároch. Jeho cieľom je odhaliť chyby ešte pred nasadením do produkcie.

Efektívne testovanie zahŕňa:

- testovanie rôznych vstupov vrátane hraničných prípadov,
- simuláciu chybových scenárov (napr. neexistujúci súbor),
- overenie správnosti výstupov,
- opakované testovanie po úpravách kódu.

Testovanie umožňuje:

- zvýšiť spoľahlivosť skriptu,
- odhaliť logické chyby,
- zabezpečiť konzistentné správanie.

Pri návrhu skriptov je vhodné uvažovať o testovaní už od začiatku, nie až po dokončení implementácie.
