# Assignment 2: System Process and Resource Manager

## Assignment Goal

The goal of this assignment is to create a scripting tool for monitoring system processes and hardware resource usage. The student should design a solution that provides an overview of currently running processes, identifies those exceeding defined CPU or memory usage limits, and performs specific actions on them. Emphasis is placed on working with system information, interactive terminal control, input validation, event logging, and designing a long-term usable monitoring tool.

## Assignment

Create a script that regularly or on-demand displays a list of currently running processes along with their basic parameters, such as process ID, process name, CPU usage, and memory consumption. The script must identify processes exceeding defined limits, such as more than 70% CPU or a certain RAM usage threshold. The user must have the option to terminate these processes, mark them as suspicious, or log them to a log file.

The solution should include an interactive text menu that allows switching between different functions. The script must be able to run repeatedly in a loop, where the user chooses whether to only display the current state, filter processes, terminate a process, or create a report. An important part is also handling incorrect inputs and situations where a process no longer exists or cannot be terminated due to permissions.

## Requirements

The student must implement a clear CLI interface, input validation, logging of all critical operations, and ensure the script operates stably even with repeated use. Outputs must be clear, readable, and understandable even for users who are not deeply familiar with the system. The solution should be divided into functional parts so that loading processes, filtering, actions on processes, and logging can be handled independently.

## Bonus Extensions

A more advanced version may include automatic termination of processes based on defined rules, historical recording of system state at regular intervals, or generating alerts when critical values are exceeded.

## Structure Significance

This structure guides the student to avoid creating one long, unreadable script and instead divide the solution into logical parts. It also encourages thinking about configuration, documentation, and testing.

## Proposed Folder Structure

<div style="white-space: pre;">
assignment_2_process_monitor/
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
├── project_architecture.md
├── usage_scenarios.md
└── user_guide.md
</div>

## Structure Significance

This structure guides the student to avoid creating one long, unreadable script and instead divide the solution into logical parts. It also encourages thinking about configuration, documentation, and testing.
