# Prednáška 5: Riadiace štruktúry a tok programu

## Cieľ prednášky

Cieľom prednášky je poskytnúť študentom detailné pochopenie riadenia toku programu v skriptovacích jazykoch Bash a PowerShell. Prednáška sa zameriava na princípy návrhu algoritmov, implementáciu rozhodovacích mechanizmov a efektívne využitie cyklov. Dôraz sa kladie na schopnosť navrhovať riešenia, ktoré sú nielen funkčné, ale aj čitateľné, udržiavateľné a odolné voči chybám.

## 1. Riadenie toku programu – základný koncept

Riadenie toku programu určuje, v akom poradí sa vykonávajú jednotlivé inštrukcie. V najjednoduchšom prípade ide o sekvenčné vykonávanie, kde sa príkazy spracúvajú lineárne. Takýto model je však vhodný len pre triviálne úlohy, pretože neumožňuje reagovať na meniace sa podmienky ani spracovávať dynamické vstupy.

V reálnych skriptoch je potrebné:

- reagovať na stav systému (napr. existenciu súboru),
- vykonávať operácie nad viacerými prvkami,
- spracovať chyby alebo výnimky,
- meniť správanie programu na základe vstupov.

Riadiace štruktúry umožňujú prechod od lineárneho k riadenému a adaptívnemu vykonávaniu, kde tok programu závisí od dát a podmienok. Z pohľadu algoritmizácie ide o zavedenie rozhodovacích bodov a iterácií.

Nesprávne navrhnutý tok programu môže viesť k:

- neefektívnemu vykonávaniu (zbytočné operácie),
- nekonečným cyklom,
- nesprávnemu spracovaniu dát,
- ťažkej údržbe kódu.

Preto je dôležité už pri návrhu skriptu premýšľať nad tým, ako bude program reagovať na rôzne scenáre.

## 2. Podmienky – if, else, elif

Podmienky predstavujú základný nástroj pre implementáciu rozhodovania. Umožňujú vykonávať rôzne časti kódu v závislosti od aktuálneho stavu programu alebo systému.

V skriptovaní sa podmienky často používajú na:

- kontrolu existencie súborov alebo adresárov,
- vyhodnocovanie návratových hodnôt príkazov,
- validáciu vstupov,
- vetvenie logiky podľa parametrov.

V Bash je potrebné venovať pozornosť syntaxi a práci s testovacími výrazmi:

<div class="bash-code-example">
<pre><code>if [ -f "data.txt" ]; then
echo "Súbor existuje"
else
echo "Súbor neexistuje"
fi
</code></pre>
</div>

PowerShell ponúka čitateľnejší a konzistentnejší zápis:

<div class="powershell-code-example">
<pre><code>if (Test-Path "data.txt") {
Write-Output "Súbor existuje"
} else {
Write-Output "Súbor neexistuje"
}
</code></pre>
</div>

Rozšírené vetvenie umožňuje spracovať viacero scenárov:

<div class="bash-code-example">
<pre><code>if [ $value -gt 100 ]; then
echo "Veľká hodnota"
elif [ $value -gt 50 ]; then
echo "Stredná hodnota"
else
echo "Malá hodnota"
fi
</code></pre>
</div>

Pri návrhu podmienok je dôležité:

- pokryť všetky možné prípady,
- vyhnúť sa duplicitným podmienkam,
- zabezpečiť čitateľnosť.

Typickou chybou je príliš zložitá vnorená logika, ktorá znižuje prehľadnosť a zvyšuje pravdepodobnosť chýb.

## 3. Porovnávacie a logické operátory

Porovnávacie operátory umožňujú vyjadriť vzťahy medzi hodnotami, zatiaľ čo logické operátory umožňujú kombinovať viacero podmienok do jedného výrazu.

V Bash je potrebné rozlišovať medzi operátormi pre rôzne typy dát:

<div class="bash-code-example">
<pre><code>if [ "$a" -gt 10 ] && [ "$b" -lt 5 ]; then
echo "Podmienka splnená"
fi
</code></pre>
</div>

PowerShell používa jednotný a konzistentný model:

<div class="powershell-code-example">
<pre><code>if ($a -gt 10 -and $b -lt 5) {
Write-Output "Podmienka splnená"
}
</code></pre>
</div>

Tieto operátory umožňujú:

- definovať komplexné rozhodovacie pravidlá,
- validovať viacero podmienok naraz,
- optimalizovať logiku programu.

Dôležitým aspektom je aj tzv. short-circuit evaluation, kde sa druhá časť výrazu nevyhodnocuje, ak už výsledok možno určiť z prvej časti. Tento mechanizmus môže zlepšiť výkon, ale aj spôsobiť chyby, ak sa s ním nepočíta.

## 4. Cykly – opakovanie operácií

Cykly predstavujú základný nástroj pre spracovanie opakujúcich sa úloh. Umožňujú aplikovať rovnakú operáciu na viacero prvkov bez potreby manuálneho opakovania kódu.

Najčastejším použitím je iterácia nad kolekciami:

<div class="bash-code-example">
<pre><code>for file in *.txt; do
echo $file
done
</code></pre>
</div>

<div class="powershell-code-example">
<pre><code>foreach ($file in Get-ChildItem *.txt) {
Write-Output $file.Name
}
</code></pre>
</div>

Cykly sú kľúčové pri:

- spracovaní súborov,
- iterácii nad výstupmi príkazov,
- dávkovom spracovaní dát.

Pri ich návrhu je potrebné dbať na:

- efektivitu (minimalizovať počet operácií),
- správne ukončenie,
- čitateľnosť.

Nevhodné použitie cyklov môže viesť k výraznému zníženiu výkonu, najmä pri práci s veľkými dátami.

## 5. While cyklus a podmienené opakovanie

While cyklus umožňuje opakovanie operácií na základe podmienky, ktorá sa vyhodnocuje pred každou iteráciou. Tento typ cyklu je vhodný v situáciách, kde počet iterácií nie je dopredu známy.

<div class="bash-code-example">
<pre><code>count=0
while [ $count -lt 5 ]; do
echo $count
((count++))
done
</code></pre>
</div>

<div class="powershell-code-example">
<pre><code>$count = 0
while ($count -lt 5) {
Write-Output $count
$count++
}
</code></pre>
</div>

Typické použitie:

- čítanie vstupu (napr. riadok po riadku),
- čakanie na splnenie podmienky,
- implementácia kontrolných slučiek.

Najväčším rizikom je vznik nekonečného cyklu, ktorý môže zaťažiť systém. Preto je nevyhnutné zabezpečiť, aby sa podmienka v priebehu vykonávania menila.

## 6. Vetvenie pomocou case / switch

Pri spracovaní viacerých možných hodnôt je použitie viacerých podmienok neprehľadné a neefektívne. Konštrukcie case a switch umožňujú elegantnejšie riešenie.

<div class="bash-code-example">
<pre><code>case $option in
start) echo "Spúšťam";;
stop) echo "Zastavujem";;
*) echo "Neznáma voľba";;
esac
</code></pre>
</div>

<div class="powershell-code-example">
<pre><code>switch ($option) {
"start" { "Spúšťam" }
"stop" { "Zastavujem" }
default { "Neznáma voľba" }
}
</code></pre>
</div>

Tieto konštrukcie:

- zvyšujú čitateľnosť,
- znižujú redundanciu,
- umožňujú lepšiu organizáciu logiky.

Sú ideálne napríklad pri spracovaní argumentov skriptu alebo stavov systému.

## 7. Riadenie toku pomocou break a continue

Príkazy break a continue umožňujú jemné riadenie priebehu cyklov.

- break okamžite ukončí cyklus,
- continue preskočí aktuálnu iteráciu.

<div class="bash-code-example">
<pre><code>for i in {1..5}; do
if [ $i -eq 3 ]; then
continue
fi
echo $i
done
</code></pre>
</div>

<div class="powershell-code-example">
<pre><code>foreach ($i in 1..5) {
if ($i -eq 3) {
continue
}
Write-Output $i
}
</code></pre>
</div>

Tieto mechanizmy sú dôležité pri:

- filtrovaní dát,
- optimalizácii spracovania,
- riadení algoritmov.

Ich nadmerné alebo nesprávne použitie však môže viesť k neprehľadnému kódu, preto je dôležité používať ich premyslene.
