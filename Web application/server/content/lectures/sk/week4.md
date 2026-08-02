# Prednáška 4: Premenné, dátové štruktúry a typový systém

## 1. Premenné a ich význam v skriptovaní

Premenné predstavujú základný nástroj pre uchovávanie a manipuláciu s dátami v skriptoch. Ich význam však presahuje jednoduché „uloženie hodnoty". V skriptovaní slúžia ako prostriedok na dynamické riadenie správania programu, umožňujú reagovať na vstupy, uchovávať medzivýsledky a prenášať informácie medzi jednotlivými časťami skriptu.
V praktických scenároch sa premenné využívajú napríklad na:

- uchovanie výsledku systémového príkazu,
- spracovanie vstupu od používateľa,
- konfiguráciu skriptu (napr. cesty, názvy súborov),
- riadenie toku programu na základe aktuálneho stavu.

V Bash sú premenné implicitne typované a interpretované ako reťazce, čo znamená, že ich obsah je vždy spracovávaný ako text bez ohľadu na jeho skutočný význam.

<div class="bash-code-example">
<pre><code>meno="Ján"
echo "Používateľ: $meno"
</code></pre>
</div>

V PowerShelli sú premenné reprezentované ako objekty, čo umožňuje uchovávať rôzne typy dát a pracovať s nimi na vyššej úrovni abstrakcie:

<div class="powershell-code-example">
<pre><code>$meno = "Ján"
Write-Output "Používateľ: $meno"
</code></pre>
</div>

Dôležitým aspektom je aj životnosť premenných a ich rozsah (scope), ktorý ovplyvňuje, kde je premenná dostupná a ako sa správa pri volaní funkcií alebo skriptov.

## 2. Dynamické vs. silné typovanie

Typový systém určuje, akým spôsobom sú dáta reprezentované a spracovávané v programe. Bash využíva veľmi jednoduchý model dynamického typovania, kde neexistuje explicitná kontrola typov a všetky hodnoty sú v podstate reťazce. Tento prístup poskytuje vysokú flexibilitu, no zároveň zvyšuje riziko chýb, najmä pri zložitejších operáciách.

Pri práci s číslami je potrebné použiť špeciálne konštrukcie:

<div class="bash-code-example">
<pre><code>a=10
b=5
echo $((a + b))
</code></pre>
</div>

PowerShell využíva silnejší typový systém založený na platforme .NET, kde sú premenné objektmi s konkrétnym typom. To znamená, že operácie nad dátami sú presnejšie a predvídateľnejšie.

<div class="powershell-code-example">
<pre><code>[int]$a = 10
[int]$b = 5
$a + $b
</code></pre>
</div>

Tento rozdiel má zásadné dôsledky:

- Bash je vhodný pre jednoduché operácie a manipuláciu s textom,
- PowerShell je vhodnejší pre komplexné spracovanie dát a systémové operácie.
  Pochopenie typového systému umožňuje predchádzať chybám a navrhovať robustnejšie riešenia.

## 3. Polia a kolekcie dát

Pri spracovaní väčšieho množstva dát je nevyhnutné pracovať s kolekciami, ktoré umožňujú uchovávať viacero hodnôt v jednej premennej. Najjednoduchšou formou takejto kolekcie je pole.

V Bash sú polia implementované ako indexované zoznamy:

<div class="bash-code-example">
<pre><code>pole=("a" "b" "c")
echo ${pole[1]}
</code></pre>
</div>

Aj keď Bash umožňuje základnú manipuláciu s poľami, jeho možnosti sú obmedzené najmä pri práci s komplexnejšími dátami.

PowerShell poskytuje výrazne pokročilejší model kolekcií, ktorý zahŕňa nielen polia, ale aj kolekcie objektov:

<div class="powershell-code-example">
<pre><code>$pole = @("a", "b", "c")
$pole[1]
</code></pre>
</div>

Dôležitým rozdielom je, že PowerShell dokáže pracovať s kolekciami objektov, čo znamená, že každý prvok môže obsahovať viacero vlastností. Tento prístup je veľmi užitočný napríklad pri spracovaní výstupov systémových príkazov.

Kolekcie sú základom pre:

- iteráciu (cykly),
- filtrovanie dát,
- transformáciu výstupov.

## 4. Asociatívne polia a hashtable

Pri práci s komplexnejšími dátami často nestačí indexované pole. Je potrebné pracovať s dátami vo forme dvojíc kľúč–hodnota, čo umožňuje rýchle vyhľadávanie a lepšiu organizáciu údajov.

V Bash sú asociatívne polia dostupné v novších verziách:

<div class="bash-code-example">
<pre><code>declare -A user
user[name]="Ján"
user[vek]=25
echo ${user[name]}
</code></pre>
</div>

PowerShell poskytuje natívnu podporu pre hashtable:

<div class="powershell-code-example">
<pre><code>$user = @{
name = "Ján"
vek = 25
}
$user["vek"]
</code></pre>
</div>

Tieto štruktúry sú veľmi dôležité napríklad pri:

- spracovaní konfigurácií,
- práci s dátami z API,
- organizácii komplexných údajov v skriptoch.
  Používanie kľúč–hodnota štruktúr umožňuje vytvárať prehľadnejšie a flexibilnejšie riešenia.

## 5. Práca s objektmi v PowerShell

PowerShell je postavený na objektovo orientovanom modeli, čo znamená, že výstupy príkazov nie sú text, ale objekty. Tento prístup predstavuje zásadný rozdiel oproti Bashu a výrazne ovplyvňuje spôsob práce so skriptami.

Každý objekt obsahuje:

- vlastnosti (properties),
- metódy (methods).

<div class="powershell-code-example">
<pre><code>Get-Process
</code></pre>
</div>

Tento príkaz vracia kolekciu objektov reprezentujúcich procesy. S týmito objektmi je možné ďalej pracovať:

<div class="powershell-code-example">
<pre><code>Get-Process | Select-Object ProcessName, CPU
</code></pre>
</div>

Výhodou objektového prístupu je:

- presná manipulácia s dátami,
- eliminácia potreby parsovania textu,
- vyššia robustnosť skriptov.
  Tento model je obzvlášť dôležitý pri práci so systémovými zdrojmi a komplexnými dátami.

## 6. Environment variables a ich využitie

Premenné prostredia predstavujú mechanizmus na definovanie globálnych hodnôt, ktoré sú dostupné naprieč procesmi. Sú dôležité najmä pri konfigurácii systému a aplikácií.

Tieto premenné sú dedené medzi procesmi, čo znamená, že skript môže ovplyvniť správanie iných programov.

<div class="bash-code-example">
<pre><code>echo $HOME
</code></pre>
</div>

<div class="powershell-code-example">
<pre><code>$env:USERPROFILE
</code></pre>
</div>

Environment variables sa využívajú napríklad na:

- definovanie systémových ciest,
- konfiguráciu aplikácií,
- prenos informácií medzi procesmi.
  Ich správne používanie umožňuje vytvárať flexibilné a prenositeľné skripty, ktoré nie sú pevne viazané na konkrétne prostredie.

## 7. Serializácia dát (JSON, XML)

V moderných IT systémoch je časté spracovanie dát vo formátoch ako JSON alebo XML. Skriptovacie nástroje umožňujú tieto dáta načítať, spracovať a generovať, čo je nevyhnutné najmä pri práci s webovými službami a API.

PowerShell poskytuje natívnu podporu pre prácu s JSON:

<div class="powershell-code-example">
<pre><code>$data = '{"meno":"Ján","vek":25}' | ConvertFrom-Json
$data.meno
</code></pre>
</div>

V Bash je potrebné použiť externé nástroje, napríklad jq:

<div class="bash-code-example">
<pre><code>echo '{"meno":"Ján"}' | jq '.meno'
</code></pre>
</div>

Serializácia dát umožňuje:

- výmenu dát medzi systémami,
- integráciu s API,
- ukladanie štruktúrovaných informácií.
  Pochopenie týchto formátov je kľúčové pre moderné skriptovanie, ktoré často presahuje hranice lokálneho systému.
