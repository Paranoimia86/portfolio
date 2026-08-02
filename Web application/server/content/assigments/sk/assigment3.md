# Zadanie 3: Distribuovaný downloader a kontrola integrity súborov

## Cieľ zadania

Cieľom zadania je navrhnúť pokročilý skript, ktorý bude automatizovane sťahovať súbory z internetu na základe zoznamu adries, riadiť paralelné sťahovanie viacerých položiek súčasne a po stiahnutí vykonať kontrolu integrity súborov. Študent má pri riešení preukázať schopnosť pracovať so sieťovými operáciami, súbormi, hashovacími algoritmami, logovaním a riadením výkonu skriptu pri väčšom počte úloh.

## Zadanie

Vytvor skript, ktorý načíta vstupný zoznam URL adries zo súboru a následne začne sťahovať jednotlivé súbory do určeného adresára. Sťahovanie musí byť realizované paralelne, pričom používateľ bude môcť nastaviť maximálny počet súbežne spracovávaných úloh. Po dokončení každého sťahovania musí skript overiť, či bol súbor korektne uložený, a vykonať kontrolu integrity pomocou porovnania veľkosti súboru alebo kontrolného súčtu, napríklad SHA256.
Skript musí obsahovať mechanizmus opakovaného pokusu pri zlyhaní sťahovania, zaznamenávať úspešné aj neúspešné operácie do logov a poskytovať používateľovi informácie o priebehu sťahovania. Riešenie má byť navrhnuté tak, aby bolo možné spracovať väčší počet adries, pričom systém má zostať stabilný a prehľadný. Dôležitou súčasťou je aj korektná práca s chybovými stavmi, ako sú nedostupné URL adresy, neplatné odkazy alebo prerušené sťahovanie.

## Požiadavky

Študent musí zabezpečiť implementáciu načítania vstupného zoznamu adries, paralelného sťahovania, kontroly integrity, logovania a opakovania pokusu pri zlyhaní. Riešenie má byť modulárne a má obsahovať dokumentáciu vysvetľujúcu spôsob použitia, štruktúru projektu a význam jednotlivých parametrov. Výstupom má byť nielen samotný skript, ale aj prehľadná evidencia úspešne a neúspešne spracovaných súborov.

## Bonusové rozšírenia

Ako bonus môže študent doplniť možnosť pokračovania v prerušenom sťahovaní, rozdelenie veľkých súborov na časti, dynamické prispôsobovanie počtu paralelných sťahovaní podľa zaťaženia systému alebo generovanie súhrnného reportu po dokončení celej dávky.

## Význam štruktúry

Táto organizácia projektu vedie študenta k tomu, aby oddelil vstupné dáta, samotné sťahované súbory, výsledné reporty, logy a testy. Je to veľmi vhodné pri väčších úlohách, kde sa počas vývoja rýchlo vytvára veľké množstvo pomocných a výstupných súborov.

## Návrh obsahu priečinka

<div style="white-space: pre;">
zadanie_3_downloader_integrita/
│
├── README.md
├── run.sh / run.ps1
├── config/
│ ├── download.conf
│ └── retry.conf
│
├── src/
│ ├── main.sh / main.ps1
│ ├── url_loader.sh / url_loader.ps1
│ ├── downloader.sh / downloader.ps1
│ ├── verifier.sh / verifier.ps1
│ ├── scheduler.sh / scheduler.ps1
│ └── logger.sh / logger.ps1
│
├── input/
│ ├── urls.txt
│ ├── hashes.txt
│ └── metadata/
│ └── expected_sizes.csv
│
├── downloads/
│ ├── completed/
│ ├── failed/
│ └── partial/
│
├── output/
│ ├── download_report.csv
│ ├── integrity_report.json
│ └── summary.txt
│
├── logs/
│ └── downloader.log
│
├── tests/
│ ├── test_url_loader.sh / test_url_loader.ps1
│ ├── test_verifier.sh / test_verifier.ps1
│ └── test_retry_logic.sh / test_retry_logic.ps1
│
└── docs/
├── technicky_navrh.md
├── popis_modulov.md
└── navod_na_spustenie.md
</div>

## Význam štruktúry

Táto organizácia projektu vedie študenta k tomu, aby oddelil vstupné dáta, samotné sťahované súbory, výsledné reporty, logy a testy. Je to veľmi vhodné pri väčších úlohách, kde sa počas vývoja rýchlo vytvára veľké množstvo pomocných a výstupných súborov.
