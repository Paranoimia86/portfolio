# Lecture 7: Working with Files and the System

## Lecture Objective

The objective of this lecture is to provide students with a comprehensive understanding of working with the file system and system resources in Bash and PowerShell environments. The lecture focuses not only on file operations but also on their context—permissions, performance, security, and reliability. Students will learn to design scripts that can handle real-world data and manage error scenarios.

## 1. File System and Its Importance in Scripting

The file system represents the fundamental infrastructure for storing and organizing data, and scripting over it enables automation of a wide range of operations. In practice, almost every script interacts with files—whether it involves reading input data, generating outputs, or manipulating existing data.

In Bash, working with files is closely tied to the Unix philosophy, where various system entities are represented as files. This allows for a unified way of working but also requires a thorough understanding of what individual "files" represent. PowerShell, on the other hand, approaches the file system through an object model, where each element contains structured information.

When designing scripts, it is important to consider:

- Execution context (current working directory)
- Portability (relative vs. absolute paths)
- Resource availability (file existence)
- Data consistency (whether the file changes during processing)

Neglecting these aspects can lead to unpredictable script behavior, especially when deployed in production environments.

## 2. Basic File and Directory Operations

Basic operations such as creating, copying, moving, and deleting files form the core of most scripts. Although these are simple operations, their improper use can have serious consequences, such as data loss.

In Bash:

<div class="bash-code-example">
<pre><code>mkdir data
cp file.txt data/
mv file.txt data/
rm file.txt
</code></pre>
</div>

In PowerShell:

<div class="powershell-code-example">
<pre><code>New-Item -ItemType Directory -Name data
Copy-Item file.txt data\
Move-Item file.txt data\
Remove-Item file.txt
</code></pre>
</div>

When designing scripts, it is necessary to consider:

- Idempotency of operations (whether repeated execution causes errors)
- Security (protection against unintentional deletion)
- Data consistency (e.g., copying during writing)
- Performance (working with large files)

In practice, control mechanisms are often implemented, such as verifying the existence of the target file or creating backups before an operation.

## 3. Reading and Writing Files

Reading and writing are key operations when processing data. Their implementation varies depending on the tool and the size of the data being processed.

In Bash, reading is often done line by line, which allows efficient processing of large files:

<div class="bash-code-example">
<pre><code>while read line; do
echo $line
done < file.txt
</code></pre>
</div>

PowerShell allows simpler reading while working with objects:

<div class="powershell-code-example">
<pre><code>Get-Content file.txt
</code></pre>
</div>

For writing:

<div class="bash-code-example">
<pre><code>echo "text" > file.txt
</code></pre>
</div>

<div class="powershell-code-example">
<pre><code>"text" | Out-File file.txt
</code></pre>
</div>

Important aspects:

- Efficiency with large files (streaming vs. loading into memory)
- Correct encoding (UTF-8, ASCII)
- Difference between overwriting and appending data
- Handling write errors (e.g., lack of space)

When designing robust scripts, it is essential to ensure that read and write operations are reliable and do not corrupt data.

## 4. Working with Directory Structures

Directory structures allow organizing data into a hierarchical system, which is crucial when processing a large number of files. Scripts often need to traverse directories and apply operations to all files of a certain type.

In Bash:

<div class="bash-code-example">
<pre><code>for file in *.txt; do
echo $file
done
</code></pre>
</div>

Advanced:

<div class="bash-code-example">
<pre><code>find . -name "*.txt"
</code></pre>
</div>

In PowerShell:

<div class="powershell-code-example">
<pre><code>Get-ChildItem -Recurse -Filter *.txt
</code></pre>
</div>

When designing, it is necessary to consider:

- Depth of the directory structure
- Number of files (performance)
- Filtering relevant data
- Possibility of parallel processing

Improperly designed searches can significantly burden the system, especially when working with large data repositories.

## 5. Permissions and File Access

Permissions determine who and how can access files. This aspect is crucial not only from a security perspective but also for script functionality.

In Bash:

<div class="bash-code-example">
<pre><code>chmod +x script.sh
</code></pre>
</div>

Improperly set permissions can prevent script execution or data access. PowerShell uses a more complex ACL model, which allows for more detailed access control.

When designing scripts, it is necessary to:

- Work with the minimum required permissions
- Verify file access before an operation
- Handle situations where access is not allowed

The security aspect is especially important in production systems, where incorrect permission settings can lead to data leaks or system breaches.

## 6. Managing Processes and System Resources

Scripting enables not only file manipulation but also interaction with system processes. Processes represent running programs that can be monitored, controlled, or terminated.

In Bash:

<div class="bash-code-example">
<pre><code>ps aux
kill 1234
</code></pre>
</div>

In PowerShell:

<div class="powershell-code-example">
<pre><code>Get-Process
Stop-Process -Id 1234
</code></pre>
</div>

These operations are important, for example, in:

- System diagnostics
- Automating service management
- Resolving performance issues

When working with processes, it is necessary to ensure system security and stability, as improperly terminating a process can cause data loss or service outages.

## 7. Automating Administrative Tasks

Automation is the main reason for using scripting in practice. Scripts allow repetitive tasks to be performed without user intervention, increasing efficiency and reliability.

A typical example is data backup:

<div class="bash-code-example">
<pre><code>cp -r /data /backup
</code></pre>
</div>

<div class="powershell-code-example">
<pre><code>Copy-Item -Recurse C:\data C:\backup
</code></pre>
</div>

Automation enables:

- Eliminating manual errors
- Ensuring consistent execution of operations
- Scheduling tasks (e.g., cron, task scheduler)
- Scaling solutions

When designing automation, it is important to also consider error scenarios, logging, and the ability to restart tasks without negative consequences.
