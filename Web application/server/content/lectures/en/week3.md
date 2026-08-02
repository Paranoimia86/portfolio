# Lecture 3: Advanced Command Line Work

## Lecture Goal

The goal of this lecture is to develop the ability to work effectively in the command-line environment and understand the principles of combining commands into complex operations. Emphasis is placed on the ability to analyze problems and design solutions using appropriate combinations of tools, while also mastering principles of optimization and efficient data processing.

## 1. Command Chaining

Command chaining is one of the fundamental mechanisms that allow creating complex operations without the need to write a separate script. In the shell, individual commands can be linked to execute sequentially or conditionally, where the result of one command influences the execution of the next.
The basic operator is `;`, which ensures sequential execution of commands regardless of their success. This approach is particularly useful when individual operations are independent of each other.

<div class="bash-code-example">
<pre><code>echo "Initialization"; echo "Processing"; echo "Completion"
</code></pre>
</div>

More significant are the `&&` and `||` operators, which enable conditional execution. The `&&` operator executes the next command only if the previous command was successful, which is very useful for sequential execution of dependent operations. Conversely, the `||` operator is used for error handling.

<div class="bash-code-example">
<pre><code>mkdir data && echo "Directory created" || echo "Error creating directory"
</code></pre>
</div>

This approach allows implementing simple control mechanisms directly in the command line, reducing the need to write extensive scripts.

In PowerShell, similar logic is achieved by combining commands and conditions, or by using newer operators, with an emphasis on readability and explicitness:

<div class="powershell-code-example">
<pre><code>if (New-Item data -ItemType Directory -ErrorAction SilentlyContinue) {
Write-Output "Directory created"
} else {
Write-Output "Error creating directory"
}
</code></pre>
</div>

Understanding command chaining is crucial for designing efficient solutions, as it minimizes the number of code lines while maintaining execution logic.

## 2. Input and Output Redirection

Input and output redirection is one of the basic tools for working in the shell, allowing flexible data manipulation. Each command works with standard streams – input (stdin), output (stdout), and error output (stderr).
By default, these streams are tied to the terminal, but redirection allows them to be linked to files or other commands. Redirecting output to a file is one of the most common operations:

<div class="bash-code-example">
<pre><code>ls > files.txt
</code></pre>
</div>

Using the `>` operator overwrites the file content, while `>>` appends data to the end of an existing file. This distinction is important, especially when working with logs or incrementally saving results.
Additionally, error output can be redirected, which is important for diagnosing issues:

<div class="bash-code-example">
<pre><code>ls nonexistent.txt 2> error.txt
</code></pre>
</div>

In PowerShell, redirection is implemented similarly, but thanks to the object model, it is possible to work with output at a higher level of abstraction:

<div class="powershell-code-example">
<pre><code>Get-ChildItem > files.txt
</code></pre>
</div>

Redirection plays an important role in automation, as it allows saving results, analyzing errors, and creating complex data flows without manual intervention.

## 3. Pipeline and Filtering Tools

The pipeline is one of the most significant concepts of the shell, enabling commands to be connected into a single data flow. This mechanism supports the philosophy of modularity, where each tool performs one specific task, and the result is then processed by the next tool.
In the Bash environment, the pipeline transfers text data, meaning each command works with strings of characters. This approach is very flexible but often requires additional data processing.

<div class="bash-code-example">
<pre><code>cat log.txt | grep "ERROR" | sort
</code></pre>
</div>

In PowerShell, the pipeline works with objects, which represents a fundamental difference. Instead of text, structured data is transferred, which can be accessed using properties and methods.

<div class="powershell-code-example">
<pre><code>Get-Content log.txt |
Where-Object { $_ -match "ERROR" } |
Sort-Object
</code></pre>
</div>

This approach increases the robustness of solutions and reduces the likelihood of errors caused by incorrect text parsing. Understanding the pipeline is essential for effective work in the shell and creating complex operations.

## 4. Text Processing Tools (grep, awk, sed)

Text processing is one of the most common tasks in the shell, especially in Unix/Linux environments. For this purpose, there are many tools, the most important of which are `grep`, `awk`, and `sed`.
The `grep` tool is used to search for lines containing a specific pattern. It is very efficient and often used for log analysis:

<div class="bash-code-example">
<pre><code>grep "ERROR" log.txt
</code></pre>
</div>

`awk` provides advanced text processing capabilities, especially when working with columns and structured data. It allows operations on individual fields:

<div class="bash-code-example">
<pre><code>awk '{print $1, $3}' log.txt
</code></pre>
</div>

`sed` is designed for text editing, such as replacing or removing parts of text:

<div class="bash-code-example">
<pre><code>sed 's/error/ERROR/g' log.txt
</code></pre>
</div>

In PowerShell:

<div class="powershell-code-example">
<pre><code>Get-Content log.txt | Select-String "ERROR"
</code></pre>
</div>

These tools enable efficient processing of large amounts of data and form the basis for analyzing and transforming text outputs.

## 5. Efficient Work in the CLI Environment

Efficient work in the command line is not just about knowing commands but also about the ability to work quickly and systematically. Tools that increase productivity, such as command history, auto-completion, or aliases, play an important role.
Using history allows re-executing previous commands without retyping them, which significantly saves time. Auto-completion simplifies entering long file names or commands and reduces the likelihood of errors.
An alias allows creating a shortened name for frequently used commands:

<div class="bash-code-example">
<pre><code>alias ll='ls -l'
</code></pre>
</div>

In PowerShell:

<div class="powershell-code-example">
<pre><code>Set-Alias ll Get-ChildItem
</code></pre>
</div>

These mechanisms allow users to focus on solving the problem instead of entering commands, leading to higher work efficiency.

## 6. Command Optimization

Command optimization is an important aspect of advanced shell work. Poorly designed solutions can lead to unnecessary system load, lack of clarity, or lower performance.
One common problem is the excessive use of pipelines, which can be replaced with more efficient solutions. For example:

<div class="bash-code-example">
<pre><code>cat log.txt | grep "ERROR"
</code></pre>
</div>

can be optimized to:

<div class="bash-code-example">
<pre><code>grep "ERROR" log.txt
</code></pre>
</div>

This eliminates the need to start another process and reduces system load.
Similarly, in PowerShell, it is advisable to minimize the number of operations and work directly with data:

<div class="powershell-code-example">
<pre><code>Get-Content log.txt | Where-Object { $_ -match "ERROR" }
</code></pre>
</div>

Optimization also includes code readability. Clear and logically structured commands are not only faster to execute but also easier to maintain.
