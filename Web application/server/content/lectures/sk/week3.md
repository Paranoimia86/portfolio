# Prednáška 3: Pokročilá práca s príkazovým riadkom

## Cieľ prednášky

Cieľom prednášky je rozvinúť schopnosť efektívne pracovať v prostredí príkazového riadku a pochopiť princípy kombinovania príkazov do komplexných operácií. Dôraz sa kladie na schopnosť analyzovať problém a navrhnúť riešenie pomocou vhodnej kombinácie nástrojov, pričom študenti si osvoja aj princípy optimalizácie a efektívneho spracovania dát.

## 1. Kombinovanie príkazov (command chaining)

Kombinovanie príkazov predstavuje jeden zo základných mechanizmov, ktoré umožňujú vytvárať komplexné operácie bez potreby písania samostatného skriptu. V shelli je možné jednotlivé príkazy spájať tak, aby sa vykonávali sekvenčne alebo podmienene, pričom výsledok jedného príkazu ovplyvňuje vykonanie ďalšieho.
Základným operátorom je ;, ktorý zabezpečuje sekvenčné vykonanie príkazov bez ohľadu na ich úspech. Tento prístup je vhodný najmä v prípadoch, keď jednotlivé operácie nie sú na sebe závislé.

<div class="bash-code-example">
<pre><code>echo "Inicializácia"; echo "Spracovanie"; echo "Ukončenie"
</code></pre>
</div>

Významnejšie sú však operátory && a ||, ktoré umožňujú podmienené vykonávanie. Operátor && vykoná nasledujúci príkaz iba v prípade úspešného vykonania predchádzajúceho príkazu, čo je veľmi užitočné napríklad pri postupnom vykonávaní závislých operácií. Naopak, operátor || slúži na spracovanie chýb.

<div class="bash-code-example">
<pre><code>mkdir data && echo "Adresár vytvorený" || echo "Chyba pri vytváraní"
</code></pre>
</div>

Tento prístup umožňuje implementovať jednoduché riadiace mechanizmy priamo v príkazovom riadku, čím sa znižuje potreba písania rozsiahlych skriptov.

V PowerShelli sa podobná logika dosahuje kombináciou príkazov a podmienok, prípadne využitím novších operátorov, pričom dôraz sa kladie na čitateľnosť a explicitnosť:

<div class="powershell-code-example">
<pre><code>if (New-Item data -ItemType Directory -ErrorAction SilentlyContinue) {
Write-Output "Adresár vytvorený"
} else {
Write-Output "Chyba pri vytváraní"
}
</code></pre>
</div>

Pochopenie command chainingu je kľúčové pre návrh efektívnych riešení, pretože umožňuje minimalizovať počet riadkov kódu a zároveň zachovať logiku vykonávania.

## 2. Presmerovanie vstupu a výstupu

Presmerovanie vstupu a výstupu patrí medzi základné nástroje práce v shelli, ktoré umožňujú flexibilne manipulovať s dátami. Každý príkaz pracuje so štandardnými prúdmi – vstupom (stdin), výstupom (stdout) a chybovým výstupom (stderr).
Štandardne sú tieto prúdy viazané na terminál, avšak pomocou presmerovania ich možno prepojiť so súbormi alebo inými príkazmi. Presmerovanie výstupu do súboru je jednou z najčastejších operácií:

<div class="bash-code-example">
<pre><code>ls > subory.txt
</code></pre>
</div>

Použitie operátora > prepíše obsah súboru, zatiaľ čo >> zabezpečuje pripojenie dát na koniec existujúceho súboru. Tento rozdiel je dôležitý najmä pri práci s logmi alebo pri postupnom ukladaní výsledkov.
Okrem toho je možné presmerovať chybový výstup, čo je dôležité pri diagnostike problémov:

<div class="bash-code-example">
<pre><code>ls neexistuje.txt 2> chyba.txt
</code></pre>
</div>

V PowerShelli sa presmerovanie realizuje podobne, avšak vďaka objektovému modelu je možné pracovať s výstupom aj na vyššej úrovni abstrakcie:

<div class="powershell-code-example">
<pre><code>Get-ChildItem > subory.txt
</code></pre>
</div>

Presmerovanie zohráva dôležitú úlohu pri automatizácii, pretože umožňuje ukladať výsledky, analyzovať chyby a vytvárať komplexné dátové toky bez nutnosti manuálneho zásahu.

## 3. Pipeline a filtrovacie nástroje

Pipeline predstavuje jeden z najvýznamnejších konceptov shellu, ktorý umožňuje prepájať príkazy do jedného dátového toku. Tento mechanizmus podporuje filozofiu modulárnosti, kde každý nástroj vykonáva jednu konkrétnu úlohu a výsledok je následne spracovaný ďalším nástrojom.
V prostredí Bash pipeline prenáša textové dáta, čo znamená, že každý príkaz pracuje s reťazcami znakov. Tento prístup je veľmi flexibilný, avšak často vyžaduje dodatočné spracovanie dát.

<div class="bash-code-example">
<pre><code>cat log.txt | grep "ERROR" | sort
</code></pre>
</div>

V PowerShelli pipeline pracuje s objektmi, čo predstavuje zásadný rozdiel. Namiesto textu sa prenášajú štruktúrované dáta, ku ktorým je možné pristupovať pomocou vlastností a metód.

<div class="powershell-code-example">
<pre><code>Get-Content log.txt |
Where-Object { $_ -match "ERROR" } |
Sort-Object
</code></pre>
</div>

Tento prístup zvyšuje robustnosť riešení a znižuje pravdepodobnosť chýb spôsobených nesprávnym parsovaním textu. Pochopenie pipeline je nevyhnutné pre efektívnu prácu v shelli a tvorbu komplexných operácií.

## 4. Nástroje na spracovanie textu (grep, awk, sed)

Spracovanie textu je jednou z najčastejších úloh v shelli, najmä v prostredí Unix/Linux. Na tento účel existuje množstvo nástrojov, z ktorých najdôležitejšie sú grep, awk a sed.
Nástroj grep slúži na vyhľadávanie riadkov obsahujúcich určitý vzor. Je veľmi efektívny a často používaný pri analýze logov:

<div class="bash-code-example">
<pre><code>grep "ERROR" log.txt
</code></pre>
</div>

awk poskytuje pokročilejšie možnosti spracovania textu, najmä pri práci so stĺpcami a štruktúrovanými dátami. Umožňuje vykonávať operácie nad jednotlivými poliami:

<div class="bash-code-example">
<pre><code>awk '{print $1, $3}' log.txt
</code></pre>
</div>

sed je určený na úpravu textu, napríklad na nahrádzanie alebo odstraňovanie častí textu:

<div class="bash-code-example">
<pre><code>sed 's/error/ERROR/g' log.txt
</code></pre>
</div>

V PowerShelli sa podobná funkcionalita dosahuje pomocou cmdletov, ktoré pracujú s objektmi:

<div class="powershell-code-example">
<pre><code>Get-Content log.txt | Select-String "ERROR"
</code></pre>
</div>

Tieto nástroje umožňujú efektívne spracovanie veľkého množstva dát a tvoria základ pre analýzu a transformáciu textových výstupov.

## 5. Efektívna práca v CLI prostredí

Efektívna práca v príkazovom riadku nie je len o znalosti príkazov, ale aj o schopnosti pracovať rýchlo a systematicky. Dôležitú úlohu zohrávajú nástroje, ktoré zvyšujú produktivitu, ako napríklad história príkazov, automatické dopĺňanie alebo aliasy.
Používanie histórie umožňuje opätovné spúšťanie predchádzajúcich príkazov bez ich opätovného zadávania, čo výrazne šetrí čas. Automatické dopĺňanie zjednodušuje zadávanie dlhých názvov súborov alebo príkazov a znižuje pravdepodobnosť chýb.
Alias umožňuje vytvoriť skrátený názov pre často používaný príkaz:

<div class="bash-code-example">
<pre><code>alias ll='ls -l'
</code></pre>
</div>

V PowerShelli:

<div class="powershell-code-example">
<pre><code>Set-Alias ll Get-ChildItem
</code></pre>
</div>

Tieto mechanizmy umožňujú používateľovi sústrediť sa na riešenie problému namiesto samotného zadávania príkazov, čo vedie k vyššej efektivite práce.

## 6. Optimalizácia príkazov

Optimalizácia príkazov predstavuje dôležitý aspekt pokročilej práce v shelli. Nevhodne navrhnuté riešenia môžu viesť k zbytočnému zaťaženiu systému, neprehľadnosti alebo nižšej výkonnosti.
Jedným z častých problémov je nadbytočné použitie pipeline, ktoré možno nahradiť efektívnejším riešením. Napríklad:

<div class="bash-code-example">
<pre><code>cat log.txt | grep "ERROR"
</code></pre>
</div>

možno optimalizovať na:

<div class="bash-code-example">
<pre><code>grep "ERROR" log.txt
</code></pre>
</div>

Tým sa eliminuje potreba spúšťania ďalšieho procesu a znižuje sa záťaž systému.
Podobne v PowerShelli je vhodné minimalizovať počet operácií a pracovať priamo s dátami:

<div class="powershell-code-example">
<pre><code>Get-Content log.txt | Where-Object { $_ -match "ERROR" }
</code></pre>
</div>

Optimalizácia zahŕňa aj čitateľnosť kódu. Prehľadné a logicky štruktúrované príkazy sú nielen rýchlejšie na vykonanie, ale aj jednoduchšie na údržbu.
