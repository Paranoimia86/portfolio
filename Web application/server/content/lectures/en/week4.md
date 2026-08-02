# Lecture 4: Variables, Data Structures, and Type System

## 1. Variables and Their Importance in Scripting

Variables are a fundamental tool for storing and manipulating data in scripts. Their significance goes beyond simple "value storage." In scripting, they serve as a means to dynamically control program behavior, respond to inputs, store intermediate results, and transfer information between different parts of the script.
In practical scenarios, variables are used for:

- Storing the result of a system command
- Processing user input
- Configuring the script (e.g., paths, file names)
- Controlling program flow based on the current state

In Bash, variables are implicitly typed and interpreted as strings, meaning their content is always processed as text regardless of its actual meaning.

<div class="bash-code-example">
<pre><code>name="John"
echo "User: $name"
</code></pre>
</div>

In PowerShell, variables are represented as objects, allowing them to store various data types and work with them at a higher level of abstraction:

<div class="powershell-code-example">
<pre><code>$name = "John"
Write-Output "User: $name"
</code></pre>
</div>

An important aspect is also the lifetime of variables and their scope, which affects where a variable is accessible and how it behaves when functions or scripts are called.

## 2. Dynamic vs. Strong Typing

The type system determines how data is represented and processed in a program. Bash uses a very simple dynamic typing model, where there is no explicit type checking, and all values are essentially strings. This approach provides high flexibility but also increases the risk of errors, especially in more complex operations.

When working with numbers, special constructs must be used:

<div class="bash-code-example">
<pre><code>a=10
b=5
echo $((a + b))
</code></pre>
</div>

PowerShell uses a stronger type system based on the .NET platform, where variables are objects with a specific type. This means that operations on data are more precise and predictable.

<div class="powershell-code-example">
<pre><code>[int]$a = 10
[int]$b = 5
$a + $b
</code></pre>
</div>

This difference has significant implications:

- Bash is suitable for simple operations and text manipulation.
- PowerShell is better suited for complex data processing and system operations.

Understanding the type system helps prevent errors and design more robust solutions.

## 3. Arrays and Data Collections

When processing larger amounts of data, it is essential to work with collections that allow storing multiple values in a single variable. The simplest form of such a collection is an array.

In Bash, arrays are implemented as indexed lists:

<div class="bash-code-example">
<pre><code>array=("a" "b" "c")
echo ${array[1]}
</code></pre>
</div>

Although Bash allows basic manipulation with arrays, its capabilities are limited, especially when working with more complex data.

PowerShell provides a significantly more advanced model of collections, which includes not only arrays but also collections of objects:

<div class="powershell-code-example">
<pre><code>$array = @("a", "b", "c")
$array[1]
</code></pre>
</div>

An important difference is that PowerShell can work with collections of objects, meaning each element can contain multiple properties. This approach is very useful, for example, when processing the outputs of system commands.

Collections are the basis for:

- Iteration (loops)
- Data filtering
- Output transformation

## 4. Associative Arrays and Hashtables

When working with more complex data, indexed arrays are often insufficient. It is necessary to work with data in the form of key-value pairs, which allows for quick searching and better organization of information.

In Bash, associative arrays are available in newer versions:

<div class="bash-code-example">
<pre><code>declare -A user
user[name]="John"
user[age]=25
echo ${user[name]}
</code></pre>
</div>

PowerShell provides native support for hashtables:

<div class="powershell-code-example">
<pre><code>$user = @{
name = "John"
age = 25
}
$user["age"]
</code></pre>
</div>

These structures are very important, for example, when:

- Processing configurations
- Working with data from APIs
- Organizing complex data in scripts

Using key-value structures allows for creating more organized and flexible solutions.

## 5. Working with Objects in PowerShell

PowerShell is built on an object-oriented model, which means that command outputs are not text but objects. This approach represents a fundamental difference from Bash and significantly affects how scripts are written.

Each object contains:

- Properties
- Methods

<div class="powershell-code-example">
<pre><code>Get-Process
</code></pre>
</div>

This command returns a collection of objects representing processes. These objects can be further manipulated:

<div class="powershell-code-example">
<pre><code>Get-Process | Select-Object ProcessName, CPU
</code></pre>
</div>

The advantages of the object-oriented approach include:

- Precise data manipulation
- Elimination of the need for text parsing
- Greater script robustness

This model is particularly important when working with system resources and complex data.

## 6. Environment Variables and Their Usage

Environment variables provide a mechanism for defining global values that are accessible across processes. They are especially important for system and application configuration.

These variables are inherited between processes, meaning that a script can influence the behavior of other programs.

<div class="bash-code-example">
<pre><code>echo $HOME
</code></pre>
</div>

<div class="powershell-code-example">
<pre><code>$env:USERPROFILE
</code></pre>
</div>

Environment variables are used, for example, to:

- Define system paths
- Configure applications
- Transfer information between processes

Proper use of environment variables enables the creation of flexible and portable scripts that are not tightly bound to a specific environment.

## 7. Data Serialization (JSON, XML)

In modern IT systems, processing data in formats such as JSON or XML is common. Scripting tools allow these data formats to be read, processed, and generated, which is essential when working with web services and APIs.

PowerShell provides native support for working with JSON:

<div class="powershell-code-example">
<pre><code>$data = '{"name":"John","age":25}' | ConvertFrom-Json
$data.name
</code></pre>
</div>

In Bash, external tools such as `jq` are required:

<div class="bash-code-example">
<pre><code>echo '{"name":"John"}' | jq '.name'
</code></pre>
</div>

Data serialization enables:

- Data exchange between systems
- Integration with APIs
- Storage of structured information

Understanding these formats is crucial for modern scripting, which often extends beyond the boundaries of the local system.
