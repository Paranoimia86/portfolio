# Lecture 8: Text and Data Stream Processing

## Lecture Objective

The objective of this lecture is to provide students with a deep understanding of text data processing in Bash and PowerShell environments. The lecture focuses on efficient filtering, transformation, and analysis of data, emphasizing the use of regular expressions and combining tools into complex solutions. Students will learn to work with real-world data, which is often unstructured or semi-structured.

## 1. Importance of Text Processing in Scripting

Text processing is one of the most important areas of scripting because most data that scripts work with is in text form. Examples include system logs, configuration files, command outputs, or API responses. This data is often unstructured or semi-structured, meaning its processing requires flexible tools and well-designed algorithms.

In Bash, text processing is a natural part of the system's philosophy, where individual tools work with text streams and are designed to be easily combined. PowerShell, on the other hand, uses an object model, but text processing remains essential, especially when working with external sources or processing data not represented as objects.

From a script design perspective, it is important to understand that text processing is not just about technical implementation but also about choosing the right strategy. It is necessary to decide whether the data will be processed line by line, whether a regular expression will be used, or whether it is better to convert the data into a structured form. An incorrectly chosen approach can lead to inefficient solutions or incorrect results.

## 2. Text Filtering – grep and Select-String

Text filtering is a basic operation that allows extracting relevant information from large amounts of data. It is the process of selecting only those lines or parts of text that meet defined criteria.

In Bash, the `grep` tool is used for this purpose, optimized for fast pattern searching in text files:

<div class="bash-code-example">
<pre><code>grep "ERROR" log.txt
</code></pre>
</div>

`grep` supports regular expressions, allowing the definition of complex search patterns. Its advantage is high performance even with large files, making it a suitable tool for log analysis.

In PowerShell, the command is:

<div class="powershell-code-example">
<pre><code>Select-String "ERROR" log.txt
</code></pre>
</div>

The output consists of objects that contain not only the text itself but also contextual information, such as the line number. This approach allows for more precise manipulation of results.

When designing filtering, it is necessary to consider:

- Pattern accuracy (minimizing false matches)
- Performance (especially with large data)
- Context (whether surrounding lines need to be displayed)

Filtering is often the first step in a data processing pipeline and significantly affects the quality of the result.

## 3. Text Transformation – sed and Basic Modifications

Text transformation involves operations that change the content of data, such as replacing, removing, or formatting text. It is an important step in preparing data for further processing.

In Bash, the `sed` tool is used, allowing transformations directly on the text stream:

<div class="bash-code-example">
<pre><code>sed 's/error/ERROR/g' log.txt
</code></pre>
</div>

`sed` works in a streaming manner, meaning it can process large files without loading them into memory. This is advantageous when working with large data but requires precise definition of transformations.

In PowerShell, transformations are performed using the `-replace` operator:

<div class="powershell-code-example">
<pre><code>(Get-Content log.txt) -replace "error", "ERROR"
</code></pre>
</div>

When designing transformations, it is necessary to consider:

- Preserving the meaning of data
- Consistency of format
- The ability to repeat the operation without side effects

Improperly designed transformations can lead to data loss or incorrect interpretation.

## 4. Processing Structured Text – awk and Field Selection

When working with text that has a certain structure (e.g., CSV or logs with columns), it is appropriate to use tools that allow working at the field level.

In Bash, `awk` is used, which allows processing text based on the position or content of fields:

<div class="bash-code-example">
<pre><code>awk '{print $1, $3}' log.txt
</code></pre>
</div>

`awk` is a very powerful tool that allows not only field selection but also conditional processing and calculations.

PowerShell works with objects, meaning structured data can be processed directly without the need for parsing:

<div class="powershell-code-example">
<pre><code>Import-Csv data.csv | Select-Object Name, Age
</code></pre>
</div>

The difference between these approaches has a significant impact on solution design:

- Bash requires explicit parsing and working with text
- PowerShell allows working directly with structured data

The choice of the right approach depends on the data format and processing requirements.

## 5. Regular Expressions – Basic Concept

Regular expressions are a universal tool for describing patterns in text. They allow searching, validating, and extracting data based on defined rules. Basic elements of regular expressions include literals, metacharacters, quantifiers, and character classes. By combining these elements, very flexible patterns can be created.

<div class="bash-code-example">
<pre><code>grep "^ERROR" log.txt
</code></pre>
</div>

This expression searches for lines starting with a specific word.

In PowerShell:

<div class="powershell-code-example">
<pre><code>Select-String "^ERROR" log.txt
</code></pre>
</div>

When designing regular expressions, it is important to:

- Ensure accuracy (minimize unwanted matches)
- Maintain readability
- Test expressions on real data

Regular expressions are very powerful, but their improper use can lead to complex and hard-to-maintain solutions.

## 6. Advanced Use of Regular Expressions

Advanced regular expressions allow working with more complex patterns, such as identifiers, email addresses, or specific data formats.

<div class="bash-code-example">
<pre><code>grep "[0-9]\{3\}-[0-9]\{2\}" data.txt
</code></pre>
</div>

In PowerShell:

<div class="powershell-code-example">
<pre><code>Select-String "\d{3}-\d{2}" data.txt
</code></pre>
</div>

These expressions enable not only searching but also data validation. In practice, they are used for:

- Input validation
- Extracting data from logs
- Processing unstructured data

When designing advanced expressions, it is important to focus on their readability and testing, as complex patterns can be prone to errors and difficult to understand.

## 7. Combining Tools and Pipelines

One of the most powerful features of the shell is the ability to combine multiple tools into a single data stream using pipelines. This approach allows creating complex operations from simple components.

In Bash:

<div class="bash-code-example">
<pre><code>cat log.txt | grep "ERROR" | sort | uniq
</code></pre>
</div>

In PowerShell:

<div class="powershell-code-example">
<pre><code>Get-Content log.txt |
Where-Object { $_ -match "ERROR" } |
Sort-Object |
Get-Unique
</code></pre>
</div>

Pipelines support a modular approach, where each tool performs one task. This approach leads to clear and flexible solutions.

When designing pipelines, it is necessary to consider:

- Order of operations
- Performance (minimizing unnecessary steps)
- Compatibility between tools

A well-designed pipeline enables efficient processing of even large amounts of data.
