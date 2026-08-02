# Lecture 6: Functions, Scripting Modules, and Modularity

## 1. Modularity as a Principle of Script Design

Modularity is a fundamental principle of software design that involves dividing a program into smaller, logically separate parts. In the context of scripting, this means dividing code into functions or separate files, with each part addressing a specific task.

Without modularity, scripts tend to grow into linear and unmanageable code. Such an approach leads to reduced readability, increased duplication, and complicated maintenance. On the other hand, modular design allows for clear separation of program parts, simplifying code navigation and further development.

From a practical perspective, it is advisable to identify repetitive operations or logical units and encapsulate these parts into separate functions. This approach reduces code redundancy, improves quality, and facilitates easier testing of individual components.

## 2. Defining Functions

A function is a named block of code that performs a specific task and can be called repeatedly. Its main purpose is to encapsulate certain logic and separate it from the rest of the program.

In Bash, functions are defined with simple syntax:

<div class="bash-code-example">
<pre><code>function greet() {
echo "Hello"
}
</code></pre>
</div>

In PowerShell, the definition is more explicit:

<div class="powershell-code-example">
<pre><code>function Greet {
Write-Output "Hello"
}
</code></pre>
</div>

Using functions reduces code duplication and simplifies the main program flow, which then consists primarily of function calls. When designing functions, it is important that each function has a clearly defined purpose and addresses one specific task. This approach leads to more readable and maintainable code.

## 3. Function Parameters and Validation

Parameters allow functions to accept input data, increasing their flexibility and reusability. Without parameters, functions would be tied to specific values, significantly limiting their practical use.

In Bash, parameters are passed using positional variables:

<div class="bash-code-example">
<pre><code>function greet() {
echo "Hello $1"
}
</code></pre>
</div>

In PowerShell, parameters can be explicitly defined, improving readability and enabling type checking:

<div class="powershell-code-example">
<pre><code>function Greet {
param (
[string]$name
)
Write-Output "Hello $name"
}
</code></pre>
</div>

An important part of function design is input validation. A function should verify that the input data is correct, such as checking whether a parameter is provided or has the correct format. This prevents errors during execution and increases the robustness of the script.

## 4. Return Values and Function Output

Functions can return the results of their operations, which are then used for further processing. In scripting languages, it is important to distinguish between return values and output.

In Bash, functions return a return code that signals success or failure, while the actual data is passed through standard output:

<div class="bash-code-example">
<pre><code>function sum() {
echo $(($1 + $2))
}
</code></pre>
</div>

In PowerShell, functions return objects directly:

<div class="powershell-code-example">
<pre><code>function Sum {
param ($a, $b)
return $a + $b
}
</code></pre>
</div>

When designing functions, it is important to ensure that the output is consistent and suitable for further processing. Mixing data output and informational messages can lead to problems, especially when using functions in pipelines.

## 5. Scope (Variable Scope)

Scope determines where a variable is accessible and its lifecycle. Misunderstanding this concept can lead to errors that are often difficult to identify.

In Bash, variables are global by default unless marked as local:

<div class="bash-code-example">
<pre><code>function example() {
local x=10
}
</code></pre>
</div>

In PowerShell, there are multiple scope levels that allow for more precise control over variable access.

Proper use of scope is especially important when designing larger scripts, where it is necessary to prevent variable collisions and unintended overwriting of values. Local variables in functions contribute to better isolation of logic and reduce dependencies between different parts of the program.

## 6. Script Organization and Code Separation

For larger scripts, it is essential to divide the code into multiple parts to maintain readability and maintainability. Script organization involves dividing functions into separate files and separating configuration parts from the actual logic.

In Bash, an external file can be loaded using the command:

<div class="bash-code-example">
<pre><code>source utils.sh
</code></pre>
</div>

In PowerShell, modules are used:

<div class="powershell-code-example">
<pre><code>Import-Module Utils
</code></pre>
</div>

This approach allows for creating libraries of functions that can be reused across different projects. It also simplifies testing and debugging of individual code components.

## 7. Code Reuse and Best Practices

Code reuse is one of the main goals of modularity. Properly designed functions can be used in multiple places without the need to rewrite them.

When designing functions, it is advisable to follow several basic principles. Functions should have clear and descriptive names that reflect their purpose. They should be as independent of the global state as possible, and their behavior should be predictable. Additionally, it is recommended to separate the core logic from the user-facing output.

Example of a simple logging function:

<div class="bash-code-example">
<pre><code>log() {
echo "[INFO] $1"
}
</code></pre>
</div>

<div class="powershell-code-example">
<pre><code>function Log {
param ($message)
Write-Output "[INFO] $message"
}
</code></pre>
</div>

Adhering to these principles leads to the creation of high-quality code that is readable, maintainable, and suitable for team collaboration.
