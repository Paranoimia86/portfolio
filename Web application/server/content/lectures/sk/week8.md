# Prednáška 8: Spracovanie textu a dátových tokov

## Cieľ prednášky

Cieľom prednášky je poskytnúť študentom hlboké pochopenie spracovania textových dát v prostrediach Bash a PowerShell. Prednáška sa zameriava na efektívne filtrovanie, transformáciu a analýzu dát, pričom dôraz sa kladie na využitie regulárnych výrazov a kombinovanie nástrojov do komplexných riešení. Študenti sa naučia pracovať s reálnymi dátami, ktoré sú často neštruktúrované alebo len čiastočne štruktúrované.

## 1. Význam spracovania textu v skriptovaní

Spracovanie textu predstavuje jednu z najdôležitejších oblastí skriptovania, pretože väčšina dát, s ktorými skripty pracujú, má textovú podobu. Ide napríklad o systémové logy, konfiguračné súbory, výstupy príkazov alebo odpovede z API. Tieto dáta sú často neštruktúrované alebo len čiastočne štruktúrované, čo znamená, že ich spracovanie vyžaduje flexibilné nástroje a vhodne navrhnuté algoritmy.
V prostredí Bash je spracovanie textu prirodzenou súčasťou filozofie systému, kde jednotlivé nástroje pracujú s textovými prúdmi a sú navrhnuté tak, aby sa dali jednoducho kombinovať. PowerShell naopak využíva objektový model, no textové spracovanie zostáva nevyhnutné najmä pri práci s externými zdrojmi alebo pri spracovaní dát, ktoré nie sú reprezentované ako objekty.
Z pohľadu návrhu skriptov je dôležité chápať, že spracovanie textu nie je len o technickej implementácii, ale aj o správnom výbere stratégie. Je potrebné rozhodnúť, či sa dáta budú spracovávať riadok po riadku, či sa použije regulárny výraz alebo či je vhodnejšie previesť dáta do štruktúrovanej podoby. Nesprávne zvolený prístup môže viesť k neefektívnym riešeniam alebo k nesprávnym výsledkom.

## 2. Filtrovanie textu – grep a Select-String

Filtrovanie textu predstavuje základnú operáciu, ktorá umožňuje extrahovať relevantné informácie z veľkého množstva dát. Ide o proces, pri ktorom sa vyberajú iba tie riadky alebo časti textu, ktoré spĺňajú definované kritériá.

V Bash sa na tento účel používa nástroj grep, ktorý je optimalizovaný na rýchle vyhľadávanie vzorov v textových súboroch:

<div class="bash-code-example">
<pre><code>grep "ERROR" log.txt
</code></pre>
</div>

grep podporuje regulárne výrazy, čo umožňuje definovať komplexné vyhľadávacie vzory. Jeho výhodou je vysoký výkon aj pri veľkých súboroch, čo ho robí vhodným nástrojom pre analýzu logov.

V PowerShelli sa používa príkaz:

<div class="powershell-code-example">
<pre><code>Select-String "ERROR" log.txt
</code></pre>
</div>

Výstupom sú objekty, ktoré obsahujú nielen samotný text, ale aj kontextové informácie, ako napríklad číslo riadku. Tento prístup umožňuje presnejšiu manipuláciu s výsledkami.

Pri návrhu filtrovania je potrebné zohľadniť:

- presnosť vzoru (minimalizácia falošných zhôd),
- výkon (najmä pri veľkých dátach),
- kontext (či je potrebné zobraziť aj okolité riadky).

Filtrovanie je často prvým krokom v pipeline spracovania dát a výrazne ovplyvňuje kvalitu výsledku.

## 3. Transformácia textu – sed a základné úpravy

Transformácia textu zahŕňa operácie, ktoré menia obsah dát, napríklad nahrádzanie, odstraňovanie alebo formátovanie textu. Ide o dôležitý krok pri príprave dát pre ďalšie spracovanie.

V Bash sa používa nástroj sed, ktorý umožňuje vykonávať transformácie priamo nad textovým prúdom:

<div class="bash-code-example">
<pre><code>sed 's/error/ERROR/g' log.txt
</code></pre>
</div>

sed pracuje streamovo, čo znamená, že dokáže spracovávať veľké súbory bez ich načítania do pamäte. To je výhodné pri práci s veľkými dátami, no zároveň vyžaduje presné definovanie transformácií.

V PowerShelli sa transformácie realizujú napríklad pomocou operátora -replace:

<div class="powershell-code-example">
<pre><code>(Get-Content log.txt) -replace "error", "ERROR"
</code></pre>
</div>

Pri návrhu transformácií je potrebné zohľadniť:

- zachovanie významu dát,
- konzistentnosť formátu,
- možnosť opakovania operácie bez vedľajších efektov.

Nesprávne navrhnutá transformácia môže viesť k strate informácií alebo k nesprávnej interpretácii dát.

## 4. Spracovanie štruktúrovaného textu – awk a výber polí

Pri práci s textom, ktorý má určitú štruktúru (napr. CSV alebo logy so stĺpcami), je vhodné použiť nástroje, ktoré umožňujú prácu na úrovni jednotlivých polí.

V Bash sa používa awk, ktorý umožňuje spracovanie textu na základe pozície alebo obsahu polí:

<div class="bash-code-example">
<pre><code>awk '{print $1, $3}' log.txt
</code></pre>
</div>

awk je veľmi silný nástroj, ktorý umožňuje nielen výber polí, ale aj podmienené spracovanie a výpočty.

PowerShell pracuje s objektmi, čo znamená, že štruktúrované dáta možno spracovávať priamo bez potreby parsovania:

<div class="powershell-code-example">
<pre><code>Import-Csv data.csv | Select-Object Name, Age
</code></pre>
</div>

Rozdiel medzi týmito prístupmi má zásadný vplyv na návrh riešenia:

- Bash vyžaduje explicitné parsovanie a prácu s textom,
- PowerShell umožňuje pracovať priamo so štruktúrovanými dátami.

Výber správneho prístupu závisí od formátu dát a požiadaviek na spracovanie.

## 5. Regulárne výrazy – základný koncept

Regulárne výrazy predstavujú univerzálny nástroj na popis vzorov v texte. Umožňujú vyhľadávať, validovať a extrahovať dáta na základe definovaných pravidiel.
Základné prvky regulárnych výrazov zahŕňajú literály, metaznaky, kvantifikátory a triedy znakov. Kombináciou týchto prvkov možno vytvoriť veľmi flexibilné vzory.

<div class="bash-code-example">
<pre><code>grep "^ERROR" log.txt
</code></pre>
</div>

Tento výraz vyhľadá riadky začínajúce konkrétnym slovom.

V PowerShelli:

<div class="powershell-code-example">
<pre><code>Select-String "^ERROR" log.txt
</code></pre>
</div>

Pri návrhu regulárnych výrazov je dôležité:

- zabezpečiť presnosť (minimalizovať nežiaduce zhody),
- zachovať čitateľnosť,
- testovať výrazy na reálnych dátach.

Regulárne výrazy sú veľmi silné, no ich nesprávne použitie môže viesť k zložitým a ťažko udržiavateľným riešeniam.

## 6. Pokročilé použitie regulárnych výrazov

Pokročilé regulárne výrazy umožňujú pracovať so zložitejšími vzormi, ako sú napríklad identifikátory, e-mailové adresy alebo špecifické formáty dát.

<div class="bash-code-example">
<pre><code>grep "[0-9]\{3\}-[0-9]\{2\}" data.txt
</code></pre>
</div>

V PowerShelli:

<div class="powershell-code-example">
<pre><code>Select-String "\d{3}-\d{2}" data.txt
</code></pre>
</div>

Tieto výrazy umožňujú nielen vyhľadávanie, ale aj validáciu dát. V praxi sa používajú napríklad pri:

- kontrole vstupov,
- extrakcii údajov z logov,
- spracovaní neštruktúrovaných dát.

Pri návrhu pokročilých výrazov je dôležité dbať na ich čitateľnosť a testovanie, pretože zložité vzory môžu byť náchylné na chyby a ťažko pochopiteľné.

## 7. Kombinovanie nástrojov a pipeline

Jednou z najsilnejších vlastností shellu je možnosť kombinovať viacero nástrojov do jedného dátového toku pomocou pipeline. Tento prístup umožňuje vytvárať komplexné operácie z jednoduchých komponentov.

V Bash:

<div class="bash-code-example">
<pre><code>cat log.txt | grep "ERROR" | sort | uniq
</code></pre>
</div>

V PowerShelli:

<div class="powershell-code-example">
<pre><code>Get-Content log.txt |
Where-Object { $_ -match "ERROR" } |
Sort-Object |
Get-Unique
</code></pre>
</div>

Pipeline podporuje modulárny prístup, kde každý nástroj vykonáva jednu úlohu. Tento prístup vedie k prehľadným a flexibilným riešeniam.

Pri návrhu pipeline je potrebné zohľadniť:

- poradie operácií,
- výkon (minimalizácia zbytočných krokov),
- kompatibilitu medzi nástrojmi.

Správne navrhnutá pipeline umožňuje efektívne spracovanie aj veľkého množstva dát.
