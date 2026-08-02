# Zadanie 1: Automatizovaný systém správy logov a reportovania

## Cieľ zadania

Cieľom zadania je navrhnúť a implementovať skriptovací nástroj, ktorý bude schopný analyzovať veľké množstvo logovacích súborov, identifikovať v nich chybové a varovné udalosti, triediť ich podľa rôznych kritérií a vytvárať zrozumiteľné výstupy vo forme reportov. Študent má pri riešení preukázať schopnosť pracovať so súbormi, adresárovou štruktúrou, regulárnymi výrazmi, filtrovaním dát, logovaním činnosti skriptu a exportom výsledkov do štandardizovaných formátov. Dôležitou súčasťou je aj návrh riešenia tak, aby bolo použiteľné aj pri spracovaní väčšieho objemu dát.

## Zadanie

Vytvor skript, ktorý prejde všetky .log súbory vo vybranom adresári vrátane podadresárov a v jednotlivých súboroch vyhľadá záznamy obsahujúce chyby a varovania. Skript musí vedieť rozpoznať minimálne záznamy typu ERROR a WARNING, následne ich spracovať a zaradiť do prehľadného výstupu. Súčasťou riešenia má byť vytvorenie sumárneho reportu, v ktorom bude uvedený počet nájdených udalostí podľa jednotlivých súborov, a zároveň aj detailného reportu obsahujúceho presný čas záznamu, typ udalosti, názov súboru a konkrétny riadok alebo správu, ktorá bola identifikovaná.
Skript má ďalej umožňovať filtrovanie záznamov podľa dátumu alebo časového intervalu, export spracovaných údajov do formátu .csv alebo .json a vytváranie vlastného logu činnosti skriptu, v ktorom budú zaznamenané dôležité operácie, chyby a priebeh spracovania. Riešenie by malo byť navrhnuté modulárne, aby bolo možné jednoducho rozšíriť podporu o ďalšie typy logovacích udalostí alebo ďalšie výstupné formáty.

## Požiadavky

Študent musí pri riešení použiť regulárne výrazy na identifikáciu požadovaných záznamov, zabezpečiť ošetrenie chýb pri práci so súbormi a navrhnúť skript tak, aby vedel spracovávať aj veľké množstvo logov bez výrazného poklesu výkonu. Výstup musí byť prehľadný, systematický a vhodný na ďalšie spracovanie. Súčasťou odovzdania má byť aj dokumentácia, v ktorej študent opíše štruktúru riešenia, spôsob spustenia a význam jednotlivých parametrov.

## Bonusové rozšírenia

Ako rozšírenie môže študent implementovať paralelné spracovanie viacerých logovacích súborov, automatické plánované spúšťanie skriptu pomocou cron alebo Task Scheduler, prípadne vizualizáciu výsledkov, napríklad graf chybových udalostí podľa dní.

## Význam štruktúry

Takto navrhnutý priečinok vedie študenta k tomu, aby oddelil vstupné dáta, zdrojové skripty, konfiguračné súbory, výstupy a dokumentáciu. Zároveň ho učí pracovať spôsobom, ktorý sa podobá reálnym projektom v praxi.

## Návrh obsahu priečinka

<div style="white-space: pre;">
zadanie_1_log_analyzator/
│
├── README.md
├── run.sh / run.ps1
├── config/
│ ├── settings.conf
│ └── patterns.conf
│
├── src/
│ ├── main.sh / main.ps1
│ ├── parser.sh / parser.ps1
│ ├── filters.sh / filters.ps1
│ ├── exporter.sh / exporter.ps1
│ └── logger.sh / logger.ps1
│
├── input_logs/
│ ├── app1.log
│ ├── app2.log
│ └── archive/
│ ├── old1.log
│ └── old2.log
│
├── output/
│ ├── summary_report.csv
│ ├── detailed_report.json
│ └── stats.txt
│
├── logs/
│ └── script_execution.log
│
├── tests/
│ ├── test_parser.sh / test_parser.ps1
│ ├── test_filters.sh / test_filters.ps1
│ └── sample_expected_output/
│
└── docs/
├── analyza_riesenia.md
└── navod_na_spustenie.md
</div>
