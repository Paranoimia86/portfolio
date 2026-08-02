# Lecture 2: Shell Architecture and Execution Model

## Lecture Goal

The goal of this lecture is to provide students with a deeper understanding of the mechanisms involved in executing commands in the shell. The lecture focuses on process management, execution context, differences between shell modes, and principles of data transfer between commands. Mastering these concepts is essential for designing efficient, reliable, and scalable scripts.

## 1. Processes and Command Execution

When working with the shell, each command is interpreted as a request to execute a specific program or internal operation. In the operating system, this means creating a new process with its own address space, identifier (PID), and allocated system resources.
The shell first analyzes the command's syntax, determines whether it is a built-in command or an external program, and then ensures its execution. For external programs, it uses operating system mechanisms (e.g., fork/exec in Unix systems), where the parent process (shell) can either wait for the child to complete or continue with other tasks.
Sequential execution means that commands are processed one after another, with each subsequent command executed only after the previous one finishes. This model is fundamental but is often extended in practice with parallel processing.

### Bash

<div class="bash-code-example">
<pre><code>sleep 3
echo "Command completed"
</code></pre>
</div>

### PowerShell

<div class="powershell-code-example">
<pre><code>Start-Sleep -Seconds 3
Write-Output "Command completed"
</code></pre>
</div>

Understanding the process lifecycle is crucial, especially for diagnosing issues, optimizing performance, and designing scripts that handle multiple tasks simultaneously.

## 2. Subshell and Execution Context

The execution context represents a set of information that defines the environment in which a command or script is executed. This includes variable values, the current working directory, environment variables, and other settings.
In certain operations, the shell creates a subshell, a new process that inherits the parent shell's context but does not propagate subsequent changes back. This mechanism is important because it can lead to unexpected script behavior if not understood by the programmer.

In Bash, a subshell is often created using parentheses or when using a pipeline. Each segment of the pipeline may be executed in a separate process, meaning variable changes may not be available outside of it.

<div class="bash-code-example">
<pre><code>VAR="original"
( VAR="changed"; echo $VAR )
echo $VAR
</code></pre>
</div>

In PowerShell, scopes are used to manage variable visibility, and similar behavior can be observed when executing code blocks or scripts.

<div class="powershell-code-example">
<pre><code>$var = "original"
& {
$var = "changed"
Write-Output $var
}
Write-Output $var
</code></pre>
</div>

Understanding the execution context is essential for designing modular scripts, working with functions, and debugging.

## 3. Interactive vs. Non-Interactive Mode

The shell can operate in interactive or non-interactive mode, each with its own specifics and use cases.
Interactive mode represents direct communication between the user and the shell. The user enters commands, immediately sees results, and can respond to outputs. This mode is typical for system administration, command testing, or exploratory work.
In contrast, non-interactive mode is characteristic of scripts executed without user intervention. In this case, the shell processes commands from a file or another source and executes them sequentially.
The difference between these modes has practical implications:

- In interactive mode, certain features (e.g., aliases, history) are available.
- In non-interactive mode, all dependencies must be explicitly defined.

### Bash

<div class="bash-code-example">
<pre><code>#!/bin/bash
echo "Running in non-interactive mode"
</code></pre>
</div>

When designing scripts, it is important to ensure they work reliably even without user interaction, which includes input validation and error handling.

## 4. Environment and Environment Variables

Every process runs in a specific environment defined by a set of environment variables. These variables provide information about system configuration, the user, or available resources.
Environment variables are inherited between processes, meaning a child process inherits its parent's environment. This mechanism allows for setting global configurations or defining paths to executable files.
One of the most important variables is PATH, which determines where the shell looks for executable programs.

### Bash

<div class="bash-code-example">
<pre><code>echo $PATH
</code></pre>
</div>

### PowerShell

<div class="powershell-code-example">
<pre><code>$env:PATH
</code></pre>
</div>

Additionally, custom environment variables can be defined and used within scripts or other applications. Proper understanding of environment handling is crucial for creating portable and configurable solutions.

## 5. Pipeline – Data Flow Between Commands

The pipeline is one of the most important shell mechanisms, enabling efficient data processing by combining simple commands. Instead of storing intermediate results in files, these results can be directly transferred between commands.
In Bash, the pipeline transfers text data, with each command working on streams of characters. This approach is very flexible but requires frequent text parsing.

<div class="bash-code-example">
<pre><code>cat log.txt | grep "ERROR" | sort
</code></pre>
</div>

## 6. Exit Codes and Execution Flow Control

Every process returns an exit code upon completion, signaling the result of its execution. A value of 0 indicates success, while non-zero values indicate various types of errors.
These codes are fundamental for controlling the execution flow in scripts, as they allow reacting to the success or failure of individual operations.

<div class="bash-code-example">
<pre><code>ls file.txt
echo $?
</code></pre>
</div>

In PowerShell, the return code can be monitored using special variables:

<div class="powershell-code-example">
<pre><code>Get-Item file.txt
$LASTEXITCODE
</code></pre>
</div>

Based on these values, robust scripts can be implemented to handle errors and ensure the correct continuation of the program.

## 7. Sequential and Parallel Execution

The default model for executing commands in the shell is sequential, meaning commands are executed one after another. This approach is simple and predictable, but it can be inefficient for certain tasks.
However, the shell also allows parallel execution, which involves running multiple processes simultaneously. This approach can significantly improve performance, especially for tasks that are independent of each other.

<div class="bash-code-example">
<pre><code>sleep 5 &
echo "Continuing without waiting"
</code></pre>
</div>

In PowerShell, parallelism can be achieved using jobs:

<div class="powershell-code-example">
<pre><code>Start-Job { Start-Sleep 5 }
Write-Output "Continuing without waiting"
</code></pre>
</div>

Understanding the difference between sequential and parallel processing is important for designing efficient scripts and optimizing performance.
