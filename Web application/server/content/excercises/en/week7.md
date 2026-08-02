# Exercise 7: Working with Files and the System

Working with files and the system is a key part of scripting in administration and DevOps. A scripting language provides an abstraction over the file system, enabling efficient manipulation of files, directories, and their properties. This abstraction includes operations such as creating, deleting, moving, and reading files.

An important aspect is working with permissions, which determine who can read, write, or execute a file. Properly setting permissions is critical for system security.

Process and service management allows monitoring and controlling running applications. Scripts can, for example, start, stop, or check the status of services.

Monitoring system resources involves tracking CPU, memory, and disk space usage. This information is essential for performance optimization and problem diagnosis.

Scripting administrative tasks enables automation of common operations such as backups, system cleanup, or user management.

<h1 class="exercise-topic"> Task 1: File System Abstraction </h1>

<div class="exercise">

Design a script that traverses a given directory and creates an overview of all files, including their size, type, and last modification date. Save the output in a structured format.

</div>

<h1 class="exercise-topic"> Task 2: Working with Permissions </h1>

<div class="exercise">

Create a script that:

- checks the permissions of all files in a directory,
- identifies files with unsafe permissions (e.g., write access for everyone),
- adjusts them to safe values.

</div>

<h1 class="exercise-topic"> Task 3: Process Management </h1>

<div class="exercise">

Design a script that:

- retrieves a list of running processes,
- identifies processes exceeding a certain CPU or memory limit,
- displays them or performs an action (e.g., termination).

</div>

<h1 class="exercise-topic"> Task 4: Service Management </h1>

<div class="exercise">

Create a script that:

- checks the status of a selected service,
- automatically starts it if it is not running,
- logs the result of the operation.

</div>

<h1 class="exercise-topic"> Task 5: Monitoring System Resources </h1>

<div class="exercise">

Write a script that:

- monitors CPU and memory usage,
- displays a warning or performs an action if a defined limit is exceeded.

</div>

<h1 class="exercise-topic"> Task 6: Backup Automation </h1>

<div class="exercise">

Design a script that:

- creates a backup of a specified directory,
- saves it with a timestamp,
- ensures rotation of older backups (e.g., keeps only the last 5).

</div>

<h1 class="exercise-topic"> Task 7: Disk Space Management </h1>

<div class="exercise">

Create a script that:

- analyzes disk space usage,
- identifies the largest files,
- displays an overview.

</div>

<h1 class="exercise-topic"> Task 8: Combined Administrative Task </h1>

<div class="exercise">

Design a script that:

- checks the system status (disk, CPU),
- identifies issues,
- performs corrective actions (e.g., cleaning temporary files).

</div>

<h1 class="exercise-topic"> Task 9: File Operations and Filtering </h1>

<div class="exercise">

Write a script that:

- finds files based on criteria (e.g., extension, size),
- performs an operation on them (e.g., move or delete).

</div>

<h1 class="exercise-topic"> Task 10: Comprehensive Administrative Automation </h1>

<div class="exercise">

Design a comprehensive script that:

- combines file, process, and system resource management,
- performs multiple checks,
- generates a system status report.

</div>
