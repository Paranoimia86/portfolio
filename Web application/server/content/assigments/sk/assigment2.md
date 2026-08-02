# Zadanie 2: Správca systémových procesov a zdrojov

## Cieľ zadania

Cieľom zadania je vytvoriť skriptovací nástroj na monitorovanie systémových procesov a využívania hardvérových zdrojov. Študent má navrhnúť riešenie, ktoré umožní získať prehľad o aktuálne bežiacich procesoch, identifikovať tie, ktoré prekračujú definované limity využitia procesora alebo pamäte, a následne nad nimi vykonať určité akcie. Dôraz sa kladie na prácu so systémovými informáciami, interaktívne ovládanie cez terminál, validáciu vstupov, logovanie udalostí a návrh dlhodobo použiteľného monitorovacieho nástroja.

## Zadanie

Vytvor skript, ktorý bude pravidelne alebo na požiadanie zobrazovať zoznam aktuálne bežiacich procesov spolu s ich základnými parametrami, ako sú identifikátor procesu, názov procesu, využitie CPU a spotreba operačnej pamäte. Skript musí vedieť identifikovať procesy, ktoré prekračujú definované limity, napríklad viac ako 70 % CPU alebo určitú hranicu využitia RAM. Používateľ musí mať možnosť tieto procesy ukončiť, označiť ich ako podozrivé alebo ich zaznamenať do logovacieho súboru.
Riešenie má obsahovať interaktívne textové menu, pomocou ktorého bude možné prepínať medzi jednotlivými funkciami. Skript musí byť schopný bežať opakovane v slučke, pričom používateľ si zvolí, či chce iba zobrazenie aktuálneho stavu, filtrovanie procesov, ukončenie procesu alebo vytvorenie reportu. Dôležitou súčasťou je tiež ošetrenie nesprávnych vstupov a situácií, keď proces už neexistuje alebo ho nie je možné ukončiť z dôvodu oprávnení.

## Požiadavky

Študent musí implementovať prehľadné CLI rozhranie, validáciu vstupov, logovanie všetkých kritických operácií a zabezpečiť stabilné fungovanie skriptu aj pri opakovanom používaní. Výstupy musia byť jasné, čitateľné a zrozumiteľné aj pre používateľa, ktorý sa v systéme neorientuje detailne. Riešenie má byť rozdelené do funkčných častí tak, aby bolo možné samostatne riešiť načítanie procesov, filtrovanie, akcie nad procesmi a zapisovanie logov.

## Bonusové rozšírenia

Pokročilejšia verzia môže obsahovať automatické ukončovanie procesov na základe definovaných pravidiel, historické zaznamenávanie stavu systému v pravidelných intervaloch, prípadne generovanie upozornení pri prekročení kritických hodnôt.

## Význam štruktúry

Táto štruktúra študenta vedie k tomu, aby nevytváral jeden dlhý neprehľadný skript, ale rozdelil riešenie na logické celky. Zároveň ho núti myslieť na konfiguráciu, dokumentáciu a testovanie.

## Návrh obsahu priečinka

<div style="white-space: pre;">
zadanie_2_monitor_procesov/
│
├── README.md
├── run.sh / run.ps1
├── config/
│ ├── limits.conf
│ └── menu.conf
│
├── src/
│ ├── main.sh / main.ps1
│ ├── process_reader.sh / process_reader.ps1
│ ├── process_filter.sh / process_filter.ps1
│ ├── process_actions.sh / process_actions.ps1
│ ├── menu.sh / menu.ps1
│ └── logger.sh / logger.ps1
│
├── output/
│ ├── active_processes.txt
│ ├── suspicious_processes.csv
│ └── history/
│ ├── snapshot_001.txt
│ ├── snapshot_002.txt
│ └── snapshot_003.txt
│
├── logs/
│ └── monitor.log
│
├── tests/
│ ├── test_filtering.sh / test_filtering.ps1
│ ├── test_actions.sh / test_actions.ps1
│ └── test_input_validation.sh / test_input_validation.ps1
│
└── docs/
├── architektura_projektu.md
├── scenare_pouzitia.md
└── navod_na_obsluhu.md
</div>
