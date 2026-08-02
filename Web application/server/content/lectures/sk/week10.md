# Prednáška 10: Automatizácia a plánovanie úloh

## Cieľ prednášky

Cieľom prednášky je oboznámiť študentov s princípmi automatizácie a plánovania úloh v prostrediach Bash a PowerShell. Dôraz sa kladie na prechod od manuálneho spúšťania skriptov k ich pravidelnému a autonómnemu vykonávaniu. Študenti sa naučia navrhovať riešenia, ktoré fungujú bez zásahu používateľa, sú spoľahlivé v čase a dokážu reagovať na chyby alebo zmeny v prostredí.

## 1. Význam automatizácie v IT praxi

Automatizácia predstavuje jeden zo základných pilierov moderného IT prostredia. Umožňuje nahradiť manuálne a opakujúce sa činnosti skriptmi, čím sa výrazne zvyšuje efektivita práce a zároveň sa minimalizuje riziko ľudských chýb. V praxi sa automatizácia využíva napríklad pri správe serverov, zálohovaní dát, spracovaní logov alebo monitorovaní systémov.
Z návrhového hľadiska je dôležité uvedomiť si, že automatizovaný proces musí byť spoľahlivejší než manuálne vykonávaná operácia. Skript musí počítať s rôznymi scenármi, vrátane chýb alebo neštandardných vstupov, a zabezpečiť konzistentné výsledky pri opakovanom vykonávaní. Automatizácia preto nie je len o samotnom skripte, ale o návrhu celého procesu, ktorý funguje dlhodobo a bez dozoru.

## 2. Plánovanie úloh – koncept a princípy

Plánovanie úloh predstavuje mechanizmus, ktorý umožňuje vykonávať skripty v presne definovanom čase alebo intervale. Tento prístup umožňuje prechod od jednorazového spúšťania skriptov k systematickej automatizácii.
Pri návrhu plánovaných úloh je potrebné definovať časové parametre vykonávania a zároveň zabezpečiť, aby skript fungoval opakovane bez vedľajších efektov. Dôležitým aspektom je aj nezávislosť od používateľa, keďže skript sa spúšťa bez manuálneho zásahu. Zároveň je potrebné zabezpečiť zaznamenávanie výstupov a chýb, aby bolo možné spätne analyzovať priebeh vykonávania.
Špecifickým problémom plánovaných úloh je prostredie, v ktorom sa skript vykonáva. To sa môže líšiť od prostredia pri manuálnom spustení, napríklad v dostupnosti premenných alebo oprávnení, čo je potrebné zohľadniť pri návrhu riešenia.

## 3. Cron v Bash – plánovanie úloh v Linuxe

V prostredí Linux a Unix sa na plánovanie úloh používa nástroj cron, ktorý umožňuje definovať časové rozvrhy pomocou tzv. cron tabuľky. Používateľ môže pomocou príkazu crontab -e definovať úlohy, ktoré sa majú vykonávať v pravidelných intervaloch.

Príklad zápisu:

<div class="bash-code-example">
<pre><code>0 2 * * * /home/user/script.sh
</code></pre>
</div>

Tento zápis zabezpečí spustenie skriptu každý deň o druhej hodine ráno. Cron využíva špecifickú syntax založenú na časových poliach, čo umožňuje veľmi flexibilné plánovanie, no zároveň vyžaduje presné pochopenie formátu.
Pri návrhu cron úloh je nevyhnutné používať absolútne cesty, keďže cron nepracuje s aktuálnym pracovným adresárom. Zároveň je vhodné zabezpečiť logovanie výstupu a chýb, aby bolo možné identifikovať problémy. Dôležité je tiež testovať skript v rovnakých podmienkach, v akých bude spúšťaný, aby sa predišlo nečakaným zlyhaniam.

## 4. Task Scheduler v PowerShell (Windows)

V prostredí Windows sa na plánovanie úloh používa nástroj Task Scheduler, ktorý umožňuje definovať rôzne typy spúšťacích podmienok. Okrem grafického rozhrania je možné plánovanie úloh realizovať aj programovo pomocou PowerShellu.

<div class="powershell-code-example">
<pre><code>$action = New-ScheduledTaskAction -Execute "script.ps1"
$trigger = New-ScheduledTaskTrigger -Daily -At 2am
Register-ScheduledTask -Action $action -Trigger $trigger -TaskName "MyTask"
</code></pre>
</div>

Task Scheduler umožňuje spúšťanie úloh nielen na základe času, ale aj na základe systémových udalostí, ako je napríklad štart systému alebo prihlásenie používateľa. Tento prístup poskytuje väčšiu flexibilitu pri návrhu automatizovaných riešení.
Pri implementácii je dôležité správne nastaviť oprávnenia a zabezpečiť, aby skript mal prístup k potrebným zdrojom. Zároveň je vhodné definovať správanie úlohy v prípade chyby, napríklad jej opätovné spustenie.

## 5. Návrh spoľahlivých automatizovaných skriptov

Automatizovaný skript musí byť navrhnutý tak, aby fungoval bez dozoru a zvládal aj neštandardné situácie. Dôležitým konceptom je idempotencia, teda schopnosť vykonať operáciu opakovane bez negatívnych dôsledkov.
Pri návrhu je potrebné zabezpečiť ošetrenie chýb, validáciu vstupov a logovanie priebehu vykonávania. Skript by mal byť schopný detegovať problém, reagovať naň a zároveň zachovať konzistentný stav systému. Bez týchto mechanizmov môže automatizácia viesť k opakovaným chybám, ktoré sa kumulujú v čase.
Spoľahlivosť skriptu je kľúčová najmä v produkčných prostrediach, kde automatizované procesy často bežia bez priameho dohľadu.

## 6. Monitoring a notifikácie

Pri automatizovaných úlohách je nevyhnutné sledovať ich priebeh a výsledky. Monitoring umožňuje identifikovať problémy a reagovať na ne včas.

Jednoduchou formou monitoringu je logovanie priebehu vykonávania skriptu, napríklad zápis do súboru:

<div class="bash-code-example">
<pre><code>echo "Hotovo" >> log.txt
</code></pre>
</div>

V pokročilejších prípadoch možno implementovať notifikácie, napríklad prostredníctvom e-mailu alebo integrácie s monitorovacími nástrojmi. Tieto mechanizmy umožňujú automaticky informovať administrátora o zlyhaní úlohy.
Správne navrhnutý monitoring je kľúčový pre dlhodobé fungovanie automatizovaných procesov.

## 7. Reálne scenáre automatizácie

Automatizácia nachádza uplatnenie v mnohých oblastiach IT praxe. Skripty často kombinujú viacero techník, ako je práca so súbormi, spracovanie textu alebo ošetrenie chýb, aby riešili konkrétne problémy.

Typickým príkladom je zálohovanie dát:

<div class="bash-code-example">
<pre><code>tar -czf backup.tar.gz /data
</code></pre>
</div>

<div class="powershell-code-example">
<pre><code>Compress-Archive -Path C:\data -DestinationPath backup.zip
</code></pre>
</div>

Okrem zálohovania sa automatizácia využíva aj pri čistení logov, spracovaní dát alebo monitorovaní systému. Tieto scenáre ukazujú, že skriptovanie predstavuje praktický nástroj na riešenie reálnych úloh, pričom jeho efektivita spočíva v schopnosti opakovane vykonávať definované procesy bez zásahu používateľa.
