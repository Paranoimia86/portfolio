# Assignment 3: Distributed Downloader and File Integrity Checker

## Assignment Goal

The goal of this assignment is to design an advanced script that automates downloading files from the internet based on a list of URLs, manages parallel downloading of multiple items simultaneously, and performs file integrity checks after downloading. The student should demonstrate the ability to work with network operations, files, hashing algorithms, logging, and managing script performance for a larger number of tasks.

## Assignment

Create a script that reads an input list of URLs from a file and then starts downloading individual files to a specified directory. The downloading must be performed in parallel, with the user able to set the maximum number of concurrently processed tasks. After each download is completed, the script must verify that the file was correctly saved and perform an integrity check by comparing the file size or using a checksum, such as SHA256.

The script must include a retry mechanism for failed downloads, log both successful and unsuccessful operations, and provide the user with information about the download progress. The solution should be designed to handle a larger number of URLs while maintaining system stability and clarity. Proper handling of error states, such as unavailable URLs, invalid links, or interrupted downloads, is also an essential part of the task.

## Requirements

The student must implement input URL list loading, parallel downloading, integrity checking, logging, and retrying failed downloads. The solution should be modular and include documentation explaining how to use it, the project structure, and the meaning of individual parameters. The output should include not only the script itself but also a clear record of successfully and unsuccessfully processed files.

## Bonus Extensions

As a bonus, the student can add features such as resuming interrupted downloads, splitting large files into parts, dynamically adjusting the number of parallel downloads based on system load, or generating a summary report after completing the entire batch.

## Structure Significance

This project organization guides the student to separate input data, downloaded files, resulting reports, logs, and tests. It is highly suitable for larger tasks where a significant number of auxiliary and output files are generated during development.

## Proposed Folder Structure

<div style="white-space: pre;">
assignment_3_downloader_integrity/
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
├── technical_design.md
├── module_descriptions.md
└── user_guide.md
</div>

## Structure Significance

This project organization guides the student to separate input data, downloaded files, resulting reports, logs, and tests. It is highly suitable for larger tasks where a significant number of auxiliary and output files are generated during development.
