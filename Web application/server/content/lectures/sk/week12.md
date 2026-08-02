# Prednáška 12: Bezpečnosť a best practices v skriptovaní

## Cieľ prednášky

Cieľom prednášky je poskytnúť študentom komplexné pochopenie princípov bezpečnosti a osvedčených postupov pri tvorbe skriptov v prostrediach Bash a PowerShell. Prednáška syntetizuje poznatky z predchádzajúcich týždňov a zameriava sa na návrh riešení, ktoré sú nielen funkčné, ale aj bezpečné, spoľahlivé a dlhodobo udržateľné v reálnom prostredí.

## 1. Význam bezpečnosti v skriptovaní

Bezpečnosť v skriptovaní predstavuje zásadný aspekt, ktorý ovplyvňuje nielen samotné fungovanie skriptu, ale aj stabilitu a integritu celého systému. Skripty často pracujú s operačným systémom na nízkej úrovni, manipulujú so súbormi, spúšťajú procesy alebo komunikujú s externými službami. Z tohto dôvodu môže aj relatívne jednoduchý skript predstavovať významné bezpečnostné riziko.
Riziká spojené so skriptovaním môžu zahŕňať neoprávnený prístup k dátam, neúmyselné vykonanie nebezpečných operácií alebo vystavenie systému útokom. Napríklad nesprávne ošetrený vstup môže umožniť vykonanie škodlivého príkazu, zatiaľ čo nesprávne nastavené oprávnenia môžu sprístupniť citlivé údaje.
Z návrhového hľadiska je nevyhnutné uvažovať o bezpečnosti už od začiatku vývoja. Bezpečnosť by nemala byť dodatočným prvkom, ale integrálnou súčasťou návrhu. To znamená identifikovať potenciálne riziká, minimalizovať ich a implementovať mechanizmy, ktoré zabránia ich zneužitiu.

## 2. Práca s citlivými údajmi

Skripty veľmi často pracujú s citlivými údajmi, ako sú prihlasovacie údaje, API kľúče alebo autentifikačné tokeny. Tieto údaje predstavujú kritický bezpečnostný prvok, pretože ich únik môže viesť k neoprávnenému prístupu k systémom alebo službám.
Jednou z najčastejších chýb je ukladanie citlivých údajov priamo do zdrojového kódu. Takýto prístup je nevhodný najmä v prípade, keď je skript zdieľaný, verzionovaný alebo uložený v repozitári. Útočník, ktorý získa prístup k skriptu, môže tieto údaje zneužiť.
Bezpečnejším riešením je oddelenie konfigurácie od logiky skriptu. Citlivé údaje by mali byť uložené v environment variables alebo v externých konfiguračných súboroch s obmedzeným prístupom. Tento prístup zvyšuje flexibilitu a zároveň znižuje riziko kompromitácie.
Zároveň je dôležité zabezpečiť ochranu týchto údajov počas ich prenosu aj uloženia. Používanie šifrovaných protokolov a obmedzenie prístupových práv predstavujú základné opatrenia, ktoré by mali byť súčasťou každého návrhu.

## 3. Validácia vstupov a ochrana pred chybami

Validácia vstupov predstavuje jeden z najdôležitejších mechanizmov na zabezpečenie správneho a bezpečného fungovania skriptu. Skript by nikdy nemal predpokladať, že vstupné údaje sú správne alebo bezpečné.
Nevalidovaný vstup môže viesť k viacerým problémom, vrátane nesprávneho spracovania dát, zlyhania skriptu alebo bezpečnostných zraniteľností. V extrémnych prípadoch môže umožniť tzv. injection útoky, pri ktorých sa do skriptu vloží škodlivý kód.

Príklad základnej validácie:

<div class="bash-code-example">
<pre><code>if [ -z "$1" ]; then
    echo "Chýba parameter"
    exit 1
fi
</code></pre>
</div>

Pri návrhu validácie je potrebné:

- overovať prítomnosť vstupov,
- kontrolovať ich formát a rozsah,
- obmedziť povolené znaky alebo hodnoty,
- ošetrovať hraničné prípady.

Validácia by mala byť implementovaná čo najskôr po prijatí vstupu, aby sa minimalizovalo riziko jeho nesprávneho spracovania v ďalších častiach skriptu.

## 4. Princíp minimálnych oprávnení

Princíp minimálnych oprávnení patrí medzi základné bezpečnostné princípy v softvérovom inžinierstve. Znamená, že skript by mal mať len také oprávnenia, ktoré sú nevyhnutné na vykonanie jeho úlohy.
Spúšťanie skriptov s nadmernými oprávneniami, napríklad ako administrátor alebo root, zvyšuje riziko, že skript vykoná operácie, ktoré môžu poškodiť systém alebo sprístupniť citlivé údaje. V prípade chyby alebo útoku môže mať takýto skript oveľa väčší dopad.
Pri návrhu je preto potrebné analyzovať, aké oprávnenia sú skutočne potrebné, a tieto oprávnenia obmedziť na minimum. Tento prístup znižuje potenciálne škody a zvyšuje bezpečnosť systému.

## 5. Best practices pri písaní skriptov

Osvedčené postupy predstavujú súbor pravidiel, ktoré vedú k tvorbe kvalitného, prehľadného a udržiavateľného kódu. Ich dodržiavanie má zásadný vplyv na kvalitu výsledného riešenia.
Medzi kľúčové princípy patrí používanie zrozumiteľných názvov premenných a funkcií, ktoré odrážajú ich účel. Rovnako dôležité je rozdelenie kódu do menších častí, čo zvyšuje jeho prehľadnosť a umožňuje jednoduchšie testovanie.
Ďalším dôležitým aspektom je dokumentovanie kódu, ktoré pomáha pochopiť jeho logiku a uľahčuje jeho údržbu. Oddelenie logiky od vstupu a výstupu zvyšuje flexibilitu a umožňuje jednoduchšie rozšírenie skriptu.
Dodržiavanie týchto princípov vedie k tvorbe profesionálneho kódu, ktorý je vhodný aj pre tímovú spoluprácu.

## 6. Udržiavateľnosť a čitateľnosť kódu

Udržiavateľnosť predstavuje schopnosť skriptu byť jednoducho upravovaný a rozširovaný v čase. Čitateľnosť kódu je jedným z hlavných faktorov, ktoré ovplyvňujú jeho udržiavateľnosť.
Kód, ktorý je neprehľadný alebo zle štruktúrovaný, je náchylný na chyby a jeho úprava je časovo náročná. Preto je dôležité dodržiavať konzistentný štýl písania, používať vhodné odsadenie a logicky organizovať jednotlivé časti skriptu.

Z návrhového hľadiska je vhodné:

- používať komentáre na vysvetlenie komplexných častí,
- vyhýbať sa zbytočne zložitým konštrukciám,
- udržiavať konzistentnú štruktúru skriptu,
- pravidelne refaktorovať kód.

Udržiavateľný kód umožňuje jednoduchšie opravy, rozšírenia a dlhodobé používanie skriptu.

## 7. Nasadenie skriptov do praxe

Nasadenie skriptu predstavuje jeho použitie v reálnom prostredí, kde musí fungovať spoľahlivo a bezpečne. Tento krok zahŕňa nielen samotné spustenie skriptu, ale aj jeho integráciu do existujúceho systému.
Pri nasadení je potrebné zohľadniť prostredie, v ktorom bude skript bežať, dostupnosť zdrojov a spôsob jeho spúšťania. Dôležitú úlohu zohráva aj plánovanie úloh, monitoring a logovanie, ktoré umožňujú sledovať priebeh vykonávania a identifikovať problémy.
Skript by mal byť pripravený na dlhodobé používanie a mal by obsahovať mechanizmy na riešenie chýb, zabezpečenie dát a sledovanie jeho správania. Len tak možno zabezpečiť jeho spoľahlivé fungovanie v praxi.
