# Lecture 9: Error Handling and Script Robustness

## Lecture Objective

The objective of this lecture is to provide students with a deep understanding of error handling in scripting and teach them how to design robust solutions capable of responding to unpredictable situations. The lecture focuses on identifying types of errors, systematically handling them, and utilizing debugging tools. Emphasis is placed on reliability, predictability, and the quality of scripts in real-world conditions.

## 1. Types of Errors in Scripting

When designing scripts, it is essential to understand that errors occur at different levels and have distinct characteristics. Proper classification of errors allows for choosing the appropriate handling strategy.

**Syntax Errors** are caused by incorrect code writing and are usually detected before the script is executed. Examples include missing parentheses, improperly used commands, or invalid syntax. These errors are relatively easy to identify because the interpreter immediately points them out.

**Logical Errors** are significantly more complex because the script executes without an apparent error, but the result is incorrect. A typical example is a poorly formulated condition or a flawed algorithm design. Detecting these errors requires thorough analysis of the script's behavior and often testing various scenarios.

**Runtime Errors** occur during script execution, such as when working with a non-existent file, lacking permissions, or an external command failure. These errors are the most critical because they can lead to script interruption or an inconsistent system state.

From a design perspective, it is important to:

- Identify which errors can be caught in advance (e.g., input validation)
- Distinguish between critical and non-critical errors
- Design a mechanism for responding to errors (e.g., termination, retrying the operation, logging)
- Ensure that errors do not affect data or system integrity

## 2. Designing Robust Scripts

A robust script is one that can function correctly even under non-ideal conditions. It does not only work with "correct" inputs but also accounts for errors and unexpected situations.

When designing a robust solution, focus on:

- **Input Validation**, which includes checking file existence, data format correctness, or resource availability
- **Operation Results Verification**, where the success of executed commands is verified before proceeding
- **Maintaining Consistent State**, such as ensuring that a partially executed operation does not leave the system in an inconsistent state
- **Implementing Fallback Mechanisms**, which allow using alternative solutions in case of failure

Example of input validation:

<div class="bash-code-example">
<pre><code>if [ ! -f "data.txt" ]; then
echo "File does not exist"
exit 1
fi
</code></pre>
</div>

The robustness of a script is directly related to its usability in real-world conditions. A script that only works with ideal inputs is practically unusable.

## 3. Working with Return Codes

Return codes are a fundamental mechanism for communication between commands and the script. Each command returns a value that signals the success or failure of an operation.

In Bash:

<div class="bash-code-example">
<pre><code>ls file.txt
echo $?
</code></pre>
</div>

In PowerShell:

<div class="powershell-code-example">
<pre><code>Get-Item file.txt
$LASTEXITCODE
</code></pre>
</div>

Proper use of return codes allows:

- Controlling program flow based on operation results
- Preventing script continuation after an error
- Implementing conditional command execution
- Increasing solution reliability

When designing, it is important to:

- Check return codes of critical operations (e.g., copying, writing to a file)
- Define custom return codes for functions
- Ensure consistent behavior in case of errors

Ignoring return codes is one of the most common scripting mistakes and leads to hard-to-detect problems.

## 4. Error Handling – try/catch and Conditions

Error handling allows a script to respond to problems without immediate failure. It is a mechanism that ensures controlled error processing.

In Bash, this approach is mainly implemented using conditions:

<div class="bash-code-example">
<pre><code>if ! cp file.txt backup/; then
echo "Error during copying"
fi
</code></pre>
</div>

In PowerShell:

<div class="powershell-code-example">
<pre><code>try {
Copy-Item file.txt backup\
} catch {
Write-Output "Error during copying"
}
</code></pre>
</div>

Error handling allows:

- Capturing errors and preventing script crashes
- Informing the user about the problem
- Performing a fallback operation or rollback
- Logging the error

When designing, it is important to:

- Distinguish between errors that can be ignored and critical errors
- Ensure that error handling does not obscure problems (i.e., errors are not "silently ignored")
- Maintain code readability even when implementing error handling

## 5. Debugging Scripts

Debugging is the systematic process of identifying and fixing errors. It is an essential part of development, especially for complex scripts.

In Bash:

<div class="bash-code-example">
<pre><code>set -x
</code></pre>
</div>

In PowerShell:

<div class="powershell-code-example">
<pre><code>Set-PSDebug -Trace 1
</code></pre>
</div>

Effective debugging involves:

- Tracking the execution of individual commands
- Analyzing intermediate results
- Incrementally testing parts of the script
- Isolating problematic sections

It is also important to:

- Use a systematic approach (not random changes)
- Reproduce the error in a controlled environment
- Document findings

Without effective debugging, developing larger scripts is practically impossible.

## 6. Logging and Monitoring Script Execution

Logging is a key tool for monitoring script behavior during execution. It allows recording important events and retrospectively analyzing the processing flow.

<div class="bash-code-example">
<pre><code>echo "Processing started" >> log.txt
</code></pre>
</div>

<div class="powershell-code-example">
<pre><code>"Processing started" | Out-File log.txt -Append
</code></pre>
</div>

Effective logging includes:

- Recording key events (start, end, errors)
- Adding timestamps
- Differentiating log levels (info, warning, error)
- Minimizing unnecessary information

Logging is especially necessary for:

- Unattended automated tasks
- Long-running processes
- Production systems

## 7. Testing Scripts

Testing is the process of verifying the correctness of a script in various scenarios. Its goal is to detect errors before deployment to production.

Effective testing includes:

- Testing various inputs, including edge cases
- Simulating error scenarios (e.g., non-existent file)
- Verifying output correctness
- Repeated testing after code modifications

Testing allows:

- Increasing script reliability
- Detecting logical errors
- Ensuring consistent behavior

When designing scripts, it is advisable to consider testing from the beginning, not just after implementation is complete.
