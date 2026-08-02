# Exercise 1: Introduction to Scripting and Automation

Scripting represents one of the fundamental pillars of modern system administration and DevOps approaches. It is a way to automate repetitive tasks, simplify administration, and minimize human errors. Instead of manually executing commands, an administrator or developer can create a script that performs these steps automatically.

In practice, scripting is used for:

- deploying applications,
- managing users,
- backing up data,
- monitoring systems,
- configuring servers.

An important concept is the difference between interpreted and compiled languages. Interpreted languages (e.g., Bash, PowerShell, Python) are executed line by line, while compiled languages (e.g., C, C++) are first translated into machine code. The advantage of interpreted languages is faster testing and easier use in automation.

A shell is an interface between the user and the operating system. It allows users to enter commands, run programs, and work with files. The most well-known shells are:

- Bash (Linux, Unix systems),
- PowerShell (Windows, but now also cross-platform).

The difference between them lies mainly in their philosophy:

- Bash primarily works with text,
- PowerShell works with objects.

This is particularly evident in pipelines:

- Bash: transfers text between commands,
- PowerShell: transfers objects (allowing for more advanced data manipulation).

<h1 class="exercise-topic"> Task 1: Basic Concepts </h1>

<div class="exercise">

Explain in your own words what scripting is, the difference between interpreted and compiled languages, and what a shell represents in the context of an operating system.

</div>

<h1 class="exercise-topic"> Task 2: Suitability of Scripting in Practice </h1>

<div class="exercise">

Evaluate the following situations and determine which are suitable for automation using scripting. Briefly justify your decision. Focus on manually copying files performed daily, a one-time opening of a text file, automatic nightly database backups, and regular monitoring of CPU usage every five minutes.

</div>

<h1 class="exercise-topic"> Task 3: Comparison of Bash and PowerShell </h1>

<div class="exercise">

Compare the Bash and PowerShell environments in terms of the type of data they work with, how they use pipelines, and the typical environments in which they are used.

</div>

<h1 class="exercise-topic"> Task 4: Basic Commands in Bash </h1>

<div class="exercise">

Propose commands in the Bash environment that display the current working directory and then list the contents of that directory.

</div>

<h1 class="exercise-topic"> Task 5: Basic Commands in PowerShell </h1>

<div class="exercise">

Propose commands in the PowerShell environment that display a list of files in a folder and then modify the output to include only file names.

</div>

<h1 class="exercise-topic"> Task 6: Script Design for Backup </h1>

<div class="exercise">

Design a simple script scenario that creates a backup of a specific folder every day, saves it to another directory, and automatically adds the current date to the backup's name.

</div>
