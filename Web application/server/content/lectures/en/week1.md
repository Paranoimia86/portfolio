# Lecture 1: Introduction to Scripting and Automation

## Lecture Goal

The goal of the introductory lecture is to establish a solid theoretical foundation for understanding scripting as a tool for automation. Students will become familiar with the importance of scripting in practice, learn to distinguish between scripting and traditional programming, and gain a basic overview of Bash and PowerShell environments. The emphasis is on understanding principles, not just syntax.

## 1. The Importance of Scripting in Practice

Scripting is one of the most important tools for automation in the field of information technology. In practice, we often encounter tasks that are repetitive, time-consuming, or require precise adherence to procedures. Manually performing such tasks is not only inefficient but also increases the likelihood of errors. Scripting allows these tasks to be formalized into a sequence of commands that can be repeatedly executed without user intervention.
From a system administration perspective, this includes automated data backups, user account management, or configuration of system services. In data processing, scripts are used for log file analysis, data format transformation, or report generation. In modern approaches such as DevOps, scripting plays a key role in automating building, testing, and deploying applications.
Another important aspect is the reproducibility of processes. A script ensures that the same operation will always be performed in the same way, which is essential, for example, in infrastructure management or deploying applications in a production environment.
A simple example of automation could be a script that prints the current user and system time.

### Bash

<div class="bash-code-example">
<pre><code>#!/bin/bash
echo "User: $USER"
echo "Date and Time: $(date)"
</code></pre>
</div>

### PowerShell

<div class="powershell-code-example">
<pre><code>Write-Output "User: $env:USERNAME"
Write-Output "Date and Time: $(Get-Date)"
</code></pre>
</div>

## 2. Scripting vs. Programming

Scripting can be seen as a specific form of programming that focuses on automation and integration of existing tools. Unlike traditional programming languages, which are often compiled into executable form, scripting languages are interpreted. This means that individual commands are executed sequentially without prior compilation, allowing for quick testing and iterative development.
Scripts are often used as "glue code," i.e., code that connects various tools, services, or system components. Instead of implementing complex logic from scratch, existing commands and tools are combined into one solution.
From a practical perspective, it is important to distinguish between situations where scripting is appropriate and situations where it is more effective to use a full-fledged programming language. Scripting is ideal for quick solutions, automation, and system work, while traditional programming is better suited for large applications with complex logic.
As an example, consider a simple task where a script checks whether a specific file exists.

### Bash

<div class="bash-code-example">
<pre><code>#!/bin/bash
if [ -f "file.txt" ]; then
echo "File exists."
else
echo "File does not exist."
fi
</code></pre>
</div>

### PowerShell

<div class="powershell-code-example">
<pre><code>if (Test-Path "file.txt") {
Write-Output "File exists."
} else {
Write-Output "File does not exist."
}
</code></pre>
</div>

## 3. Shell as an Interface to the Operating System

The shell represents the basic interface between the user and the operating system. It allows commands to be entered, programs to be executed, and system resources to be manipulated. It is important to distinguish between the shell as a command interpreter and the terminal as a tool that provides a graphical or textual environment for its use.
One of the key tasks of the shell is process management and command interpretation. After entering a command, the shell analyzes its syntactic structure, identifies the executable program, and ensures its execution within the operating system. It also allows working with command input and output, which is the basis for efficient data processing.
A key concept is the pipeline, which allows multiple commands to be connected into a single stream of operations. The output of one command becomes the input of the next, creating a chain of operations.

### Bash

<div class="bash-code-example">
<pre><code>ls -l | grep ".txt"
</code></pre>
</div>

### PowerShell

<div class="powershell-code-example">
<pre><code>Get-ChildItem | Where-Object { $_.Name -like "*.txt" }
</code></pre>
</div>

## 4. Overview of Bash and PowerShell

### Bash

Bash (Bourne Again Shell) is the standard shell used in Unix and Linux operating systems. It is designed as a simple yet highly flexible tool that enables efficient work with text data. Its strength lies mainly in the ability to combine multiple commands and tools, such as grep, awk, or sed, into one functional unit.
In practice, Bash is primarily used in server environments where automation of administrative tasks and processing of text outputs are required. Its philosophy is based on the simplicity and modularity of individual tools.

A short example of working in Bash might look as follows:

<div class="bash-code-example">
<pre><code>#!/bin/bash
echo "Contents of the current directory:"
ls
</code></pre>
</div>

### PowerShell

PowerShell is a modern scripting environment developed by Microsoft, built on the .NET platform. Unlike Bash, it does not primarily work with text but with objects, allowing for more precise and robust data manipulation.
This approach simplifies working with system information and reduces the need for manual processing of text outputs. PowerShell is widely used mainly in Windows environments, but it is now also available for Linux and macOS, making it a universal tool for administration and automation.

A simple equivalent of the previous example in PowerShell might look like this:

<div class="powershell-code-example">
<pre><code>Write-Output "Contents of the current directory:"
Get-ChildItem
</code></pre>
</div>

## 5. Philosophy of Work – Text vs. Objects

The fundamental difference between Bash and PowerShell lies in the way data is processed. Bash works with text strings, which often need to be further analyzed and modified using various tools. This approach is very flexible but can be prone to errors, especially in more complex operations.
PowerShell, on the other hand, works with objects that contain structured information. This allows direct access to individual data properties without the need for parsing. This difference leads to greater clarity and robustness of scripts, which is advantageous especially for more complex tasks.
The difference between the text-based and object-based approach can be illustrated with an example of obtaining information about processes.

### Bash

<div class="bash-code-example">
<pre><code>ps aux | grep firefox
</code></pre>
</div>

In this case, the result is a text output that needs to be further filtered.

### PowerShell

<div class="powershell-code-example">
<pre><code>Get-Process | Where-Object { $_.ProcessName -like "*firefox*" }
</code></pre>
</div>

In PowerShell, objects are filtered, and it is possible to directly access the ProcessName property. This example perfectly captures the difference between the two environments and is suitable as a first demonstration example in the lecture.

## 6. Use in Modern IT Fields

Scripting is now an integral part of modern IT processes. In the field of DevOps, it is used to automate builds, testing, and application deployments. In cloud solutions, it enables efficient infrastructure management and configuration automation.
In addition, scripting is also applied in server management, system monitoring, and data processing. In many cases, it forms the basis for approaches such as Infrastructure as Code, which allow infrastructure to be managed using defined scripts.
A simple example of an administrative task might be creating a directory for backups.

### Bash

<div class="bash-code-example">
<pre><code>mkdir -p backup
echo "Directory has been created."
</code></pre>
</div>

### PowerShell

<div class="powershell-code-example">
<pre><code>New-Item -Path "./backup" -ItemType Directory -Force
Write-Output "Directory has been created."
</code></pre>
</div>
