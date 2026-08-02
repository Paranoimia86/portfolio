# Assignment 1: Automated Log Management and Reporting System

## Assignment Goal

The goal of this assignment is to design and implement a scripting tool capable of analyzing large volumes of log files, identifying error and warning events, sorting them by various criteria, and generating comprehensible outputs in the form of reports. The student should demonstrate the ability to work with files, directory structures, regular expressions, data filtering, script logging, and exporting results to standardized formats. An important aspect is also designing the solution to handle larger data volumes efficiently.

## Assignment

Create a script that processes all `.log` files in a selected directory, including subdirectories, and searches for records containing errors and warnings. The script must recognize at least `ERROR` and `WARNING` entries, process them, and organize them into a clear output. The solution should include the creation of a summary report showing the number of events found per file, as well as a detailed report containing the exact timestamp, event type, file name, and specific line or message identified.

The script should also allow filtering records by date or time interval, exporting processed data to `.csv` or `.json` formats, and creating its own activity log that records important operations, errors, and the processing progress. The solution should be modularly designed to easily extend support for additional types of log events or output formats.

## Requirements

The student must use regular expressions to identify the required records, ensure error handling when working with files, and design the script to process large volumes of logs without significant performance degradation. The output must be clear, systematic, and suitable for further processing. The submission should also include documentation describing the solution structure, how to run it, and the meaning of individual parameters.

## Bonus Extensions

As an extension, the student may implement parallel processing of multiple log files, automatic scheduled script execution using cron or Task Scheduler, or visualization of results, such as a graph of error events by day.

## Structure Significance

This folder structure guides the student to separate input data, source scripts, configuration files, outputs, and documentation. It also teaches them to work in a way that resembles real-world projects.

## Proposed Folder Structure

<div style="white-space: pre;">
assignment_1_log_analyzer/
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
├── solution_analysis.md
└── run_instructions.md
</div>

## Structure Significance

This folder structure guides the student to separate input data, source scripts, configuration files, outputs, and documentation. It also teaches them to work in a way that resembles real-world projects.
